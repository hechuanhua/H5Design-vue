<template>
	<div class="setting-container">
		<Tabs v-model:active-key="tab">
			<TabPane tab="属性设置" key="1">
				<Form>
					<FormItem :label="item.label" v-for="(item, index) in selectGridItem.column" :key="index">
						<Input :placeholder="`请输入${item.label}`" v-if="item.type === ComponentsType.INPUT" />
						<Select
							:options="item.options"
							v-else-if="item.type === ComponentsType.SELECT"
						></Select>
					</FormItem>
				</Form>
			</TabPane>
			<TabPane tab="交互设置" key="2">
				<Form>
					<FormItem :label="'跳转链接'">
						<Input placeholder="请输入跳转链接"></Input>
					</FormItem>
					<FormItem :label="'自定义转换函数'">
						<Button @click="monacoEditorVisible = true" type="primary">设置</Button>
					</FormItem>
				</Form>
			</TabPane>
		</Tabs>
		<MonacoEditor v-model:visible="monacoEditorVisible" :data="selectGridItem"></MonacoEditor>
	</div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { Tabs, Form, Input, Select, Button } from 'ant-design-vue';
import FromContainer from './FormContainer.vue';
import InputSetting from './InputSetting.vue';
import SelectSetting from './SelectSetting.vue';
import { ComponentsInfo, ComponentsType, LayoutDataItem } from '@/typings/Component';
import { useLayoutDataStore } from '@/stores/layoutData';
import MonacoEditor from '@/components/MonacoEditor.vue';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

const store = useLayoutDataStore();

const selectGridItem = ref<any>({});
const monacoEditorVisible = ref(false);
const getFlatLayout = () => {
	const arr: any[] = [];
	store.layoutData.forEach(item => {
		arr.push(item);
		if (item.children) {
			item.children.forEach(v => arr.push(v));
		}
	});
	return arr;
};

watch(
	() => store.currentId,
	() => {
		console.log(333, store.currentId);
		const flatLayout = getFlatLayout();
		const ret = flatLayout.find(item => item.i === store.currentId);
		if (ret) {
			selectGridItem.value = ret;
		}
	},
	{
		immediate: true,
	}
);
const tab = ref('1');
</script>

<style lang="less" scoped>
.setting-container {
	display: flex;
	flex-direction: column;
	flex: 1;
	position: fixed;
	right: 10px;
	top: 54px;
	bottom: 0;
	width: 300px;
	background: #fff;
	padding-left: 20px;
}
</style>
