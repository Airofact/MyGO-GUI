<script setup lang="ts">
import TransactionDetailComponent from '@/components/TransactionDetailComponent.vue';
import { Transaction } from '@/libs/types'
import { ref } from 'vue';
defineProps<{data:Transaction}>()

const detailModal=ref()

async function cancel(){
	detailModal.value.$el.dismiss(null, 'cancel')
}
</script>

<template>
	<ion-modal ref="detailModal" :trigger="'detail-ion-modal-trigger-'+data.id">
		<div>
			<ion-modal-header>
				<div class="detail-ion-modal-title">
					<ion-modal-title>
						详情
					</ion-modal-title>
				</div>
			</ion-modal-header>
			<ion-modal-content>
				<div class="detail-ion-modal-content">
					<transaction-detail-component :data="data"></transaction-detail-component>
					<ion-button expand="block" fill="outline" @click="cancel()">好的</ion-button>
				</div>
			</ion-modal-content>
		</div>
	</ion-modal>
</template>

<style scoped lang="less">
.detail-ion-modal-content{
	padding: 20px;
}
.detail-ion-modal-title{
	padding: 10px;
}
</style>