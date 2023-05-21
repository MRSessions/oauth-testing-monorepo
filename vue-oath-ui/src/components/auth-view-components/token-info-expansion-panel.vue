<script setup lang="ts">
const props = defineProps<{
  accessToken?: String
  expires?: String | Number
  idToken?: String
  refreshToken?: String
}>()
</script>

<template>
  <v-expansion-panel>
    <v-expansion-panel-title>Token Info</v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-textarea label="Access Token" v-model="props.accessToken"></v-textarea>
      <v-text-field label="Expires" v-model="props.expires"></v-text-field>
      <v-textarea label="ID Token" v-model="props.idToken"></v-textarea>
      <v-textarea label="Refresh Token" v-model="props.refreshToken"></v-textarea>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<style scoped>

</style>
