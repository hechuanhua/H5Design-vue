import dayjs from "dayjs";

export const useEchartsBarData = (res: any, echartsType: string) => {
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


export const useEchartsTableData = (res: any, echartsType: string) => {
  const series: any[] = [];
  const xAxis: any = {
    type: "category",
    data: [],
  };
  const legend: any = {
    data: [],
  };
  res.data.records.forEach((item: any) => {
    const x = dayjs(item[res.data.columns[0]]).format("YYYY-MM-DD");
    if (!xAxis.data.includes(x)) {
      xAxis.data.push(x);
    }
    let data = item[res.data.columns[2]]
    if(/^\d+\.\d{3}/.test(data)){
      data = data.toFixed(2)
    }
    if (legend.data.includes(item[res.data.columns[1]])) {
      const ret = series.find((v) => v.name === item[res.data.columns[1]]);
      ret.data.push(data);
    } else {
      legend.data.push(item[res.data.columns[1]]);
      series.push({
        name: item[res.data.columns[1]],
        type: echartsType,
        data: [data],
      });
    }
  });

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

export const useEchartsPieData = (res: any, echartsType: string) => {
  const series = [
    {
      radius: ["50%", "70%"],
      type: echartsType,
      data: res.data.map((item: any) => ({
        name: item.x,
        value: item.y,
      })),
    },
  ];
  const legend = {
    top: "top",
    left: "center",
    // type: "scroll",
  };
  const echartOptions = {
    series,
    legend,
    tooltip: {
      trigger: "item",
      formatter: "{b} : {c} ({d}%)",
    },
  };

  return echartOptions;
};
