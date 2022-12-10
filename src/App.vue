<template>
	<Header></Header>
	<main>
		<SideMenu></SideMenu>
		<Setting></Setting>
		<div class="drag-container">
			<GridLayout v-model:layoutData="layoutData"></GridLayout>
		</div>
	</main>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import Header from '@/components/Header.vue';
import SideMenu from '@/components/SideMenu.vue';
import Setting from '@/components/Setting/index.vue';
import { storeToRefs } from 'pinia';
import { useLayoutDataStore } from '@/stores/layoutData';
import GridLayout from '@/components/GridLayout.vue';
const store = useLayoutDataStore();
const { layoutData } = storeToRefs(store) as any;

watch(
	() => layoutData.value,
	() => {
		localStorage.setItem('layoutData', JSON.stringify(layoutData.value));
	},
	{ deep: true }
);
</script>

<style lang="less" scoped>
main {
	top: 60px;
	width: 100%;
	margin-top: 100px;
}

.drag-container {
	width: 1200px;
	margin: 0 auto;
	min-height: 500px;
	position: relative;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
	background: #eee;
}
</style>
