<template>
  <n-space vertical :size="12">
    <n-card title="Nodes">
      <n-data-table :bordered="false" :single-line="false" :columns="columns" :data="data" :pagination="pagination" />
    </n-card>
  </n-space>
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import { NTag, NButton, NSpace, NDataTable, NCard } from 'naive-ui'
import { useCounterStore } from '@/stores/counter'
import { getNodes } from "../services/MainService"
import { storeToRefs } from "pinia"

const createColumns = ({ sendMail }) => {
  return [
    {
      title: 'Name',
      key: 'name'
    },
    {
      title: 'Status',
      key: 'status',
      render(row) {
        let type;
        switch (row.status) {
          case "Ready":
            type = "success"
            break;
          case "Not Ready":
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
      title: 'Roles',
      key: 'roles',
      render(row) {
        const tags = row.roles.map((tagKey) => {
          return h(
            NTag,
            {
              style: {
                marginRight: '6px'
              },
              type: 'info'
            },
            {
              default: () => tagKey
            }
          )
        })
        return tags
      }
    },
    {
      title: 'Age',
      key: 'age'
    },
    {
      title: 'Version',
      key: 'version'
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
    NCard
  },
  setup() {
    const counter = useCounterStore()
    getNodes()
    const { nodes } = storeToRefs(counter)
    
    return {
      data: nodes,
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