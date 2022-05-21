<template>
  <n-space vertical :size="12">
    <n-card title="Nodes">
      <template #header-extra>
        <n-button @click="handleRefresh">
          <n-icon>
            <refresh-icon />
          </n-icon>
        </n-button>
      </template>
      <n-data-table :bordered="false" :single-line="false" :columns="columns" :data="data" :pagination="pagination" />
    </n-card>
  </n-space>
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import { NTag, NButton, NSpace, NDataTable, NCard, NIcon } from 'naive-ui'
import { useResourcesStore } from '@/stores/resources'
import { getNodes } from "../services/MainService"
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
            href: `/nodes/${row.name}`,
            innerHTML: row.name
          }
        )
      }
    },
    {
      title: 'Status',
      key: 'status',
      render(row: any) {
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
      render(row: any) {
        const roles = row.roles.map((roleKey: any) => {
          return h(
            NTag,
            {
              style: {
                marginRight: '6px'
              },
              type: 'info'
            },
            {
              default: () => roleKey
            }
          )
        })
        return roles
      }
    },
    {
      title: 'Age',
      key: 'age'
    },
    {
      title: 'Version',
      key: 'version'
    }
  ]
}

export default defineComponent({
  components: {
    NSpace,
    NDataTable,
    NCard,
    RefreshIcon,
    NIcon,
    NButton
  },
  setup() {
    const resources = useResourcesStore()
    getNodes()
    const { nodes } = storeToRefs(resources)

    return {
      data: nodes,
      columns: createColumns({
        handleView(rowData: any) {
          console.log("handleView", rowData);

        }
      }),
      pagination: {
        pageSize: 10
      },
      handleRefresh() {
        getNodes()
      }
    }
  }
})
</script>