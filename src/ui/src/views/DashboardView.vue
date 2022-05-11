<template>
  <n-layout>
    <n-layout>
      <n-layout-header>
        <n-grid x-gap="12" :cols="4">
          <n-gi>
            <n-card>
              <n-statistic label="Nodes">
                5
              </n-statistic>
            </n-card>
          </n-gi>
          <n-gi>
            <n-card>
              <n-statistic label="Disk">
                230GB
              </n-statistic>
            </n-card>
          </n-gi>
          <n-gi>
            <n-card>
              <n-statistic label="Memory">
                40GB
              </n-statistic>
            </n-card>
          </n-gi>
          <n-gi>
            <n-card>
              <n-statistic label="CPU">
                24
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
  }
})
</script>
<!-- 
<style>
.n-card {
  max-width: 300px;
}
</style> -->