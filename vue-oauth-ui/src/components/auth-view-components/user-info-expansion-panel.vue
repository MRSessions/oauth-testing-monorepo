<script setup lang="ts">
const props = defineProps<{
  given_name?: String
  family_name?: String
  email?: String
  domain?: String
  sub?: String
}>()
</script>

<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      User Info: {{ given_name }} {{ family_name }}
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-text-field v-model="props.given_name" label="First Name" />
      <v-text-field v-model="props.family_name" label="Last Name" />
      <v-text-field v-model="props.email" label="Email" />
      <v-text-field v-model="props.domain" label="Domain" />
      <v-text-field v-model="props.sub" label="User Name" />
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<style scoped>

</style>
