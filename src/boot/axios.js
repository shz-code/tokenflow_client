import { boot } from "quasar/wrappers";
import axios from "axios";
import { tokensStore } from "src/stores/tokens-store";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer " +
      String(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzMzA3NzMxLCJpYXQiOjE2ODMzMDc0MzEsImp0aSI6ImVmOGZlZTA3NGQyNTRjMmRhMTQ4N2ZjMDcyZTliNTEyIiwidXNlcl9pZCI6MX0.ggglBBoqQN4ZT3rnz4ISARa-p7xttigeNldlMD2eDXM"
      ),
  },
});

api.interceptors.response.use(
  (response) => {
    console.log(response);
    // return Promise.reject("emni");
  },
  async (error) => {
    console.log(error);
    const res = await axios("http://127.0.0.1:8000/api/");
    return res;
  }
);

export default boot(({ app }) => {
  const store = tokensStore();
  store.setState();
  // console.log(store.setState());
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
