<template>
    <n-space vertical :size="12">
        <!-- <n-data-table :bordered="false" :columns="columns" :data="data" :pagination="pagination" /> -->
        <n-data-table :bordered="false" :single-line="false" :columns="columns" :data="data" :pagination="pagination" />
    </n-space>
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import { NTag, NButton, NSpace, NDataTable } from 'naive-ui'
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
            title: 'Age',
            key: 'age'
        },
        {
            title: 'OSImage',
            key: 'osImage'
        },
        {
            title: 'ContainerRuntimeVersion',
            key: 'containerRuntimeVersion'
        },
        {
            title: 'KubeletVersion',
            key: 'kubeletVersion'
        },
        {
            title: 'KernelVersion',
            key: 'kernelVersion'
        },
        {
            title: 'Tags',
            key: 'tags',
            render(row) {
                const tags = row.tags.map((tagKey) => {
                    console.log("tagKey", tagKey);
                    var type;
                    switch (tagKey) {
                        case "Running":
                            type = "success"
                            break;
                        case "Stopped":
                            type = "error"
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
                            default: () => tagKey
                        }
                    )
                })
                return tags
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
                    { default: () => 'Send Email' }
                )
            }
        }
    ]
}

const createData = () => [
    {
        key: 0,
        name: 'nginx-85b98978db-kchcz',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer']
    },
    {
        key: 1,
        name: 'coredns-64897985d-6ql2k',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['wow']
    },
    {
        key: 2,
        name: 'etcd-minikube',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher']
    }
]

export default defineComponent({
    components: {
        NSpace,
        NDataTable
    },
    setup() {
        const counter = useCounterStore()
        getNodes()
        const { nodes } = storeToRefs(counter)

        return {
            data: nodes,
            columns: createColumns({
                sendMail(rowData) {
                    console.log("sendMail");

                }
            }),
            pagination: {
                pageSize: 10
            }
        }
    }
})
</script>