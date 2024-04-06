<script setup lang="ts">
import { Transaction } from '@/libs/types'
defineProps<{data:Transaction}>()
</script>

<template>
	<ion-card>
		<ion-card-header>
			<ion-card-title>
				{{ data.title }}
			</ion-card-title>
			<ion-card-subtitle>
				该需求由{{ data.user_id }}于{{ data.createdAt }}创建 更新于{{ data.updatedAt }}
			</ion-card-subtitle>
		</ion-card-header>
		<ion-card-content>
			{{ data.description }}
		</ion-card-content>
	</ion-card>
</template>