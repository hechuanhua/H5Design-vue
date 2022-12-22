<template>
  <Header></Header>
  <main>
    <SideMenu></SideMenu>
    <Setting></Setting>
    <div class="drag-container" :style="{ width: gridLayoutConfig + 'px' }">
      <GridLayout v-model:layoutData="editStore.layoutData"></GridLayout>
    </div>
  </main>
</template>
<script setup lang="ts">
import { watch } from "vue";
import Header from "@/components/Header.vue";
import SideMenu from "@/components/SideMenu.vue";
import Setting from "@/components/Setting/index.vue";
import { storeToRefs } from "pinia";
import { useEditDataStore } from "@/stores/editData";
import GridLayout from "@/components/GridLayout/index.vue";
import request from "@/utils/request";
import { gridLayoutConfig } from "@/components/GridLayout/service";
import { getTemplateList } from "@/api";
const editStore = useEditDataStore();
// const { layoutData } = storeToRefs(editStore) as any;

watch(
  () => editStore.layoutData,
  () => {
    localStorage.setItem("layoutData", JSON.stringify(editStore.layoutData));
  },
  { deep: true }
);

getTemplateList().then((res) => {
  editStore.templateData = res;
});

const test = () => {
  const formData = new FormData();
  const params = {
    datasource: "305__table",
    viz_type: "line",
    slice_id: 455,
    url_params: {
      preselect_filters:
        '{"456": {"app_key": ["000c84a7fd6187ba43982ea9"], "__time_range": "Last week"}, "457": {"__time_range": "Last week"}, "460": {"__time_range": "Last week"}, "464": {"__time_range": "Last week"}, "466": {"__time_range": "Last week"}, "470": {"__time_range": "Last week"}}',
    },
    time_range_endpoints: ["inclusive", "exclusive"],
    granularity_sqla: "iday",
    time_grain_sqla: "P1D",
    time_range: "Last week",
    metrics: [
      {
        aggregate: null,
        column: null,
        expressionType: "SQL",
        hasCustomLabel: true,
        isNew: false,
        label: "下发率",
        optionName: "metric_idu6m6xgb1l_byfyfjnz77f",
        sqlExpression: "(SUM(target)/sum(effect_target))*100",
      },
      {
        aggregate: null,
        column: null,
        expressionType: "SQL",
        hasCustomLabel: true,
        isNew: false,
        label: "送达率",
        optionName: "metric_luy6bc6lfnq_8rxvh19mnvv",
        sqlExpression: "(SUM(arrive)/sum(target))*100",
      },
      {
        aggregate: null,
        column: null,
        expressionType: "SQL",
        hasCustomLabel: true,
        isNew: false,
        label: "展示率",
        optionName: "metric_rmfcnywdnt_reg2lgncai",
        sqlExpression: "(SUM(show)/sum(arrive))*100",
      },
      {
        aggregate: null,
        column: null,
        expressionType: "SQL",
        hasCustomLabel: true,
        isNew: false,
        label: "点击率",
        optionName: "metric_36vhbv4orhc_n9weasd4czs",
        sqlExpression: "(SUM(click)/sum(arrive))*100",
      },
    ],
    adhoc_filters: [],
    groupby: null,
    order_desc: true,
    contribution: false,
    row_limit: 10000,
    color_scheme: "googleCategory20c",
    label_colors: {
      发送数: "#3366cc",
      展示数: "#dc3912",
      有效目标数: "#ff9900",
      点击数: "#109618",
      目标数: "#990099",
      送达数: "#0099c6",
      下发率: "#dd4477",
      展示率: "#66aa00",
      点击率: "#b82e2e",
      送达率: "#316395",
    },
    show_brush: "auto",
    send_time_range: false,
    show_legend: true,
    rich_tooltip: true,
    show_markers: true,
    line_interpolation: "linear",
    bottom_margin: "auto",
    x_ticks_layout: "auto",
    x_axis_format: "%Y-%m-%d",
    left_margin: "auto",
    y_axis_format: "SMART_NUMBER",
    y_axis_bounds: [null, null],
    rolling_type: "None",
    comparison_type: "values",
    annotation_layers: [],
    queryFields: { metrics: "metrics", groupby: "groupby" },
    extra_filters: [
      { col: "app_key", op: "in", val: ["000c84a7fd6187ba43982ea9"] },
      { col: "__time_range", op: "==", val: "Last week" },
    ],
  };
  formData.append("form_data", JSON.stringify(params));
  request({
    url: `http://bds-idp.jpushoa.com/superset/explore_json/?form_data=%7B%22slice_id%22%3A455%7D&dashboard_id=73`,
    data: formData,
    method: "post",
  }).then((res: any) => {
    console.log(res, 888);
  });
};
// test();
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
