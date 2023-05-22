<script setup lang="ts">
import UserInfoExpansionPanel from "@/components/auth-view-components/user-info-expansion-panel.vue";
import TokenInfoExpansionPanel from "@/components/auth-view-components/token-info-expansion-panel.vue";
import { ref } from 'vue'
import {useRoute} from "vue-router";
import { OauthUser, DomainUser, UserManager } from "@/services/oauth/oauth";
import { standardAuthFlow } from "@/services/oauth"

const route = useRoute()

const authUser = ref<DomainUser | null>()

standardAuthFlow.getUser().then((user) => {
  authUser.value = user
})

function login(fetchDomainToken: boolean = false){
  sessionStorage.setItem('fetchDomainToken', fetchDomainToken.toString())
  standardAuthFlow.loginRedirectCallback().then((user) => {
    authUser.value = user
  }).catch(() => {
    standardAuthFlow.loginRedirect(route.fullPath)
  })
}

if(sessionStorage.getItem('fetchDomainToken') === 'true')
  standardAuthFlow.fetchDomainToken(route.fullPath);

const pageSettings = ref({
  panel: 0,
  isLoggedIn: false //dummy holder for now
})

function getChildDomain(domain: string | unknown){
  if(domain)
    return domain.toString().split('.')[0]
}
</script>

<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="12" md="11" lg="10" xl="8" xxl="7">
        <v-card>
          <v-card-title class="text-center">Standard Flow</v-card-title>
          <v-card-text class="text-center">
            <p><strong>Description:</strong> This is a test of the Standard Flow Redirect Authentication</p>
          </v-card-text>
          <v-card-text class="text-center" v-if="!authUser?.profile">
            <v-row>
              <v-col cols="6">
                <v-btn :block="true" size="x-large" @click="login" color="hcaPrimary">Login Oauth Only</v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn :block="true" size="x-large" @click="login(true)" color="hcaPrimary">Oauth /w Domain</v-btn>
              </v-col>
            </v-row>


          </v-card-text>
          <v-card-text v-if="authUser?.profile">
            <v-expansion-panels :model-value="pageSettings.panel">
              <user-info-expansion-panel
                v-bind="authUser?.profile"
                :domain="getChildDomain(authUser.profile?.domain)"
              />
              <token-info-expansion-panel
                :access-token="authUser?.access_token"
                :expires="authUser?.expires_in"
                :id-token="authUser?.id_token"
                :refresh-token="authUser?.refresh_token"
              />
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
