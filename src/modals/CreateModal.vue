<script setup lang="ts">
import { InputCustomEvent } from '@ionic/vue';

import { ref, type Ref } from 'vue';
import { post, HTTP } from '@/libs/http';

const title: Ref<string> = ref("")

const value: Ref<number> = ref(0)
const content: Ref<string> = ref("")

async function postCreateRequest():Promise<boolean>{
	const data = JSON.stringify({
		title: title.value,
		value: value.value,
		content: content.value
	})
	const response = await post("/transaction/new", data)
	return response.code == HTTP.OK
}

function TitleInput(event:InputCustomEvent){
	title.value = event.target.value as string
}

function ValueInput(event:InputCustomEvent){
	value.value = event.target.value as number
}

const contentIonInput = ref()

function ContentTextAreaInput(event:InputCustomEvent){
	content.value = event.target.value as string
	contentIonInput.value.classList.remove('ion-valid');
	contentIonInput.value.classList.remove('ion-invalid');
	if(content.value.length>0){
		contentIonInput.value.classList.add('ion-valid');
	}
	contentIonInput.value.classList.add('ion-invalid');
	console.info("validating")
}

function CreateIonButtonClick(){
	postCreateRequest()
}

function CounterFormatter(inputLength:number, maxLength:number) {
	return `${maxLength - inputLength}`
}

</script>

<template>
	<ion-modal trigger="create-ion-modal-trigger">
		<ion-card>
			<ion-card-header>
				<ion-title>创建需求</ion-title>
			</ion-card-header>
			<ion-card-content >
				<ion-input class="margin-y"
					label="标题"
					@ionInput="TitleInput"
				/>
				<ion-input class="margin-y"
					label="报酬"
					@ionInput="ValueInput"
				/>
				<ion-textarea class="margin-y"
					:auto-grow="true"
					:counter="true"
					ref="contentIonInput"
					rows="16"
					label="内容"
					label-placement="floating"
					placeholder="在这里写下你的需求"
					error-text="请输入内容！"
					fill="outline"
					@ionInput="ContentTextAreaInput"
					maxlength="500"
					:counter-formatter="CounterFormatter"
				/>
				<ion-button class="margin-y"
					expand="block"
					@click="CreateIonButtonClick"
				>发布</ion-button>
			</ion-card-content>
		</ion-card>
	</ion-modal>
</template>

<style scoped>
ion-textarea{
	min-height: 600px;
}
.margin-y{
	margin-top: 10px;
	margin-bottom: 10px;
}
</style>