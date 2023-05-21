<script setup lang="ts">
const props = defineProps<{
  firstName: String
  lastName: String
  email: String
  domain?: String
  username: String
}>()
</script>

<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      User Info: {{ firstName }} {{ lastName }}
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-text-field v-model="props.firstName" label="First Name" />
      <v-text-field v-model="props.lastName" label="Last Name" />
      <v-text-field v-model="props.email" label="Email" />
      <v-text-field v-model="props.domain" label="Domain" />
      <v-text-field v-model="props.username" label="User Name" />
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<style scoped>

</style>
