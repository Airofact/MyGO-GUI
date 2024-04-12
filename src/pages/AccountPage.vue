<script setup lang="ts">
import { Transaction, TransactionStatus } from '@/libs/types';
import {
  IonImg,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonAvatar,
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel,
  IonContent,
  IonPage
} from '@ionic/vue'
import { reactive } from 'vue';
import TransactionWithDetailComponent from '@/components/TransactionWithDetailComponent.vue';

interface HistoryTransactionType{
  status:TransactionStatus,
  data:Transaction
}

const historyTransactions = reactive<HistoryTransactionType[]>([
  {
    status:TransactionStatus.DRAFT,
    data:{
      "id": 1,
      "user_id": 1,
      "title": "帮助购买日常用品",
      "description": "购买食物、药品等日常生活必需品。",
      "value": 1,
      "createdAt": Date.now(),
      "updatedAt": Date.now()
    }
  },
  {
    status:TransactionStatus.CENSORING,
    data:{
      "id": 2,
      "user_id": 2,
      "title": "提供情感陪伴",
      "description": "陪伴老年人度过孤独的时光。",
      "value": 2,
      "createdAt": Date.now(),
      "updatedAt": Date.now()
    }
  },
  {
    status:TransactionStatus.PASSED,
    data:{
      "id": 3,
      "user_id": 3,
      "title": "协助生活照料",
      "description": "帮助老年人处理日常生活事务。",
      "value": 3,
      "createdAt": Date.now(),
      "updatedAt": Date.now()
    }
  },
  {
    status: TransactionStatus.REJECT,
    data: {
      id: 4,
      user_id: 1,
      title: "提供家庭烹饪",
      description: "为家庭提供健康美味的饭菜。",
      value: 4,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  }
]);

</script>

<template>
  <ion-page>
    <ion-content>
      <ion-card>
        <ion-card-content>
          <ion-item>
            <ion-avatar slot="start">
              <ion-img alt="头像" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </ion-avatar>
            <ion-label>MyGO Project</ion-label>
          </ion-item>

          <ion-accordion-group expand="inset">
            <ion-accordion>
              <ion-item slot="header">
                <ion-label>余额 (T)</ion-label>
              </ion-item>
              <ion-item slot="content" lines="none">
                <ion-label>62.93</ion-label>
              </ion-item>
            </ion-accordion>
          </ion-accordion-group>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>服务历史</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <transaction-with-detail-component v-for="transaction in historyTransactions" :key="transaction.data.id" :data="transaction.data"/>
          </ion-list>
        </ion-card-content>
      </ion-card>
      <ion-button expand="block">管理账号</ion-button>
      <ion-button expand="block" color="danger">登出账号</ion-button>
    </ion-content>
  </ion-page>
</template>
