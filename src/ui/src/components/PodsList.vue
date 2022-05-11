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
  </n-space>
</template>

<script lang="ts">
import { h, defineComponent, ref } from 'vue'
import { NTag, NButton, NSpace, NDataTable, NCard, NSelect, type SelectOption } from 'naive-ui'
import { useCounterStore } from '@/stores/counter'
import { getNamespaces, getPods } from "../services/MainService"
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
    NSelect
  },
  setup() {
    const counter = useCounterStore()
    getPods('default')
    getNamespaces()
    const { pods, namespaces } = storeToRefs(counter)

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

        }
      }),
      pagination: {
        pageSize: 10
      }
    }
  }
})
</script>