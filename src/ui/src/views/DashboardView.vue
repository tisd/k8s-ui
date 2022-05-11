<template>
  <n-layout>
    <n-layout>
      <n-layout-header>
        <n-grid x-gap="12" :cols="4">
          <n-gi>
            <n-card>
              <n-statistic label="Pods">
                {{ podList.length + "/" + nodeList.reduce((acc, node) => acc + parseInt(node.status.capacity.pods), 0) }}
              </n-statistic>
            </n-card>
          </n-gi>
          <n-gi>
            <n-card>
              <n-statistic label="Disk">
                {{ Math.round(nodeList.reduce((acc, node) => acc + parseInt(node.status.capacity['ephemeral-storage']), 0) / 1024 /
                    1024) + "GiB"
                }}
              </n-statistic>
            </n-card>
          </n-gi>
          <n-gi>
            <n-card>
              <n-statistic label="Memory">
                {{ Math.round(nodeList.reduce((acc, node) => acc + parseInt(node.status.capacity.memory), 0) / 1024 /
                    1024) + "GiB"
                }}
              </n-statistic>
            </n-card>
          </n-gi>
          <n-gi>
            <n-card>
              <n-statistic label="CPU">
                {{ nodeList.reduce((acc, node) => acc + parseInt(node.status.capacity.cpu), 0) }}
              </n-statistic>
            </n-card>
          </n-gi>
        </n-grid>
      </n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        <n-grid x-gap="12" :cols="2">
          <n-gi>
            <CpuUsageGraph />
          </n-gi>
          <n-gi>
            <MemoryUsageGraph />
          </n-gi>
        </n-grid>
        <br>
        <n-grid x-gap="12" :cols="2">
          <n-gi>
            <CpuUsageGraph />
          </n-gi>
          <n-gi>
            <CpuUsageGraph />
          </n-gi>
        </n-grid>
      </n-layout-content>
      <n-layout-footer bordered>
        Chengfu Road
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NLayout, NLayoutSider, NLayoutHeader, NLayoutFooter, NLayoutContent, NCard, NGrid, NGi, NStatistic } from 'naive-ui'
import CpuUsageGraph from '@/components/CpuUsageGraph.vue'
import MemoryUsageGraph from '@/components/MemoryUsageGraph.vue'
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from "pinia"
import { getPods, getNodes } from "../services/MainService"

export default defineComponent({
  components: {
    NLayout,
    NLayoutSider,
    NLayoutHeader,
    NLayoutFooter,
    NLayoutContent,
    NCard,
    NGrid,
    NGi,
    NStatistic,
    CpuUsageGraph,
    MemoryUsageGraph,
  },
  setup() {
    const counter = useCounterStore()
    const { podList, nodeList } = storeToRefs(counter)
    getPods('all')
    getNodes()
    return {
      podList,
      nodeList,
    }
  }
})
</script>
<!-- 
<style>
.n-card {
  max-width: 300px;
}
</style> -->