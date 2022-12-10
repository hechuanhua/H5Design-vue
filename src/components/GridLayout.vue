<template>
	<grid-layout
		v-model:layout="propsData"
		:style="{
			width: `${layoutConfig.width}px`,
			minHeight: isChildren ? '200px' : '600px',
		}"
		:col-num="layoutConfig.colNum"
		:row-height="layoutConfig.rowHeight"
		:is-draggable="true"
		:is-resizable="true"
		:is-mirrored="false"
		:is-bounded="true"
		:vertical-compact="true"
		:responsive="false"
		:auto-size="true"
		:containerPadding="[0, 0]"
		:margin="[0, 0]"
		:use-css-transforms="true"
		@layout-updated="layoutChange"
		@drop.native="drop"
		@dragend.prevent
		@dragover.prevent
		ref="gridLayoutRef"
		:class="{ 'children-grid-layout': isChildren }"
	>
		<grid-item
			ref="gridItemRef"
			:class="['grid-item', { active: store.currentId === item.i }]"
			v-for="item in propsData"
			:x="item.x"
			:y="item.y"
			:w="item.w"
			:h="item.h"
			:i="item.i"
			:key="item.i"
			@click.stop="selectGridItem(item)"
		>
			<Input v-if="item.type === ComponentsType.INPUT"></Input>
			<Select
				v-if="item.type === ComponentsType.SELECT"
				v-model="item.config.value"
				:options="item.config.options"
				:style="{ width: '100%' }"
				placeholder="请选择"
				@change="
					(value, option) => {
						selectChange(value, option, item);
					}
				"
			></Select>
			<GridLayoutSelf
				v-if="item.type === ComponentsType.FROM"
				v-model:layoutData="item.children"
				:style="{ width: `100%`, height: '100%', background: '#ccc' }"
				:isChildren="true"
			></GridLayoutSelf>
		</grid-item>
	</grid-layout>
</template>

<script lang="ts">
export default {
	name: 'GridLayoutSelf',
};
</script>

<script lang="ts" setup>
import { ref, onMounted, watch, PropType } from 'vue';
import { Tabs, Input, Select } from 'ant-design-vue';
import { ComponentsInfo, ComponentsType, LayoutDataItem } from '@/typings/Component';
import { useLayoutDataStore } from '@/stores/layoutData';
import { createUuid } from '@/utils/index';

const props = defineProps({
	layoutData: {
		type: Array as PropType<ComponentsInfo[]>,
		default: () => [],
	},
	isChildren: {
		type: Boolean,
		default: false,
	},
});

const store = useLayoutDataStore();
const propsData = ref(props.layoutData);
const emit = defineEmits(['update:layoutData']);

watch(
	() => props.layoutData,
	() => {
		propsData.value = props.layoutData;
	}
);
const TabPane = Tabs.TabPane;

const layoutConfig = {
	width: 1200,
	colNum: 600,
	rowHeight: 1,
};

const tabVal = ref('1');
const gridLayoutRef = ref<any>(null);
const gridItemRef = ref<any[]>([]);

const drop = (event: DragEvent) => {
	event.preventDefault();
	event.stopPropagation();
	const tempData = event.dataTransfer?.getData('dragData');
	console.log('children=>drop', props);
	if (tempData) {
		const dragData: any = JSON.parse(tempData);

		const ret = gridLayoutRef.value.$el.getBoundingClientRect();
		const position = {
			x: Math.round((event.pageX - ret.left) / (layoutConfig.width / layoutConfig.colNum)),
			y: Math.round((event.pageY - ret.top) / layoutConfig.rowHeight),
			w: dragData.w,
			h: dragData.h,
			i: createUuid(8),
		};
		propsData.value.push({ ...dragData, ...position, position });
		// propsData.value = props.layoutData.concat(position);

		console.log(propsData.value, JSON.stringify(props.layoutData), 111);
		emit('update:layoutData', propsData.value);
		console.log('drop', props.layoutData, event.dataTransfer?.getData('dragData'));
	}
};

const layoutChange = () => {
	// console.log("layoutChange", layoutData);
};

const selectChange = (value: any, option: any, data: any) => {
	console.log('selectChange', value, option, data);
	data.config.value = value;
};

const selectGridItem = (item: LayoutDataItem) => {
	console.log(item, 888);
	// currentId.value = item.i;
	store.currentId = item.i;
};
</script>
<style lang="less" scoped>
.grid-item {
	background-color: #999;
	&.active {
		border: 2px solid red;
		box-sizing: content-box;
	}
}
</style>
