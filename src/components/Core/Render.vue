<template>
  <div :class="`components-${propsLayoutItem.type} h100`">
    <div
      v-if="propsLayoutItem.type === ComponentsType.TEXT"
      :style="{
        fontSize: propsLayoutItem.config.size + 'px',
        color: propsLayoutItem.config.color,
        lineHeight: propsLayoutItem.h + 'px',
        whiteSpace: 'pre',
      }"
      v-html="propsLayoutItem.config.value"
    ></div>

    <Input
      v-if="propsLayoutItem.type === ComponentsType.INPUT"
      v-model:value="propsLayoutItem.config.value"
      :placeholder="propsLayoutItem.config.placeholder"
      @pressEnter="onChange(propsLayoutItem.config.value)"
    ></Input>

    <Select
      v-if="propsLayoutItem.type === ComponentsType.SELECT"
      v-model:value="propsLayoutItem.config.value"
      :options="propsLayoutItem.config.options"
      :style="{ width: '100%' }"
      :placeholder="propsLayoutItem.config.placeholder"
      :mode="propsLayoutItem.config.multiple ? 'multiple' : undefined"
      @change="
        (value) => {
          onChange(value);
        }
      "
    ></Select>

    <div
      v-if="propsLayoutItem.type === ComponentsType.ECHARTS"
      :class="['echart h100', { noData: !echartData }]"
    >
      <div
        class="filter tr"
        v-if="echartData && propsLayoutItem.config.is_filter"
      >
        筛选：
        <Select
          :options="echartData_series"
          style="min-width: 200px"
          @change="echartFilterChange"
          mode="multiple"
        ></Select>
      </div>
      <div
        ref="echartsRef"
        v-if="echartData"
        :style="{
          width: propsLayoutItem.w + 'px',
          height: propsLayoutItem.h + 'px',
        }"
      ></div>
      <Empty :image="simpleImage" v-else></Empty>
    </div>

    <RangePicker
      v-if="propsLayoutItem.type === ComponentsType.DATEPICKER"
      @change="onChange"
      :locale="locale"
    ></RangePicker>

    <div class="table" v-if="propsLayoutItem.type === ComponentsType.TABLE">
      <div class="tr" style="padding-right: 20px">
        <Button :type="'primary'" @click="handleExport" v-if="tableSource"
          >导出</Button
        >
      </div>
      <Table
        :columns="tableColumn"
        :data-source="tableSource"
        :scroll="{
          x: 1600,
          y: propsLayoutItem.h,
        }"
      ></Table>
    </div>

    <Button
      v-if="propsLayoutItem.type === ComponentsType.BUTTON"
      :type="'primary'"
    >
      {{ propsLayoutItem.config.text }}
    </Button>

    <RadioGroup
      v-if="propsLayoutItem.type === ComponentsType.RADIOGROUP"
      :options="propsLayoutItem.config.options"
      :optionType="propsLayoutItem.config.type ? 'default' : 'button'"
      v-model:value="propsLayoutItem.config.value"
      @change="onChange(propsLayoutItem.config.value)"
    ></RadioGroup>

    <Tabs
      v-if="propsLayoutItem.type === ComponentsType.TABS"
      @change="onChange"
      :type="'card'"
    >
      <TabPane
        v-for="v in propsLayoutItem.config.options"
        :key="v.value"
        :tab="v.label"
        :forceRender="true"
      >
        <GridLayout
          v-model:layoutData="v.children"
          :style="{ width: `100%`, height: '100%' }"
          :isChildren="true"
          :dragData="dragData"
          :type="type"
        ></GridLayout>
      </TabPane>
    </Tabs>

    <GridLayout
      v-if="propsLayoutItem.type === ComponentsType.COMMONCONTAINER"
      v-model:layoutData="propsLayoutItem.children"
      :style="{ width: `100%`, height: '100%' }"
      :isChildren="true"
      :dragData="dragData"
      :type="type"
    ></GridLayout>

    <GridLayout
      v-if="propsLayoutItem.type === ComponentsType.CONTAINER"
      v-model:layoutData="propsLayoutItem.children"
      :style="{ width: `100%`, height: '100%' }"
      :isChildren="true"
      :dragData="dragData"
      :type="type"
    ></GridLayout>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, PropType } from "vue";
import {
  Input,
  Select,
  RangePicker,
  Table,
  Button,
  Empty,
  Tabs,
  Radio,
} from "ant-design-vue";
import * as echarts from "echarts";
import { ComponentsInfo, ComponentsType, PageType } from "@/typings/Common";
import GridLayout from "./index.vue";
import { usePreviewDataStore } from "@/stores/previewData";
import { post } from "@/api/request";
import {
  useEchartsBarData,
  useEchartsTableData,
  useEchartsPieData,
} from "./useData";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";

const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const props = defineProps({
  layoutData: {
    type: Array as PropType<ComponentsInfo[]>,
    default: () => [],
  },
  layoutItem: {
    type: Object as PropType<ComponentsInfo>,
    default: () => {},
  },
  dragData: {
    type: Object as PropType<ComponentsInfo>,
    default: () => {},
  },
  isChildren: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<PageType>,
    default: PageType.EDIT,
  },
});

const previewStore = usePreviewDataStore();
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
const tableColumn = ref([]);
const tableSource = ref<any>();
const echartsRef = ref();
const echartData = ref<any>();
const echartData_series = ref([]);
const propsLayoutItem = ref(props.layoutItem);

let echart = null as any;

const getCurrentContainerParams = () => {
  const params: any = {};
  props.layoutData.forEach((item) => {
    if (item.config.key) {
      params[item.config.key] = item.config.value;
    }
  });
  return params;
};

const onChange = (value: any) => {
  console.log(value, propsLayoutItem.value, 888);
  if (props.type === PageType.EDIT) return;
  if (propsLayoutItem.value.type === ComponentsType.DATEPICKER) {
    propsLayoutItem.value.config.value =
      dayjs(value[0]).format("YYYY-MM-DD") +
      "T00:00:00 : " +
      dayjs(value[1]).format("YYYY-MM-DD") +
      "T00:00:00";
  } else {
    propsLayoutItem.value.config.value = value;
  }

  const parentId = propsLayoutItem.value.parentId;
  if (parentId) {
    previewStore.params[parentId] = getCurrentContainerParams();
  }
};

const echartFilterChange = (value: any) => {
  if (props.type === PageType.EDIT) return;
  const cloneEchartData = JSON.parse(JSON.stringify(echartData.value));
  const series = cloneEchartData.series.filter((item: any) =>
    value.includes(item.name)
  );
  if (series.length) {
    cloneEchartData.series = series;
  } else {
    cloneEchartData.series = cloneEchartData.series;
  }
  cloneEchartData.legend.data = series.map((item: any) => item.name);
  cloneEchartData.xAxis = {
    ...cloneEchartData.xAxis,
    boundaryGap: true,
  };
  setTimeout(() => {
    echart = echarts.init(echartsRef.value);
    echart.setOption(cloneEchartData, true);
    echart.resize();
  }, 100);
};

const downCsv = (data: any) => {
  let csvString = "";
  Object.keys(data[0]).forEach((value: any) => {
    csvString += value + ",";
  });
  csvString += "\r\n";
  data.forEach((item: any) => {
    (Object as any).values(item).forEach((value: any) => {
      csvString += value + ",";
    });
    csvString += "\r\n";
  });
  csvString =
    "data:application/csv;charset=utf-8,\ufeff" + encodeURIComponent(csvString);
  const a = document.createElement("a");
  a.setAttribute("href", csvString);
  a.setAttribute("download", `${Date.now()}.csv`);
  a.style.display = "none";
  a.click();
  a.remove();
};

const handleExport = () => {
  if (props.type === PageType.EDIT) return;
  if (!tableSource.value || (tableSource.value && !tableSource.value.length))
    return;
  downCsv(tableSource.value);
  // let fileName = '';
  // fetch(`${config.api}/exportCsv`, {
  // 	method: 'POST',
  // 	body: JSON.stringify(tableSource),
  // })
  // 	.then(res => {
  // 		const fileNameEncode = res.headers.get('Content-Disposition')!;
  // 		fileName = decodeURIComponent(fileNameEncode);
  // 		return res.blob();
  // 	})
  // 	.then(res => {
  // 		console.log(res, 'res');
  // 		const a = document.createElement('a');
  // 		const blob = new Blob([res], {
  // 			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; application/octet-stream',
  // 		});
  // 		const fileUrl = window.URL.createObjectURL(blob);
  // 		a.href = fileUrl;
  // 		console.log('url', fileUrl);

  // 		a.setAttribute('download', fileName);
  // 		a.style.display = 'none';
  // 		a.click();
  // 		a.remove();
  // 	});
};

const getFormDataParams = () => {
  if (!propsLayoutItem.value.config.params) return previewStore.params;
  const init_params = JSON.parse(propsLayoutItem.value.config.params);
  const parentId = propsLayoutItem.value.parentId;
  let currentContainerParams = {};
  if (parentId) {
    currentContainerParams = previewStore.params[parentId];
  }
  // 合并参数
  const mergeParams = JSON.parse(
    JSON.stringify(
      Object.assign({}, previewStore.params["common"], currentContainerParams)
    )
  );

  // 转化参数
  const extra_filters: any[] = [];
  Object.keys(mergeParams).forEach((item: any) => {
    extra_filters.push({
      col: item,
      op: item === "__time_range" ? "==" : "in",
      val: mergeParams[item],
    });
  });
  init_params.extra_filters = extra_filters;

  const formData = new FormData();
  formData.append("form_data", JSON.stringify(init_params));
  return formData;
};

const fetchPageData = () => {
  if (propsLayoutItem.value.type === ComponentsType.COMMONCONTAINER) return;
  if (
    !propsLayoutItem.value.config.api ||
    !propsLayoutItem.value.config.api.url
  )
    return;
  previewStore.loading = true;
  if (propsLayoutItem.value.config.api.method === "post") {
    post(`/proxy?${propsLayoutItem.value.config.api.url}`, {
      formData: true,
      data: getFormDataParams(),
    }).then((res: any) => {
      previewStore.loading = false;
      const type = propsLayoutItem.value.type;
      if (type === ComponentsType.ECHARTS) {
        let options: any = null;
        if (!res.data) {
          return (echartData.value = null);
        }
        if (propsLayoutItem.value.config.echartsType === "pie") {
          options = useEchartsPieData(
            res,
            propsLayoutItem.value.config.echartsType
          );
        } else {
          if (res.data.columns) {
            if (!res.data.columns.length) {
              return (echartData.value = null);
            }
            options = useEchartsTableData(
              res,
              propsLayoutItem.value.config.echartsType
            );
          } else {
            options = useEchartsBarData(
              res,
              propsLayoutItem.value.config.echartsType
            );
          }
        }
        echartData_series.value = options.series.map((item: any) => ({
          label: item.name,
          value: item.name,
        }));
        initEcharts(options);
      } else if (type === ComponentsType.TABLE) {
        tableColumn.value = res.data.columns.map((item: any) => ({
          title: item,
          key: item,
          dataIndex: item,
        }));

        // 保留2位小数
        res.data.records.forEach((item: any) => {
          Object.keys(item).forEach((v) => {
            let data = item[v];
            if (/^\d+\.\d{3}/.test(data)) {
              item[v] = data.toFixed(2);
            }
          });
        });

        tableSource.value = res.data.records;
      }
    });
  }
  // request({
  // 	url: `/proxy?${propsLayoutItem.value.config.api.url}`,
  // 	data: getFormDataParams(),
  // 	method: propsLayoutItem.value.config.api.method,
  // }).then((res: any) => {
  // 	previewStore.loading = false;
  // 	const type = propsLayoutItem.value.type;
  // 	if (type === ComponentsType.ECHARTS) {
  // 		let options: any = null;
  // 		if (!res.data) {
  // 			return (echartData.value = null);
  // 		}
  // 		if (propsLayoutItem.value.config.echartsType === 'pie') {
  // 			options = useEchartsPieData(res, propsLayoutItem.value.config.echartsType);
  // 		} else {
  // 			if (res.data.columns) {
  // 				if (!res.data.columns.length) {
  // 					return (echartData.value = null);
  // 				}
  // 				options = useEchartsTableData(res, propsLayoutItem.value.config.echartsType);
  // 			} else {
  // 				options = useEchartsBarData(res, propsLayoutItem.value.config.echartsType);
  // 			}
  // 		}
  // 		echartData_series.value = options.series.map((item: any) => ({
  // 			label: item.name,
  // 			value: item.name,
  // 		}));
  // 		console.log(options, 'options');
  // 		initEcharts(options);
  // 	} else if (type === ComponentsType.TABLE) {
  // 		tableColumn.value = useTableData(res);
  // 		tableSource.value = res.data.records;
  // 	}
  // });
};

watch(
  () => props.layoutItem,
  () => {
    propsLayoutItem.value = props.layoutItem;
  }
);

if (props.type === PageType.PREVIEW) {
  if (propsLayoutItem.value.config.api?.url) {
    const parentId = propsLayoutItem.value.parentId;
    if (parentId) {
      watch(
        () => previewStore.params[parentId],
        (newVal, oldVal) => {
          if (JSON.stringify(newVal) === JSON.stringify(oldVal)) return;
          fetchPageData();
        },
        {
          immediate: false,
        }
      );
    }
    watch(
      () => previewStore.params["common"],
      (newVal, oldVal) => {
        if (JSON.stringify(newVal) === JSON.stringify(oldVal)) return;
        fetchPageData();
      },
      {
        immediate: false,
      }
    );
  }
}

const initEcharts = (data?: any) => {
  if (propsLayoutItem.value.type === ComponentsType.ECHARTS) {
    if (!data) return;
    echartData.value = data;
    setTimeout(() => {
      echart = echarts.init(echartsRef.value);
      echart.setOption(data);
      echart.resize();
    }, 100);
  }
};

onMounted(() => {
  if (props.type === PageType.PREVIEW) return;
  initEcharts();
});
</script>
<style lang="less" scoped>
.noData {
  overflow: hidden;
}
:deep(.ant-tabs) {
  height: 100%;
  overflow: inherit;
  .ant-tabs-content-holder,
  .ant-tabs-content,
  .ant-tabs-tabpane {
    height: 100%;
  }
}
</style>
