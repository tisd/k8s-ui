<template>
  <div class="resource-view">
    <n-card :title="deployment.metadata.name" v-if="deployment && deployment.metadata">
      <n-space>
        <n-statistic label="Name" :value="deployment.metadata.name" />
        <n-statistic label="Namespace" :value="deployment.metadata.namespace" />
        <n-statistic label="Created"
          :value="moment(deployment.metadata.creationTimestamp).format('MMMM Do, YYYY - HH:mm:ss')" />
        <n-statistic label="Age" :value="moment(deployment.metadata.creationTimestamp).fromNow()" />
        <n-statistic label="UID" :value="deployment.metadata.uid" />
        <n-space>
          <n-statistic label="Replicas">
            {{ deployment.status.replicas }}
            (updated: {{ deployment.status.updatedReplicas }},
            ready: {{ deployment.status.readyReplicas }},
            available: {{ deployment.status.availableReplicas }})
          </n-statistic>
          <n-statistic label="Strategy" :value="deployment.spec.strategy.type" />
        </n-space>
      </n-space>
      <br>
      <n-space>
        <n-statistic label="Labels">
          <span v-for="label in Object.keys(deployment.metadata.labels)">
            <n-tag style="margin-right: 5px;">{{ label }} = {{ deployment.metadata.labels[label] }}</n-tag>
          </span>
        </n-statistic>
        <n-statistic label="Annotations">
          <span v-for="annotation in Object.keys(deployment.metadata.annotations)">
            <n-tag style="margin-right: 5px;">{{ annotation }} = {{ deployment.metadata.annotations[annotation] }}
            </n-tag>
          </span>
        </n-statistic>
        <n-statistic label="Selector">
          <span v-for="selectorLabel in Object.keys(deployment.spec.selector.matchLabels)">
            <n-tag style="margin-right: 5px;">{{ selectorLabel }} = {{ deployment.spec.selector.matchLabels[selectorLabel] }}
            </n-tag>
          </span>
        </n-statistic>
        <n-statistic label="Conditions">
          <span v-for="condition in deployment.status.conditions">
            <n-tag style="margin-right: 5px;" type="info">{{ condition.type }}
            </n-tag>
          </span>
        </n-statistic>
      </n-space>
    </n-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { storeToRefs } from "pinia"
import { NSpace, NCard, NStatistic, NTag, NTable, NTimeline, NTimelineItem } from 'naive-ui'
import { useResourcesStore } from '@/stores/resources'
import { useRoute } from 'vue-router'
import { getDeployment } from '../services/MainService'
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
  },
  methods: {
    moment
  },
  setup() {
    const route = useRoute()
    const resources = useResourcesStore()
    const { deployment } = storeToRefs(resources)
    getDeployment(route.params.namespace, route.params.deploymentName)

    return {
      deployment,
    }
  }
})
</script>

<style>
.resource-view .n-statistic-value__content {
  font-size: 15px !important;
}
</style>>
