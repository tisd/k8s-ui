<template>
  <div class="resource-view">
    <n-card :title="pod.metadata.name" v-if="pod && pod.metadata">
      <template #header-extra>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button style="font-size: 24px; margin-left: 5px;">
              <n-icon>
                <reader />
              </n-icon>
            </n-button>
          </template>
          Pod logs
        </n-tooltip>

        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button style="font-size: 24px; margin-left: 5px;">
              <n-icon>
                <terminal />
              </n-icon>
            </n-button>
          </template>
          Pod shell
        </n-tooltip>

        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button style="font-size: 24px; margin-left: 5px;">
              <n-icon>
                <pencil />
              </n-icon>
            </n-button>
          </template>
          Edit
        </n-tooltip>

        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button style="font-size: 24px; margin-left: 5px;">
              <n-icon>
                <trash />
              </n-icon>
            </n-button>
          </template>
          Delete
        </n-tooltip>
      </template>
      <n-space>
        <n-statistic label="Name" :value="pod.metadata.name" />
        <n-statistic label="Namespace" :value="pod.metadata.namespace" />
        <n-statistic label="Created"
          :value="moment(pod.metadata.creationTimestamp).format('MMMM Do, YYYY - HH:mm:ss')" />
        <n-statistic label="Age" :value="moment(pod.metadata.creationTimestamp).fromNow()" />
        <n-statistic label="UID" :value="pod.metadata.uid" />
      </n-space>
      <br>
      <n-space>
        <n-statistic label="Node" :value="pod.spec.nodeName" />
        <n-statistic label="Status" :value="pod.status.phase" />
        <n-statistic label="IP" :value="pod.status.podIP" />
        <n-statistic label="QoS Class" :value="pod.status.qosClass" />
        <n-statistic label="Restarts" :value="pod.status.containerStatuses[0].restartCount" />
        <n-statistic label="Service Account" :value="pod.spec.serviceAccount" />
      </n-space>
      <n-space>
        <n-statistic label="Labels">
          <span v-for="label in Object.keys(pod.metadata.labels)">
            <n-tag style="margin-right: 5px;">{{ label }} = {{ pod.metadata.labels[label] }}</n-tag>
          </span>
        </n-statistic>
      </n-space>
      <h4>Conditions</h4>
      <n-space>
        <n-timeline horizontal>
          <n-timeline-item v-for="condition in pod.status.conditions" type="success"
            :time="moment(condition.lastTransitionTime).fromNow()" :content="condition.type" />
        </n-timeline>
      </n-space>
      <div>
        <h4>Controlled by</h4>
        <n-space>
          <n-statistic label="Name" :value="pod.metadata.ownerReferences[0].name" />
          <n-statistic label="Kind" :value="pod.metadata.ownerReferences[0].kind" />
        </n-space>
      </div>
    </n-card>
    <br>
    <n-card title="Events" v-if="podEvents && podEvents.length">
      <n-timeline>
        <n-timeline-item v-for="e in podEvents" type="success" :time="moment(e.firstTimestamp).fromNow()"
          :content="e.message" />
      </n-timeline>
    </n-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { storeToRefs } from "pinia"
import { NSpace, NCard, NStatistic, NTag, NTable, NTimeline, NTimelineItem, NButton, NIcon, NTooltip } from 'naive-ui'
import { Trash, Pencil, TerminalOutline as Terminal, ReaderOutline as Reader } from '@vicons/ionicons5'
import { useResourcesStore } from '@/stores/resources'
import { useRoute } from 'vue-router'
import { getPod, getPodEvents } from '../../services/MainService'
import moment from 'moment'

export default defineComponent({
  components: {
    NCard,
    NSpace,
    NStatistic,
    NTag,
    NTable,
    NTimeline,
    NTimelineItem,
    NButton,
    NIcon,
    Trash,
    Pencil,
    Terminal,
    Reader,
    NTooltip
  },
  methods: {
    moment
  },
  setup() {
    const route = useRoute()
    const resources = useResourcesStore()
    const { pod, podEvents } = storeToRefs(resources)
    getPod(route.params.namespace, route.params.podName)
    getPodEvents(route.params.namespace, route.params.podName)

    return {
      pod,
      podEvents,
    }
  }
})
</script>

<style>
.resource-view .n-statistic-value__content {
  font-size: 15px !important;
}
</style>>
