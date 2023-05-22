<script setup lang="ts">
import { UserManager, WebStorageStateStore } from "oidc-client-ts";
import { useRouter } from "vue-router";

const router = useRouter();

let config = {
  authority: "http://localhost:8080/realms/master",
  client_id: "standard-flow-client",
  user_store: new WebStorageStateStore({ store: window.sessionStorage }),
  redirect_uri: ""
}

let mgr = new UserManager(config);

mgr.signinRedirectCallback().then(() => {
  window.history.replaceState({}, window.document.title, window.location.origin);

  const returnUrl = localStorage.getItem("returnUrl");
  if (returnUrl) {
    localStorage.removeItem("returnUrl");
    router.push(returnUrl);
  } else {
    router.push("/");
  }
}, error => {
  console.error(error);
});
</script>

<template>
  <div>Loading ...</div>
</template>
