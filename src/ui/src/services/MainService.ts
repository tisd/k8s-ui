import { useCounterStore } from '@/stores/counter'
import moment from 'moment';

export function getPods(namespace: string) {
  const counter = useCounterStore()
  fetch("http://localhost:7000/v1/pod").then(response => response.json()).then(response => {

    if (!response.error) {
      counter.$patch({
        podList: response.data,
        pods: response.data.filter(pod => pod.metadata.namespace === namespace).map(item => {
          return {
            name: item.metadata.name,
            ready: item.status.containerStatuses.filter(container => container.ready).length + "/" + item.status.containerStatuses.length,
            age: moment(item.metadata.creationTimestamp).fromNow(),
            namespace: item.metadata.namespace,
            status: item.status.phase,
            ip: item.status.podIP,
            hostIP: item.status.hostIP,
            node: item.spec.nodeName,
            // TODO: add duration since last restart
            restarts: item.status.containerStatuses.filter(container => container.restartCount > 0).length
          }
        })
      })
    }
  })
}

export function getNodes() {
  const counter = useCounterStore()
  fetch("http://localhost:7000/v1/node").then(response => response.json()).then(response => {

    if (!response.error) {
      console.log(response);

      counter.$patch({
        nodeList: response.data,
        nodes: response.data.map(item => {
          return {
            name: item.metadata.name,
            age: moment(item.metadata.creationTimestamp).fromNow(),
            status: item.status.conditions.some(condition => condition.type === "Ready" && condition.status === "True") ? "Ready" : "Not Ready",
            roles: Object.keys(item.metadata.labels).filter(key => key.startsWith("node-role.kubernetes.io")).map(key => {
              return key.split("/").pop()
            }),
            version: item.status.nodeInfo.kubeletVersion,
          }
        })
      })
    }

  })
}

export function getNamespaces() {
  const counter = useCounterStore()
  fetch("http://localhost:7000/v1/namespace").then(response => response.json()).then(response => {

    if (!response.error) {
      counter.$patch({
        namespaces: response.data.map(item => {
          return {
            label: item.metadata.name,
            value: item.metadata.name,
          }
        })
      })
    }
  })
}
