<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { IonAccordion, IonAccordionGroup } from '@ionic/vue';
import { time } from 'ionicons/icons';
import { Transaction, TransactionStatus } from '../libs/types'
import { get, HTTP } from '../libs/http'
import TransactionComponent from '@/components/TransactionComponent.vue';
import TransactionDetailComponent from '@/components/TransactionDetailComponent.vue';

const censoringTransactions: Ref<Transaction[]> = ref([

  {
    id: 1,
    user_id: 1,
    title: '定时陪伴和交流',
    description: '志愿者每天定时陪伴老年人，进行交流和聊天，以减少孤独感',
    value: 1,
    createdAt: 1,
    updatedAt: 1
  },

  {
    id: 2,
    user_id: 1,
    title: '家务帮助',
    description: '志愿者提供家务帮助，如购物、清洁、做饭等，减轻老年人的负担',
    value: 1,
    createdAt: 1,
    updatedAt: 1
  },

  {
    id: 3,
    user_id: 1,
    title: '健康关怀',
    description: '志愿者提供健康关怀服务，帮助老年人进行健康监测、测量生理指标等，定期报告健康状况',
    value: 1,
    createdAt: 1,
    updatedAt: 1
  },

  {
    id: 4,
    user_id: 1,
    title: '社交活动组织',
    description: '志愿者组织社交活动，如聚餐、游戏、户外活动等，增进老年人之间的交流和社交',
    value: 1,
    createdAt: 1,
    updatedAt: 1
  },

  {
    id: 5,
    user_id: 1,
    title: '医疗陪护',
    description: '志愿者提供医疗陪护服务，陪同老年人就医，协助照顾和护理',
    value: 1,
    createdAt: 1,
    updatedAt: 1
  },
])

function censorIonModalDidPresent() {
	fetchCensoringTransactions()
}

async function fetchCensoringTransactions() {
	const response = await get(`/transaction/by?status=${TransactionStatus.CENSORING}`)
	if(response.code == HTTP.OK){
		censoringTransactions.value = response.data
	}
}

</script>

<template>
	<ion-modal trigger="censor-ion-modal-trigger" @didPresent="censorIonModalDidPresent">
		<ion-card>
			<ion-card-header>
				<ion-toolbar>
					<ion-card-title>审核</ion-card-title>
					<ion-button slot="end" fill="clear">

						<ion-icon :icon="time"/>
					</ion-button>
				</ion-toolbar>
			</ion-card-header>

			<ion-card-content>
				<ion-accordion-group>
					<ion-accordion v-for="transaction in censoringTransactions" :key="transaction.id" :value="transaction.id.toString()">
						<ion-item slot="header">
							<transaction-component :data="transaction"/>
						</ion-item>
						<div slot="content">
              <transaction-detail-component :data="transaction"/>
							<ion-button expand="block" color="success">通过</ion-button>
							<ion-button expand="block" color="danger">驳回</ion-button>
						</div>
					</ion-accordion>
				</ion-accordion-group>
			</ion-card-content>
		</ion-card>
	</ion-modal>
</template>