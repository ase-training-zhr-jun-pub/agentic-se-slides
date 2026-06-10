<template>
  <ol class="trifecta-list" role="list">
    <li class="bubble trifecta-data bg-apricot text-white">Access to <strong>private data</strong></li>
    <li class="bubble trifecta-communicate bg-teal text-white">Ability to <strong>communicate externally</strong></li>
    <li class="bubble trifecta-untrusted bg-petrol text-white">Exposure to <strong>untrusted content</strong></li>
  </ol>
</template>

<style scoped>
/* grid-template-areas with named regions cannot be expressed in UnoCSS */
.trifecta-list {
  display: grid;
  grid-template-areas:
    ". data data ."
    "comm comm untr untr";
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: stretch;
  justify-items: center;
  min-height: 10rem;
  gap: 0.75rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.bubble {
  display: grid;
  align-items: end;
  border-radius: 50%;
  text-align: center;
  padding: 2rem;
  width: 100%;
}

.bubble > * {
  align-self: start;
}

.trifecta-data        { grid-area: data; }
.trifecta-communicate { grid-area: comm; }
.trifecta-untrusted   { grid-area: untr; }
</style>
