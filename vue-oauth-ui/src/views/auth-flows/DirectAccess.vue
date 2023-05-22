<script setup lang="ts">
import { ref } from 'vue'
import UserInfoExpansionPanel from "@/components/auth-view-components/user-info-expansion-panel.vue";
import TokenInfoExpansionPanel from "@/components/auth-view-components/token-info-expansion-panel.vue";
import { SigninResponse, DomainUser, OidcClient, directAuthFlow } from "@/services/oauth";


class User{
  constructor() {
    this.Username = ''
    this.Password = ''
  }
  Username: String
  Password: String
}

const pageSettings = ref({
  panel: 0,
  userCredentials: new User(),
  isLoggedIn: false //dummy holder for now
})

function resetUserCredentials(){
  pageSettings.value.userCredentials = new User()
}

const authUser = ref<SigninResponse>()

function login(){
  directAuthFlow.loginDirect(pageSettings.value.userCredentials.Username, pageSettings.value.userCredentials.Password)
    .then((user: SigninResponse) => {
      authUser.value = user
      resetUserCredentials()
    })
}

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
          <v-card-title class="text-center">Direct Access</v-card-title>
          <v-card-text class="text-center">
            <p><strong>Description:</strong> This is a test of the Direct Access Authentication</p>
          </v-card-text>
          <v-card-text v-if="!authUser?.profile">
            <v-text-field v-model="pageSettings.userCredentials.Username" label="User Name" />
            <v-text-field v-model="pageSettings.userCredentials.Password" type="password" label="Password" />
            <v-btn :block="true" size="x-large" @click="login" color="hcaPrimary">Login</v-btn>
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
