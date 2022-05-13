<template>
  <n-space vertical :size="12">
    <n-card title="Deployments">
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
        :columns="selectedNamespace === 'all' ? columns : columns.filter(c => c.key !== 'namespace')" :data="data"
        :pagination="pagination" />
    </n-card>
  </n-space>
</template>

<script lang="ts">
import { h, defineComponent, ref } from 'vue'
import { NTag, NButton, NIcon, NSpace, NDataTable, NCard, NSelect, NDrawer, NDrawerContent, NLog, type SelectOption } from 'naive-ui'
import { useResourcesStore } from '@/stores/resources'
import { getNamespaces, getDeployments } from "../services/MainService"
import { storeToRefs } from "pinia"
import { Refresh as RefreshIcon } from '@vicons/ionicons5'

const createColumns = ({ handleView }) => {
  return [
    {
      title: 'Name',
      key: 'name'
    },
    {
      title: 'Namespace',
      key: 'namespace',
    },
    {
      title: 'Ready',
      key: 'ready'
    },
    {
      title: 'Up to Date',
      key: 'upToDateReplicas'
    },
    {
      title: 'Available',
      key: 'availableReplicas'
    },
    {
      title: 'Age',
      key: 'age'
    },
    {
      title: 'Action',
      key: 'actions',
      render(row: any) {
        return h(
          NButton,
          {
            size: 'small',
            onClick: () => handleView(row)
          },
          { default: () => 'View' }
        )
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
    const { deployments, namespaces, selectedNamespace } = storeToRefs(resources)

    getDeployments(selectedNamespace.value)
    getNamespaces()

    return {
      handleUpdateValue(value: string, option: SelectOption) {
        getDeployments(value)
      },
      selectedNamespace,
      namespaces: namespaces,
      data: deployments,
      columns: createColumns({
        handleView(row: any) {
          console.info("handleView")
        }
      }),
      pagination: {
        pageSize: 15
      },
      handleRefresh() {
        getDeployments(selectedNamespace.value)
      }
    }
  }
})
</script>