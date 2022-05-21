<template>
  <n-space vertical :size="12">
    <n-card title="Services">
      <template #header-extra>
        <n-select v-model:value="selectedNamespace" :options="namespaces" @update:value="handleUpdateValue"
          style="min-width: 250px;" />
        <n-button @click="handleRefresh" style="margin-left: 5px;">
          <n-icon>
            <refresh-icon />
          </n-icon>
        </n-button>
      </template>
      <n-data-table ref="table" :bordered="false" :single-line="false"
        :columns="selectedNamespace === 'all' ? columns : columns.filter(c => c.key !== 'namespace')"
        :data="serviceList.filter(s => selectedNamespace === 'all' || s.metadata.namespace === selectedNamespace)"
        :pagination="pagination" />
    </n-card>
  </n-space>
</template>

<script lang="ts">
import { h, defineComponent, ref } from 'vue'
import { NTag, NButton, NIcon, NSpace, NDataTable, NCard, NSelect, NDrawer, NDrawerContent, NLog, type SelectOption } from 'naive-ui'
import { useResourcesStore } from '@/stores/resources'
import { getNamespaces, getServices } from "../services/MainService"
import { storeToRefs } from "pinia"
import { Refresh as RefreshIcon } from '@vicons/ionicons5'

const createColumns = ({ handleView }) => {
  return [
    {
      title: 'Name',
      key: 'name',
      render(row: any) {
        return h(
          'a',
          {
            href: `/services/${row.metadata.namespace}/${row.metadata.name}`,
            innerHTML: row.metadata.name
          }
        )
      }
    },
    {
      title: 'Namespace',
      key: 'metadata.namespace',
    },
    {
      title: 'Type',
      key: 'spec.type',
    },
    {
      title: 'Cluster IP',
      key: 'spec.clusterIP',
    },
    {
      title: 'Ports',
      key: 'ports',
      render(row: any) {
        return row.spec.ports.map(port => {
          return h(
            NTag,
            {
              style: {
                marginRight: '6px',
                marginBottom: '3px'
              },
              type: 'info'
            },
            {
              default: () => `${port.port}:${port.targetPort}/${port.protocol}`
            }
          )
        })
      }
    }
  ]
}

export default defineComponent({
  components: {
    NSpace,
    NDataTable,
    NCard,
    NSelect,
    NDrawer,
    NDrawerContent,
    NLog,
    NButton,
    NIcon,
    RefreshIcon
  },
  setup() {
    const resources = useResourcesStore()
    const { serviceList, namespaces, selectedNamespace } = storeToRefs(resources)

    getServices()
    getNamespaces()

    return {
      handleUpdateValue(value: string, option: SelectOption) {
        getServices()
      },
      selectedNamespace,
      namespaces,
      serviceList,
      columns: createColumns({
        handleView(row: any) {
          console.info("handleView")
        }
      }),
      pagination: {
        pageSize: 15
      },
      handleRefresh() {
        getServices()
      }
    }
  }
})
</script>