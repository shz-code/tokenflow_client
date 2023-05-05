<template>
  <q-page>
    hi
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { tokensStore } from 'src/stores/tokens-store';

const tokens = tokensStore();

const { counter } = tokens;
tokens.getTokens();

console.log(counter);

export default defineComponent({
  name: 'IndexPage'
})
</script>
