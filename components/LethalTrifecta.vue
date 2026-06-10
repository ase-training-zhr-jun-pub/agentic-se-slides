<template>
  <ol class="trifecta-list" role="list">
    <li class="bubble trifecta-data">Access to <strong>private data</strong></li>
    <li class="bubble trifecta-communicate">Ability to <strong>communicate externally</strong></li>
    <li class="bubble trifecta-untrusted">Exposure to <strong>untrusted content</strong></li>
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

.trifecta-data        { grid-area: data; background-color: #FFD166; }
.trifecta-communicate { grid-area: comm; background-color: #88C9A5; }
.trifecta-untrusted   { grid-area: untr; background-color: #E8AFCA; }
</style>
