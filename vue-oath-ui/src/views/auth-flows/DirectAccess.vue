<script setup lang="ts">
import { ref } from 'vue'
import UserInfoExpansionPanel from "@/components/auth-view-components/user-info-expansion-panel.vue";
import TokenInfoExpansionPanel from "@/components/auth-view-components/token-info-expansion-panel.vue";

//Most of the following is placeholder until I get the OAuth bits connected
const dummyUser = ref({
  profile: {
    firstName: 'Matt',
    lastName: 'Sessions',
    email: 'matt.sessions@email.com',
    domain: 'DOMAIN',
    username: 'ABC1234'
  },
  accessToken: 'super duper long token lorem ipsum access token',
  expires: 120,
  idToken: 'id ipsum token of lorem',
  refreshToken: 'lorem ipsum refresh token'
})

class User{
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

function login(){
  resetUserCredentials()
  pageSettings.value.isLoggedIn = true
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
          <v-card-text v-if="!pageSettings.isLoggedIn">
            <v-text-field v-model="pageSettings.userCredentials.Username" label="User Name" />
            <v-text-field v-model="pageSettings.userCredentials.Password" label="Password" />
            <v-btn block="true" size="x-large" @click="login" color="hcaPrimary">Login</v-btn>
          </v-card-text>
          <v-card-text v-if="pageSettings.isLoggedIn">
            <v-expansion-panels :model-value="pageSettings.panel">
              <user-info-expansion-panel
                v-bind="dummyUser.profile"
              />
              <token-info-expansion-panel
                :access-token="dummyUser.accessToken"
                :expires="dummyUser.expires"
                :id-token="dummyUser.idToken"
                :refresh-token="dummyUser.refreshToken"
              />
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
