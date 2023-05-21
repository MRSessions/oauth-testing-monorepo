<template>
  <v-app-bar color="hcaBlue" prominent>
    <v-app-bar-nav-icon variant="text" @click.stop="pageSettings.drawer = !pageSettings.drawer" />

    <v-toolbar-title>{{ pageSettings.appName }}</v-toolbar-title>

    <v-spacer />

<!--    <v-btn variant="text" -->
<!--           :icon="appStore.appSettings.theme === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night'"-->
<!--           @click="changeTheme"></v-btn>-->
  </v-app-bar>

  <v-navigation-drawer color="drawer" v-model="pageSettings.drawer"
                       :location="$vuetify.display.smAndDown ? 'top' : 'start'"
                       :permanent="!$vuetify.display.smAndDown">
    <v-list>
      <v-list-item v-for="item in pageSettings.navigationItems"
                   :key="item.title" :to="item.value">{{ item.title }}</v-list-item>
    </v-list>

  </v-navigation-drawer>
</template>

<script setup lang="ts">
import vuetify from '@/plugins/vuetify'
import { ref } from 'vue'

const pageSettings = ref({
  drawer: ref(!vuetify.display.smAndDown.value),
  appName: 'OAuth Testing',
  navigationItems: [
    {
      title: 'Home',
      value: '/home'
    },
    {
      title: 'Standard Flow',
      value: '/standard-flow'
    },
    {
      title: 'Implicit Flow',
      value: '/implicit-flow'
    },
    {
      title: 'Direct Access',
      value: '/direct-access'
    },
    {
      title: 'About',
      value: '/about'
    },
  ]
})

// function changeTheme() {
//   appStore.appSettings.theme = appStore.appSettings.theme === 'dark' ? 'light' : 'dark'
// }
</script>
