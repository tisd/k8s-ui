<template>
  <v-chart class="chart" :option="option" />
</template>

<script lang="ts">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, defineComponent } from "vue";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

export default defineComponent({
  name: "CpuUsageGraph",
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: "dark"
  },
  setup () {
    const option = ref({
      title: {
        text: "CPU Usage",
        left: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: ["node1", "node2", "node3", "node4", "node5"]
      },
      series: [
        {
          name: "CPU Usage",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: [
            { value: 335, name: "node1" },
            { value: 310, name: "node2" },
            { value: 234, name: "node3" },
            { value: 135, name: "node4" },
            { value: 1548, name: "node5" }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    });

    return { option };
  }
});
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>