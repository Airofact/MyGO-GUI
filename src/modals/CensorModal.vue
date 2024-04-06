<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { Transaction, TransactionStatus } from '../libs/types'
import { get, HTTP } from '../libs/http'

const censoringTransactions: Ref<Transaction[]> = ref([])

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
				<ion-card-title>审核</ion-card-title>
			</ion-card-header>

			<ion-card-content>
				<ion-list>
					<ion-item v-for="transaction in censoringTransactions" :key="transaction.id">
						<ion-accordion :value="transaction.id">
							<ion-item>
								<transaction-component :data="transaction"/>
							</ion-item>
							<div>
								<ion-button>详情</ion-button>
								<ion-button color="success">通过</ion-button>
								<ion-button color="danger">驳回</ion-button>
							</div>
						</ion-accordion>
					</ion-item>
				</ion-list>
			</ion-card-content>
		</ion-card>
	</ion-modal>
</template>