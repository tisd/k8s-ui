<template>
  <n-space vertical :size="12">
    <n-card title="Pods">
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
    <n-drawer v-model:show="active" :width="200" :height="400" :placement="placement" :trap-focus="false"
      to="#drawer-target">
      <n-drawer-content title="Logs" closable>
        <n-log :log="logs" trim />
      </n-drawer-content>
    </n-drawer>
  </n-space>
</template>

<script lang="ts">
import { h, defineComponent, ref } from 'vue'
import { NTag, NAnchorLink, NButton, NIcon, NSpace, NDataTable, NCard, NSelect, NDrawer, NDrawerContent, NLog, type SelectOption, type DrawerPlacement } from 'naive-ui'
import { useResourcesStore } from '@/stores/resources'
import { getNamespaces, getPods, getPodLogs } from "../services/MainService"
import { storeToRefs } from "pinia"
import { Refresh as RefreshIcon } from '@vicons/ionicons5'

const createColumns = ({ viewLogs }) => {
  return [
    {
      title: 'Name',
      key: 'name',
      render(row: any) {
        return h(
          'a',
          {
            href: `/pods/${row.namespace}/${row.name}`,
            innerHTML: row.name
          }
        )
      }
    },
    {
      title: 'Namespace',
      key: 'namespace',
    },
    {
      title: 'Ready',
      key: 'ready',
    },
    {
      title: 'Age',
      key: 'age'
    },
    {
      title: 'Restarts',
      key: 'restarts'
    },
    {
      title: 'Status',
      key: 'status',
      render(row: any) {
        let type;
        switch (row.status) {
          case "Running":
            type = "success"
            break;
          case "Stopped":
            type = "error"
            break;
          case "Pending":
            type = "warning"
            break;
          default:
            break;
        }
        return h(
          NTag,
          {
            style: {
              marginRight: '6px'
            },
            type: type
          },
          {
            default: () => row.status
          }
        )
      }
    },
    {
      title: 'Action',
      key: 'actions',
      render(row: any) {
        return h(
          NButton,
          {
            size: 'small',
            onClick: () => viewLogs(row)
          },
          { default: () => 'View logs' }
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
    const { pods, namespaces, logs, selectedNamespace } = storeToRefs(resources)

    getPods(selectedNamespace.value)
    getNamespaces()

    const active = ref(false)
    const placement = ref<DrawerPlacement>('bottom')

    return {
      handleUpdateValue(value: string, option: SelectOption) {
        getPods(value)
      },
      selectedNamespace,
      namespaces: namespaces,
      data: pods,
      columns: createColumns({
        viewLogs(row: any) {
          active.value = true
          getPodLogs(row.name, 'default')
        }
      }),
      pagination: {
        pageSize: 15
      },
      active,
      placement,
      logs,
      handleRefresh() {
        getPods(selectedNamespace.value)
      }
    }
  }
})
</script>