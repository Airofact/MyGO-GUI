<script setup lang="ts">
import TransactionDetailComponent from '@/components/TransactionDetailComponent.vue';
import { Transaction } from '@/libs/types'
defineProps<{data:Transaction}>()
</script>

<template>
	<ion-modal trigger="detail-ion-modal-trigger">
		<ion-header>
			<ion-title>
				详情
			</ion-title>
		</ion-header>
		<ion-content>
			<transaction-detail-component :data="data"></transaction-detail-component>
		</ion-content>
	</ion-modal>
</template>