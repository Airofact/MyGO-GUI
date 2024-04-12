<script setup lang="ts">
import { Ref, onMounted, reactive, ref } from 'vue'
import { addOutline } from 'ionicons/icons'

import {
	IonCard,
	IonCardContent,
	IonIcon,
	IonFab,
	IonFabButton,
	IonPage,
	IonContent,
	IonList,
} from '@ionic/vue'

import { HTTP, get } from '@/libs/http'

import { Transaction } from '@/libs/types'
import TransactionWithDetailComponent from '@/components/TransactionWithDetailComponent.vue'

/**
 * To-do:
 * 1. Wait for the backend finish the count api to get the total number of transactions
 *    Depending on the total number of transactions, we can calculate the total number of pages
 *    Then we can add selector to let the user select the page they want to see
 *
 * 2. Add a loading spinner when the user is fetching the transactions
 *
 * 3. When user click the transaction, we should redirect the user to the transaction detail page
 *
 * Tips:
 *    Only the admin can see all the transactions, the normal user can only see passed transactions
 */

const isLoading = ref(true)

/**
 * this index is used to fetch more transactions, starting from 0
 * each time we fetch, we increase the index by 1
 * and each batch of transactions is 50
 */

const requirements = reactive<Transaction[]>([
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
		"user_id": 1,
		"title": "提供社交支持和陪伴",
		"description": "提供陪聊、一起散步等社交活动。",
		"value": 1,
		"createdAt": Date.now(),
		"updatedAt": Date.now()
	},
	{
		"id": 3,
		"user_id": 1,
		"title": "协助理发、洗浴、穿衣等",
		"description": "提供理发、洗澡、穿衣等个人护理帮助。",
		"value": 1,
		"createdAt": Date.now(),
		"updatedAt": Date.now()
	},
	{
		"id": 4,
		"user_id": 1,
		"title": "帮助清理家居环境",
		"description": "协助扫地、擦桌子等家务活动。",
		"value": 1,
		"createdAt": Date.now(),
		"updatedAt": Date.now()
	},
	{
		"id": 5,
		"user_id": 1,
		"title": "提供医疗陪护",
		"description": "陪同就医、监控健康状况等医疗护理。",
		"value": 1,
		"createdAt": Date.now(),
		"updatedAt": Date.now()
	},
	{
		"id": 6,
		"user_id": 1,
		"title": "教授使用新科技",
		"description": "教授使用手机、平板电脑等新科技设备。",
		"value": 1,
		"createdAt": Date.now(),
		"updatedAt": Date.now()
	},
	{
		"id": 7,
		"user_id": 1,
		"title": "陪同参加社区活动或健康课程",
		"description": "陪同老年人参加社区活动、健康讲座等。",
		"value": 1,
		"createdAt": Date.now(),
		"updatedAt": Date.now()
	},
	{
		"id": 8,
		"user_id": 1,
		"title": "帮助安装和使用医疗设备",
		"description": "帮助老年人安装和使用医疗设备。",
		"value": 1,
		"createdAt": Date.now(),
		"updatedAt": Date.now()
	},
	{
		"id": 9,
		"user_id": 1,
		"title": "提供紧急援助服务",
		"description": "提供紧急联系人、急救培训等服务。",
		"value": 1,
		"createdAt": Date.now(),
		"updatedAt": Date.now()
	},
	{
		"id": 10,
		"user_id": 1,
		"title": "帮助处理文件和账单",
		"description": "帮助老年人填写表格、支付账单等文件处理活动。",
		"value": 1,
		"createdAt": Date.now(),
		"updatedAt": Date.now()
	}
])

const index:Ref<number> = ref(0)

const fetchTransactions = async () => {
	const res = await get(`/transaction/limit?index=${index.value}`)
	if (res.code == HTTP.OK) {
		isLoading.value = false
		console.log(res.data.length)
		return res.data as Transaction[]
	}
}

onMounted(async () => {
	// items = (await fetchTransactions()) ?? []
})
</script>

<template>
	<ion-page>
		<ion-content>
			<ion-card>
				<ion-card-header>
					<ion-toolbar>
						<ion-searchbar show-clear-button="focus"></ion-searchbar>
					</ion-toolbar>
					<div class="service-page-filter-container">
						<ion-label>筛选</ion-label>
						<ion-select label="按时间">
							<ion-select-option>本周内</ion-select-option>
							<ion-select-option>本月内</ion-select-option>
							<ion-select-option>本年内</ion-select-option>
						</ion-select>
						<ion-select label="按发布者">
							<ion-select-option>我</ion-select-option>
							<ion-select-option>老人</ion-select-option>
							<ion-select-option>志愿者</ion-select-option>
						</ion-select>
					</div>
				</ion-card-header>
				<ion-card-content>
					<ion-list>
						<div v-for="transaction in requirements" :key="transaction.id">
							<transaction-with-detail-component :data="transaction"/>
						</div>
					</ion-list>
				</ion-card-content>
			</ion-card>

			<ion-fab class="ion-margin-end ion-margin-bottom" slot="fixed" horizontal="end" vertical="bottom">
				<ion-fab-button aria-label="add" color="light">
					<ion-icon aria-hidden :icon="addOutline" ></ion-icon>
				</ion-fab-button>
			</ion-fab>
		</ion-content>
	</ion-page>
</template>

<style scoped>
.service-page-filter-container{
	display: flex;
	gap: 4%;
	margin: 0 2%;
}
ion-select{
	width: auto;
}
ion-label{
	align-self: center;
}
</style>