<script setup lang="ts">
import { reactive, ref, type Ref } from 'vue'
import { logInOutline } from 'ionicons/icons'

import {
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonCardHeader,
  IonButton,
  IonIcon,
  IonModal,
  IonCard,
  IonLabel,
  IonInput,
modalController
} from '@ionic/vue'

import { useToken } from '@/stores'
import http from '@/libs/http'

import SignupModal from './SignupModal.vue'

const loginModal = ref()
const openSignupModal = async () => {
    await loginModal.value.$el.dismiss(null,'cancel')
    const modal = await modalController.create({
      component: SignupModal,
    });
    await modal.present();
  };

const passwordIonInput = ref()
function loginIonModalDidPresent() {
  passwordIonInput.value.$el.setFocus()
}

const username: Ref<string> = ref('')
const password: Ref<string> = ref('')
const tokenStore = useToken()
async function loginIonButtonClick(): Promise<void> {
  const data = JSON.stringify({
    password: password.value,
    username: username.value
  })
  const response = await http.post('/login', data)
  const token = response.headers.authorization as string
  tokenStore.setToken(token)
  // returnToHome()
}
</script>

<template>
  <ion-modal ref="loginModal" trigger="login-ion-modal-trigger" keep-contents-mounted @didPresent="loginIonModalDidPresent">
    <ion-card>
      <ion-card-header>
        <ion-card-title>登录</ion-card-title>
        <ion-card-subtitle>欢迎回家</ion-card-subtitle>
      </ion-card-header>

      <ion-card-content>
        <ion-input
          ref="passwordIonInput"
          class="ion-margin-bottom"
          v-model="username"
          autocomplete="username"
          fill="outline"
          label="账号"
          label-placement="stacked"
          clearInput
        />

        <ion-input
          class="ion-margin-bottom"
          v-model="password"
          type="password"
          autocomplete="current-password"
          fill="outline"
          label="密码"
          label-placement="stacked"
          clearInput
        />
        <div class="login-ion-modal-no-account-div">
          <ion-label>没有账号？<a @click="openSignupModal">注册</a></ion-label>
        </div>

        <ion-button
          class="login-ion-button ion-justify-content-center"
          expand="block"
          fill="outline"
          @click="loginIonButtonClick"
        >
          <ion-icon aria-hidden :icon="logInOutline" />
          <ion-label>登录</ion-label>
        </ion-button>
      </ion-card-content>
    </ion-card>
  </ion-modal>
</template>

<style scoped lang="less">
.login-ion-button {
  margin-top: 4%;
}
.login-ion-modal-no-account-div{
  display: flex;
  justify-content: center;
}
</style>
