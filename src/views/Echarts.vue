<template>
	<div class="h100">
		<div
			ref="echartsRef"
			class="echart"
			:style="{
				width: 1200 + 'px',
				height: 500 + 'px',
			}"
		></div>
	</div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import { useEchartsPieData } from '@/components/GridLayout/useData';
import { echartPie } from '@/components/GridLayout/exampleData';

const echartsRef = ref();
const options = useEchartsPieData({ data: echartPie }, 'pie');
onMounted(() => {
	console.log(options, echartsRef.value, 'options');
	const echart = echarts.init(echartsRef.value);
	echart.setOption(options);
	echart.resize();
});
</script>

<style lang="less" scoped>
main {
	top: 60px;
	width: 100%;
	margin-top: 100px;
}

.drag-container {
	width: 1600px;
	margin-left: 200px;
	min-height: 500px;
	position: relative;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
	background: #eee;
}
</style>
