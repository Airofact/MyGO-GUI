<script setup lang="ts">
import { Transaction } from '../libs/types'
defineProps<Transaction>()
</script>

<template>
	<div>
		<ion-avatar slot="start">
			<ion-img alt="头像" :src="`https://picsum.photos/80/80?random=${id}`" />
		</ion-avatar>
		<ion-label>
			<h2>{{ title }}</h2>
			<p>{{ description }}</p>
		</ion-label>
	</div>
</template>