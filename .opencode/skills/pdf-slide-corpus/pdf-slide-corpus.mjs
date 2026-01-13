#!/usr/bin/env node
/*
  Deterministic PDF -> slide corpus export.

  - Renders one PNG per page (slide)
  - Extracts text per page via pdftotext
  - Detects Chapter 1..7 boundaries via text markers "Chapter N"
  - Creates one folder per main chapter, each containing slide-XXXX.{png,txt}
  - Writes agent-friendly indexes: index.md, slides.jsonl, manifest.json

  Requirements (in PATH): pdfinfo, pdftoppm, pdftotext
  Optional: tesseract (OCR fallback)
*/

import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { spawnSync } from 'node:child_process'

function die(message) {
  process.stderr.write(`${message}\n`)
  process.exit(1)
}

function run(cmd, args, opts = {}) {
  const res = spawnSync(cmd, args, {
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 200,
    ...opts,
  })
  if (res.error) throw res.error
  if (res.status !== 0) {
    const stderr = (res.stderr || '').trim()
    const stdout = (res.stdout || '').trim()
    const msg = [
      `Command failed: ${cmd} ${args.map(a => JSON.stringify(a)).join(' ')}`,
      stderr && `stderr: ${stderr}`,
      stdout && `stdout: ${stdout}`,
    ]
      .filter(Boolean)
      .join('\n')
    throw new Error(msg)
  }
  return res
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function sha256Hex(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex')
}

function normalizeLines(text) {
  return String(text).replace(/\r\n/g, '\n').replace(/\r/g, '\n')
}

function slugifyAscii(input) {
  const s = String(input)
    .normalize('NFKD')
    .replace(/[^\x00-\x7F]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
  return s || 'chapter'
}

function parseArgs(argv) {
  const out = {
    in: null,
    outBase: 'tmp/slide-corpus',
    width: 1920,
    thumbWidth: 480,
    ocr: 'auto', // auto|never|always
    lang: 'deu+eng',
    bbox: false,
    force: false,
  }

  const args = [...argv]
  while (args.length) {
    const a = args.shift()
    if (a === '--in') out.in = args.shift()
    else if (a === '--out') out.outBase = args.shift()
    else if (a === '--width') out.width = Number(args.shift())
    else if (a === '--thumbWidth') out.thumbWidth = Number(args.shift())
    else if (a === '--ocr') out.ocr = String(args.shift() || '').toLowerCase()
    else if (a === '--lang') out.lang = String(args.shift() || '')
    else if (a === '--bbox') out.bbox = true
    else if (a === '--force') out.force = true
    else if (a === '--help' || a === '-h') {
      process.stdout.write(
        [
          'Usage:',
          '',
          '  node .opencode/skills/pdf-slide-corpus/pdf-slide-corpus.mjs --in "<deck.pdf>" [options]',
          '',
          'Options:',
          '  --out <dir>         Base output dir (default: tmp/slide-corpus)',
          '  --width <px>        Render width (default: 1920)',
          '  --thumbWidth <px>   Thumbnail width (default: 480)',
          '  --ocr <mode>        auto|never|always (default: auto)',
          '  --lang <langs>      Tesseract langs (default: deu+eng)',
          '  --bbox              Also write per-page bbox XHTML',
          '  --force             Re-render and overwrite outputs',
          '',
        ].join('\n')
      )
      process.exit(0)
    } else {
      die(`Unknown arg: ${a}`)
    }
  }
  if (!out.in) die('Missing required --in <pdf>')
  if (!Number.isFinite(out.width) || out.width <= 0) die('Invalid --width')
  if (!Number.isFinite(out.thumbWidth) || out.thumbWidth <= 0) die('Invalid --thumbWidth')
  if (!['auto', 'never', 'always'].includes(out.ocr)) die('Invalid --ocr (auto|never|always)')
  return out
}

function which(cmd) {
  const res = spawnSync('bash', ['-lc', `command -v ${cmd}`], { encoding: 'utf8' })
  if (res.status === 0) return (res.stdout || '').trim()
  return null
}

function safeWrite(filePath, content) {
  ensureDir(path.dirname(filePath))
  fs.writeFileSync(filePath, content)
}

function tryLinkOrCopy(src, dest) {
  ensureDir(path.dirname(dest))
  if (fs.existsSync(dest)) fs.unlinkSync(dest)
  try {
    fs.linkSync(src, dest)
  } catch {
    fs.copyFileSync(src, dest)
  }
}

function parsePdfInfoPages(pdfInfoText) {
  const m = /\bPages:\s+(\d+)\b/.exec(pdfInfoText)
  if (!m) throw new Error('Could not parse page count from pdfinfo')
  return Number(m[1])
}

function pageId(pageNum, totalPages) {
  const width = String(totalPages).length
  return String(pageNum).padStart(width, '0')
}

function extractChapterMarker(text) {
  const lines = normalizeLines(text)
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0)

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const m = /^Chapter\s+(\d+)\s*$/.exec(line)
    if (!m) continue
    const n = Number(m[1])
    if (!Number.isFinite(n) || n < 1 || n > 99) continue

    const titleParts = []
    for (let j = i + 1; j < lines.length && titleParts.length < 3; j++) {
      const t = lines[j]
      if (/^\d+$/.test(t)) break
      if (/^https?:\/\//i.test(t)) continue
      titleParts.push(t)
    }
    const title = titleParts.join(' ').trim()
    return { chapterNumber: n, title: title || `Chapter ${n}` }
  }

  return null
}

function writeMarkdownIndex(rootDir, pdfName, chapters) {
  const lines = []
  lines.push(`# Slide Corpus: ${pdfName}`)
  lines.push('')
  lines.push(`Generated: ${new Date().toISOString()}`)
  lines.push('')
  lines.push('## Chapters')
  lines.push('')
  for (const ch of chapters) {
    const rel = `chapters/${ch.id}/index.md`
    lines.push(`- [Chapter ${ch.number}: ${ch.title}](${rel}) (pages ${ch.startPage}-${ch.endPage})`)
  }
  lines.push('')
  lines.push('## Notes')
  lines.push('')
  lines.push('- Each chapter folder contains the slide PNGs and extracted text.')
  lines.push('- Slides before the first Chapter marker are assigned to Chapter 1 and flagged as prelude in slides.jsonl.')
  lines.push('')

  safeWrite(path.join(rootDir, 'index.md'), lines.join('\n'))
}

function writeChapterIndex(chapterDir, ch, slides) {
  const lines = []
  lines.push(`# Chapter ${ch.number}: ${ch.title}`)
  lines.push('')
  lines.push(`Pages: ${ch.startPage}-${ch.endPage}`)
  lines.push('')

  const prelude = slides.filter(s => s.prelude)
  const main = slides.filter(s => !s.prelude)

  if (prelude.length) {
    lines.push('## Prelude')
    lines.push('')
    for (const s of prelude) {
      lines.push(`### Slide ${s.page}`)
      lines.push('')
      lines.push(`![Slide ${s.page}](./${path.basename(s.imagePath)})`)
      lines.push('')
      lines.push('```text')
      lines.push(s.text.trimEnd())
      lines.push('```')
      lines.push('')
    }
  }

  lines.push('## Slides')
  lines.push('')
  for (const s of main) {
    lines.push(`### Slide ${s.page}`)
    lines.push('')
    lines.push(`![Slide ${s.page}](./${path.basename(s.imagePath)})`)
    lines.push('')
    lines.push('```text')
    lines.push(s.text.trimEnd())
    lines.push('```')
    lines.push('')
  }

  safeWrite(path.join(chapterDir, 'index.md'), lines.join('\n'))
}

function toolVersion(cmd, args) {
  try {
    const res = spawnSync(cmd, args, { encoding: 'utf8' })
    const out = (res.stdout || '').trim()
    const err = (res.stderr || '').trim()
    return [out, err].filter(Boolean).join('\n').split('\n')[0] || null
  } catch {
    return null
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const pdfPath = path.resolve(process.cwd(), args.in)
  if (!fs.existsSync(pdfPath)) die(`PDF not found: ${pdfPath}`)

  for (const t of ['pdfinfo', 'pdftoppm', 'pdftotext']) {
    if (!which(t)) die(`Missing required tool in PATH: ${t}`)
  }

  const hasTesseract = Boolean(which('tesseract'))
  if ((args.ocr === 'auto' || args.ocr === 'always') && !hasTesseract && args.ocr === 'always') {
    die('tesseract not found but --ocr always was set')
  }

  const pdfBuf = fs.readFileSync(pdfPath)
  const pdfHash = sha256Hex(pdfBuf)
  const shaShort = pdfHash.slice(0, 12)
  const pdfName = path.basename(pdfPath)
  const pdfStem = path.parse(pdfName).name
  const outBase = path.resolve(process.cwd(), args.outBase)
  const rootDir = path.join(outBase, `${pdfStem}__${shaShort}`)
  ensureDir(rootDir)

  const tmpDir = path.join(rootDir, '_work')
  const allDir = path.join(tmpDir, 'all')
  ensureDir(allDir)

  const pdfInfoText = run('pdfinfo', [pdfPath]).stdout
  const pages = parsePdfInfoPages(pdfInfoText)

  const manifest = {
    source: {
      path: pdfPath,
      name: pdfName,
      sha256: pdfHash,
      pages,
    },
    settings: {
      width: args.width,
      thumbWidth: args.thumbWidth,
      ocr: args.ocr,
      lang: args.lang,
      bbox: args.bbox,
    },
    tools: {
      node: process.version,
      pdfinfo: toolVersion('pdfinfo', ['-v']),
      pdftoppm: toolVersion('pdftoppm', ['-v']),
      pdftotext: toolVersion('pdftotext', ['-v']),
      tesseract: hasTesseract ? toolVersion('tesseract', ['--version']) : null,
    },
    generatedAt: new Date().toISOString(),
  }

  safeWrite(path.join(rootDir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n')

  const slides = []
  const chapterStarts = new Map() // n -> {page, title}

  for (let page = 1; page <= pages; page++) {
    const pid = pageId(page, pages)
    const baseName = `slide-${pid}`
    const pngPath = path.join(allDir, `${baseName}.png`)
    const txtPath = path.join(allDir, `${baseName}.txt`)
    const bboxPath = path.join(allDir, `${baseName}.bbox.xhtml`)
    const thumbPath = path.join(allDir, `${baseName}.thumb.jpg`)
    const ocrPath = path.join(allDir, `${baseName}.ocr.txt`)

    if (args.force || !fs.existsSync(pngPath)) {
      run('pdftoppm', [
        '-png',
        '-singlefile',
        '-f',
        String(page),
        '-l',
        String(page),
        '-scale-to-x',
        String(args.width),
        pdfPath,
        path.join(allDir, baseName),
      ])
    }

    if (args.force || !fs.existsSync(txtPath)) {
      const txt = run('pdftotext', ['-f', String(page), '-l', String(page), '-layout', pdfPath, '-']).stdout
      safeWrite(txtPath, normalizeLines(txt))
    }

    if (args.bbox && (args.force || !fs.existsSync(bboxPath))) {
      const bbox = run('pdftotext', ['-f', String(page), '-l', String(page), '-bbox', pdfPath, '-']).stdout
      safeWrite(bboxPath, bbox)
    }

    if (args.force || !fs.existsSync(thumbPath)) {
      try {
        run('magick', [pngPath, '-resize', `${args.thumbWidth}x`, '-quality', '82', thumbPath])
      } catch {
        // optional
      }
    }

    const text = fs.readFileSync(txtPath, 'utf8')
    const marker = extractChapterMarker(text)
    if (marker && marker.chapterNumber >= 1 && marker.chapterNumber <= 7) {
      if (!chapterStarts.has(marker.chapterNumber)) {
        chapterStarts.set(marker.chapterNumber, { page, title: marker.title })
      }
    }

    let effectiveText = text
    let ocrUsed = false
    const minTextChars = 40

    if ((args.ocr === 'auto' || args.ocr === 'always') && hasTesseract) {
      const tooEmpty = effectiveText.replace(/\s+/g, '').length < minTextChars
      if (args.ocr === 'always' || tooEmpty) {
        if (args.force || !fs.existsSync(ocrPath)) {
          try {
            run('tesseract', [pngPath, ocrPath.replace(/\.txt$/, ''), '-l', args.lang, '--dpi', '150'])
          } catch {
            // optional
          }
        }
        if (fs.existsSync(ocrPath)) {
          const ocrText = fs.readFileSync(ocrPath, 'utf8')
          if (ocrText.replace(/\s+/g, '').length > effectiveText.replace(/\s+/g, '').length) {
            effectiveText = ocrText
            ocrUsed = true
          }
        }
      }
    }

    slides.push({
      page,
      id: baseName,
      imagePath: pngPath,
      thumbPath: fs.existsSync(thumbPath) ? thumbPath : null,
      textPath: txtPath,
      bboxPath: args.bbox ? bboxPath : null,
      ocrPath: fs.existsSync(ocrPath) ? ocrPath : null,
      ocrUsed,
      text: effectiveText,
      chapterNumber: null,
      chapterId: null,
      prelude: false,
    })
  }

  const missing = []
  for (let n = 1; n <= 7; n++) {
    if (!chapterStarts.has(n)) missing.push(n)
  }
  if (missing.length) {
    process.stderr.write(`Warning: missing chapter markers for: ${missing.join(', ')}\n`)
  }

  const chapterList = []
  for (let n = 1; n <= 7; n++) {
    const start = chapterStarts.get(n)
    if (!start) continue
    chapterList.push({ number: n, startPage: start.page, title: start.title })
  }
  chapterList.sort((a, b) => a.startPage - b.startPage)

  const chapters = []
  for (let i = 0; i < chapterList.length; i++) {
    const ch = chapterList[i]
    const next = chapterList[i + 1]
    const startPage = ch.startPage
    const endPage = next ? next.startPage - 1 : pages
    const id = `${String(ch.number).padStart(2, '0')}-${slugifyAscii(ch.title)}`
    chapters.push({ number: ch.number, id, title: ch.title, startPage, endPage })
  }

  const firstChapter = chapters[0]
  if (!firstChapter) die('No chapter markers found (expected "Chapter 1" .. "Chapter 7")')

  for (const s of slides) {
    let assigned = null
    for (const ch of chapters) {
      if (s.page >= ch.startPage && s.page <= ch.endPage) {
        assigned = ch
        break
      }
    }
    if (!assigned) assigned = firstChapter

    s.chapterNumber = assigned.number
    s.chapterId = assigned.id
    if (assigned.number === firstChapter.number && s.page < firstChapter.startPage) {
      s.prelude = true
    }
  }

  const chaptersDir = path.join(rootDir, 'chapters')
  ensureDir(chaptersDir)

  const slidesByChapter = new Map()
  for (const ch of chapters) slidesByChapter.set(ch.id, [])
  for (const s of slides) slidesByChapter.get(s.chapterId)?.push(s)
  for (const list of slidesByChapter.values()) list.sort((a, b) => a.page - b.page)

  for (const ch of chapters) {
    const chDir = path.join(chaptersDir, ch.id)
    ensureDir(chDir)

    const list = slidesByChapter.get(ch.id) || []
    for (const s of list) {
      const localPng = path.join(chDir, path.basename(s.imagePath))
      const localTxt = path.join(chDir, path.basename(s.textPath))
      tryLinkOrCopy(s.imagePath, localPng)
      tryLinkOrCopy(s.textPath, localTxt)

      const localOcr = s.ocrPath ? path.join(chDir, path.basename(s.ocrPath)) : null
      const localThumb = s.thumbPath ? path.join(chDir, path.basename(s.thumbPath)) : null
      const localBbox = args.bbox && s.bboxPath ? path.join(chDir, path.basename(s.bboxPath)) : null

      if (localOcr) tryLinkOrCopy(s.ocrPath, localOcr)
      if (localThumb) tryLinkOrCopy(s.thumbPath, localThumb)
      if (localBbox) tryLinkOrCopy(s.bboxPath, localBbox)

      s.imagePath = localPng
      s.textPath = localTxt
      s.ocrPath = localOcr
      s.thumbPath = localThumb
      s.bboxPath = localBbox
    }

    writeChapterIndex(chDir, ch, list)
  }

  writeMarkdownIndex(rootDir, pdfName, chapters)

  const jsonl = slides
    .slice()
    .sort((a, b) => a.page - b.page)
    .map(s => {
      const preview = normalizeLines(s.text)
        .split('\n')
        .map(l => l.trim())
        .filter(Boolean)
        .slice(0, 6)
        .join(' ')
        .slice(0, 240)
      return JSON.stringify({
        page: s.page,
        id: s.id,
        chapter_number: s.chapterNumber,
        chapter_id: s.chapterId,
        prelude: Boolean(s.prelude),
        image: path.relative(rootDir, s.imagePath),
        text: path.relative(rootDir, s.textPath),
        bbox: s.bboxPath ? path.relative(rootDir, s.bboxPath) : null,
        ocr: s.ocrPath ? path.relative(rootDir, s.ocrPath) : null,
        ocr_used: Boolean(s.ocrUsed),
        thumb: s.thumbPath ? path.relative(rootDir, s.thumbPath) : null,
        text_preview: preview,
      })
    })
    .join('\n')

  safeWrite(path.join(rootDir, 'slides.jsonl'), jsonl + '\n')

  try {
    fs.rmSync(tmpDir, { recursive: true, force: true })
  } catch {
    // ignore
  }

  process.stdout.write(`OK: ${rootDir}\n`)
}

main().catch(err => {
  die(err && err.stack ? err.stack : String(err))
})
