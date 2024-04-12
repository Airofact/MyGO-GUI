<script setup lang="ts">
import {
  IonLabel,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonPage
} from '@ionic/vue'
import {
  create,
  checkbox
} from 'ionicons/icons'

import CensorModal from '@/modals/CensorModal.vue';
import CreateModal from '@/modals/CreateModal.vue';

import TransactionWithDetailComponent from '@/components/TransactionWithDetailComponent.vue';

import { Role, Transaction } from '@/libs/types'
import useTokenStore from '@/stores/token';
import { reactive } from 'vue';

const userInfo = useTokenStore().userInfo

const isOld = userInfo?.role == Role.OLD
const isVolunteer = userInfo?.role == Role.VOLUNTEER
const isAdmin = userInfo?.role == Role.ADMIN

const receivedTransactions = reactive<Transaction[]>([
  {
    "id": 1,
    "user_id": 1,
    "title": "帮助购买日常用品",
    "description": "购买食物、药品等日常生活必需品。",
    "value": 1,
    "createdAt": Date.now(),
    "updatedAt": Date.now()
  },
  {
    "id": 2,
    "user_id": 2,
    "title": "提供情感陪伴",
    "description": "陪伴老年人度过孤独的时光。",
    "value": 2,
    "createdAt": Date.now(),
    "updatedAt": Date.now()
  },
  {
    "id": 3,
    "user_id": 3,
    "title": "协助生活照料",
    "description": "帮助老年人处理日常生活事务。",
    "value": 3,
    "createdAt": Date.now(),
    "updatedAt": Date.now()
  }
])

</script>

<template>
  <ion-page>
    <ion-content>
      <ion-card>
        <ion-card-header>
          <ion-card-title>公告</ion-card-title>
        </ion-card-header>
        <ion-img class="home-page-announce-img" alt="头像" :src="`https://picsum.photos/80/80?random=${271828}`" />
      </ion-card>
      <ion-card>
        <ion-card-content>
          <ion-grid>
            <ion-row>
              <ion-col>
                <ion-card>
                  <ion-card-header>
                    <ion-card-title>余额 (T)</ion-card-title>
                  </ion-card-header>
                  <ion-card-content>
                    <ion-label>62.93</ion-label>
                  </ion-card-content>
                </ion-card>
              </ion-col>
              <ion-col v-if="isOld||isVolunteer" class="margin-10">
                <ion-button class="home-functional-ion-button" fill="outline" size="large" id="create-ion-modal-trigger">
                  <ion-icon :icon="create" size="large"/>
                  发布
                </ion-button>
                <create-modal/>
              </ion-col>
              <ion-col v-if="isAdmin" class="margin-10">
                <ion-button class="home-functional-ion-button" fill="outline" size="large" id="censor-ion-modal-trigger">
                  <ion-icon :icon="checkbox" size="large"/>
                  审核
                </ion-button>
                <censor-modal/>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>已接需求</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <ion-list>
            <transaction-with-detail-component v-for="transaction in receivedTransactions" :key="transaction.id" :data="transaction"/>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<style>
.margin-10{
  margin: 10px;
}
.home-functional-ion-button{
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
}
.home-page-announce-img{
  object-fit: cover;
  height: 200px;
}
</style>