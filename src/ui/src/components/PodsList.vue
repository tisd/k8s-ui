<template>
  <n-space vertical :size="12">
    <n-card title="Pods">
      <template #header-extra>
        <n-select v-model:value="selectedNamespace" :options="namespaces" @update:value="handleUpdateValue"
          style="min-width: 250px;" />
      </template>
      <n-data-table ref="table" :bordered="false" :single-line="false" :columns="columns" :data="data"
        :pagination="pagination" />
    </n-card>
    <!-- <div id="drawer-target" style="
      position: relative;
      width: 100%;
      height: 300px;
      border: 1px solid rgba(128, 128, 128, 0.2);
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    ">
      Target Area
    </div> -->
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
import { NTag, NButton, NSpace, NDataTable, NCard, NSelect, NDrawer, NDrawerContent, NLog, type SelectOption, type DrawerPlacement } from 'naive-ui'
import { useCounterStore } from '@/stores/counter'
import { getNamespaces, getPods, getPodLogs } from "../services/MainService"
import { storeToRefs } from "pinia"
import moment from 'moment';

const createColumns = ({ sendMail }) => {
  return [
    {
      title: 'Name',
      key: 'name'
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
      render(row) {
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
      render(row) {
        return h(
          NButton,
          {
            size: 'small',
            onClick: () => sendMail(row)
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
    NLog
  },
  setup() {
    const counter = useCounterStore()
    getPods('default')
    getNamespaces()
    const { pods, namespaces, logs } = storeToRefs(counter)

    const active = ref(false)
    const placement = ref<DrawerPlacement>('bottom')

    return {
      handleUpdateValue(value: string, option: SelectOption) {
        getPods(value)
      },
      selectedNamespace: ref('default'),
      namespaces: namespaces,
      data: pods,
      columns: createColumns({
        sendMail(rowData) {
          console.log("sendMail", rowData);
          active.value = true
          getPodLogs(rowData.name, 'default')
        }
      }),
      pagination: {
        pageSize: 10
      },
      active,
      placement,
      logs
    }
  }
})
</script>