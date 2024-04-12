<script setup lang="ts">
import DetailModal from '@/modals/DetailModal.vue';
import TransactionComponent from './TransactionComponent.vue';
import { Transaction } from '@/libs/types';
defineProps<{data:Transaction}>()
</script>

<template>
	<ion-button :id="'detail-ion-modal-trigger-'+data.id"
		expand="block"
		fill="clear"
		class="detail-trigger-ion-button"
	>
		<div class="detail-trigger-ion-button-inner-div">
			<transaction-component :data="data"></transaction-component>
		</div>
	</ion-button>
	<detail-modal :data="data"/>
</template>

<style scoped lang="less">
.detail-trigger-ion-button-inner-div{
	display: flex;
	width: 100%;
	justify-content: left;
	text-align: left;
	gap: 4%;
}
</style>