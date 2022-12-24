import { defineCustomElement } from 'vue';
import Preview from '@/views/Preview.vue';
import styles from 'ant-design-vue/dist/antd.css?inline'; // or 'ant-design-vue/dist/antd.less'
import commonStyles from '@/assets/styles/common.less?inline';
export const GraphComponent = defineCustomElement({
	...Preview,
	styles: Preview.styles.concat([styles, commonStyles]),
});

window.customElements.define('vue-layout', GraphComponent);
