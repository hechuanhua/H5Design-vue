import dayjs from "dayjs";

export const useEchartsData = (res: any, echartsType: string) => {
  const xAxis: any = {
    type: "category",
    data: [],
  };
  const series = res.data.map((item: any) => {
    const data = item.values.map((v: any) => {
      const x = dayjs(v.x).format("YYYY-MM-DD");
      if (!xAxis.data.includes(x)) {
        xAxis.data.push(x);
      }
      return v.y;
    });

    return {
      name: item.key,
      data,
      type: echartsType,
    };
  });
  const legend = {
    data: series.map((item: any) => item.name),
  };

  const echartOptions = {
    series,
    xAxis,
    legend,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    yAxis: {
      type: "value",
    },
  };

  return echartOptions;
};

export const useTableData = (res: any) => {
  return res.data.columns.map((item: any) => ({
    title: item,
    key: item,
    dataIndex: item,
  }));
};
