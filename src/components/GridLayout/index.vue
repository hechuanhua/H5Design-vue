<template>
	<grid-layout
		v-model:layout="propsData"
		:style="{
			width: `${layoutConfig.width}px`,
			height: isChildren ? '200px' : '600px',
		}"
		:col-num="layoutConfig.colNum"
		:row-height="layoutConfig.rowHeight"
		:is-draggable="isEdit"
		:is-resizable="isEdit"
		:is-bounded="isEdit"
		:vertical-compact="isEdit"
		:responsive="false"
		:auto-size="isEdit"
		:containerPadding="[0, 0]"
		:margin="[0, 0]"
		:use-css-transforms="true"
		@drop.native="drop"
		@dragend.prevent
		@dragover.prevent
		ref="gridLayoutRef"
		:class="[
			'gridLayout',
			{ 'gridLayout-preview': type === 'preview' },
			{ 'children-grid-layout': isChildren },
		]"
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
			<span class="formKey" v-if="type === LayoutType.EDIT && item.type === ComponentsType.FROM">
				{{ item.config.formKey }}
			</span>
			<Render
				:layoutItem="item"
				:dragData="dragData"
				:type="type"
				:layoutData="layoutData"
			></Render>
		</grid-item>
	</grid-layout>
</template>

<script lang="ts" setup>
import { ref, watch, PropType, computed } from 'vue';
import { ComponentsInfo, ComponentsType, LayoutDataItem, LayoutType } from '@/typings/Component';
import { useLayoutDataStore } from '@/stores/layoutData';
import { createUuid } from '@/utils/index';
import Render from './Render.vue';

const props = defineProps({
	layoutData: {
		type: Array as PropType<ComponentsInfo[]>,
		default: () => [],
	},
	isChildren: {
		type: Boolean,
		default: false,
	},
	type: {
		type: String as PropType<LayoutType>,
		default: LayoutType.EDIT,
	},
});

const layoutConfig = {
	width: 1200,
	colNum: 600,
	rowHeight: 1,
};

const emit = defineEmits(['update:layoutData']);
const store = useLayoutDataStore();
const propsData = ref(props.layoutData);
const gridLayoutRef = ref<any>(null);
const gridItemRef = ref<any[]>([]);
const dragData = ref({} as ComponentsInfo);
const isEdit = computed(() => props.type === LayoutType.EDIT);

const drop = (event: DragEvent) => {
	event.preventDefault();
	event.stopPropagation();
	const tempData = event.dataTransfer?.getData('dragData');
	if (tempData) {
		dragData.value = JSON.parse(tempData);
		console.log(dragData.value, 'dragData');
		const ret = gridLayoutRef.value.$el.getBoundingClientRect();
		const uuid = createUuid(6);
		const position = {
			x: Math.round((event.pageX - ret.left) / (layoutConfig.width / layoutConfig.colNum)),
			y: Math.round((event.pageY - ret.top) / layoutConfig.rowHeight),
			w: dragData.value.w,
			h: dragData.value.h,
			i: uuid,
		};
		propsData.value.push({ ...dragData.value, ...position });

		gridLayoutRef.value.dragEvent('dragstart', 'drop', position.x, position.y, 1, 1);
		emit('update:layoutData', propsData.value);
		store.currentId = uuid;
	}
};

const selectGridItem = (item: LayoutDataItem) => {
	console.log(item, 'selectGridItem');
	if (props.type === LayoutType.PREVIEW) return;
	store.currentId = item.i;
};

watch(
	() => props.layoutData,
	() => {
		console.log(99);
		propsData.value = props.layoutData;
	}
);
</script>
<style lang="less" scoped>
.gridLayout {
	&.gridLayout-preview {
		.grid-item {
			border: none;
		}
	}
	.grid-item {
		border: 1px solid #333;
		&.active {
			border: 2px solid red;
			box-sizing: content-box;
		}
		.formKey {
			position: absolute;
			z-index: 111;
			color: red;
		}
	}
}
</style>
