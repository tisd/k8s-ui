<template>
  <div class="resource-view">
    <n-card title="Metadata" v-if="pod && pod.metadata">
      <n-space>
        <n-statistic label="Name" :value="pod.metadata.name" />
        <n-statistic label="Namespace" :value="pod.metadata.namespace" />
        <n-statistic label="Created"
          :value="moment(pod.metadata.creationTimestamp).format('MMMM Do, YYYY - HH:mm:ss')" />
        <n-statistic label="Age" :value="moment(pod.metadata.creationTimestamp).fromNow()" />
        <n-statistic label="UID" :value="pod.metadata.uid" />
      </n-space>
      <n-space>
        <n-statistic label="Labels">
          <span v-for="label in Object.keys(pod.metadata.labels)">
            <n-tag style="margin-right: 5px;">{{ label }} : {{ pod.metadata.labels[label] }}</n-tag>
          </span>
        </n-statistic>
      </n-space>
    </n-card>
    <br>
    <n-card title="Resource information" v-if="pod && pod.metadata">
      <n-space>
        <n-statistic label="Node" :value="pod.spec.nodeName" />
        <n-statistic label="Status" :value="pod.status.phase" />
        <n-statistic label="IP" :value="pod.status.podIP" />
        <n-statistic label="QoS Class" :value="pod.status.qosClass" />
        <n-statistic label="Restarts" :value="pod.status.containerStatuses[0].restartCount" />
        <n-statistic label="Service Account" :value="pod.spec.serviceAccount" />
      </n-space>
    </n-card>
    <br>
    <n-card title="Conditions" v-if="pod && pod.metadata">
      <n-table :single-line="false">
        <thead>
          <tr>
            <th>Type</th>
            <th>Status</th>
            <th>Last probe time</th>
            <th>Last transition time</th>
            <th>Reason</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="condition in pod.status.conditions">
            <td>{{ condition.type }}</td>
            <td>{{ condition.status }}</td>
            <td>{{ condition.lastProbeTime ? moment(condition.lastProbeTime).fromNow() : '-' }}</td>
            <td>{{ moment(condition.lastTransitionTime).fromNow() }}</td>
            <td>{{ condition.reason ? condition.reason : '-' }}</td>
            <td>{{ condition.message ? condition.message : '-' }}</td>
          </tr>
        </tbody>
      </n-table>
    </n-card>
    <br>
    <n-card title="Controlled by" v-if="pod && pod.metadata">

    </n-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { storeToRefs } from "pinia"
import { NSpace, NCard, NStatistic, NTag, NTable } from 'naive-ui'
import { useResourcesStore } from '@/stores/resources'
import { useRoute } from 'vue-router'
import { getPod } from '../services/MainService'
import moment from 'moment'

export default defineComponent({
  components: {
    NCard,
    NSpace,
    NStatistic,
    NTag,
    NTable,
  },
  methods: {
    moment
  },
  setup() {
    const route = useRoute()
    const resources = useResourcesStore()
    const { pod } = storeToRefs(resources)
    getPod(route.params.namespace, route.params.podName)

    return {
      pod
    }
  }
})
</script>

<style>
.resource-view .n-statistic-value__content {
  font-size: 15px !important;
}
</style>>
