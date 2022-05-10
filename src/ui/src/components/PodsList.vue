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
import { getPods } from "../services/MainService"
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
            title: 'Address',
            key: 'address'
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

export default defineComponent({
    components: {
        NSpace,
        NDataTable
    },
    setup() {
        const counter = useCounterStore()
        getPods()
        const { pods } = storeToRefs(counter)
        console.log("pods", pods.value);

        

        return {
            data: pods,
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