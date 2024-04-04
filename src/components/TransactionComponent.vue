<script setup lang="ts">
import { Transaction } from '../libs/types'
defineProps<{data:Transaction}>()
</script>

<template>
	<div>
		<ion-avatar slot="start">
			<ion-img alt="头像" :src="`https://picsum.photos/80/80?random=${data.id}`" />
		</ion-avatar>
		<ion-label>
			<h2>{{ data.title }}</h2>
			<p>{{ data.description }}</p>
		</ion-label>
	</div>
</template>