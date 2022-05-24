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
      <n-data-table :bordered="false" :single-line="false" :columns="columns" :data="namespaceList" :pagination="pagination" />
    </n-card>
  </n-space>
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import { NTag, NButton, NSpace, NDataTable, NCard, NIcon } from 'naive-ui'
import { useResourcesStore } from '@/stores/resources'
import { getNamespaces } from "../services/MainService"
import { storeToRefs } from "pinia"
import { Refresh as RefreshIcon } from '@vicons/ionicons5'
import moment from 'moment'

const createColumns = ({ handleView }) => {
  return [
    {
      title: 'Name',
      key: 'metadata.name'
    },
    {
      title: 'Labels',
      key: 'labels',
      render(row: any) {
        const labels = Object.keys(row.metadata.labels).map((labelKey: string) => {
          return h(
            NTag,
            {
              style: {
                marginRight: '6px'
              },
              type: 'info'
            },
            {
              default: () => labelKey + '=' + row.metadata.labels[labelKey]
            }
          )
        })
        return labels
      }
    },
    {
      title: 'Age',
      key: 'age',
      render(row: any) {
        return h(
          'span',
          {
            innerHTML: moment(row.metadata.creationTimestamp).fromNow()
          }
        )
      }
    },
    {
      title: 'Created',
      key: 'created',
      render(row: any) {
        return h(
          'span',
          {
            innerHTML: moment(row.metadata.creationTimestamp).format('MMMM Do, YYYY - HH:mm:ss')
          }
        )
      }
    },
    {
      title: 'Status',
      key: 'status.phase'
    },
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
    getNamespaces()
    const { namespaceList } = storeToRefs(resources)

    return {
      namespaceList,
      columns: createColumns({
        handleView(rowData: any) {
          console.log("handleView", rowData);

        }
      }),
      pagination: {
        pageSize: 10
      },
      handleRefresh() {
        getNamespaces()
      }
    }
  }
})
</script>