import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const tokensStore = defineStore("tokens", {
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async getTokens() {
      const res = await api.get("api/tokens/");
      //   const res = await fetch("http://127.0.0.1:8000/api/tokens/");
      console.log(res);
    },
    setState() {
      this.counter += 10;
    },
  },
});
