import { useResourcesStore } from '@/stores/resources'
import moment from 'moment';

const baseUrl = 'http://localhost:7000'

export function getPods(namespace: string) {
  const resources = useResourcesStore()
  fetch(baseUrl + "/v1/pod").then(response => response.json()).then(response => {

    if (!response.error) {
      resources.$patch({
        podList: response.data,
        pods: response.data.filter(pod => namespace === 'all' || pod.metadata.namespace === namespace).map(item => {
          return {
            name: item.metadata.name,
            ready: item.status.containerStatuses?.filter(container => container.ready).length + "/" + item.status.containerStatuses?.length,
            age: moment(item.metadata.creationTimestamp).fromNow(),
            namespace: item.metadata.namespace,
            status: item.status.phase,
            ip: item.status.podIP,
            hostIP: item.status.hostIP,
            node: item.spec.nodeName,
            // TODO: add duration since last restart
            restarts: item.status.containerStatuses[0].restartCount,
          }
        })
      })
    }
  })
}

export function getPod(namespace: string, name: string) {
  const resources = useResourcesStore()
  fetch(baseUrl + "/v1/pod/" + namespace + "/" + name).then(response => response.json()).then(response => {
    if (!response.error) {
      resources.$patch({
        pod: response.data
      })
    }
  })
}

export function deletePod(namespace: string, name: string) {
  fetch(baseUrl + "/v1/pod/" + namespace + "/" + name, {
    method: 'DELETE'
  }).then(response => response.json()).then(response => {
    if (!response.error) {
      getPods(namespace)
    }
  })
}

export function getPodEvents(namespace: string, name: string) {
  const resources = useResourcesStore()
  fetch(baseUrl + "/v1/pod/" + namespace + "/" + name + "/events").then(response => response.json()).then(response => {
    if (!response.error) {
      resources.$patch({
        podEvents: response.data.filter(event => event.involvedObject.name === name)
      })
    }
  })
}

export function getDeployments(namespace: string) {
  const resources = useResourcesStore()
  fetch(baseUrl + "/v1/deployment").then(response => response.json()).then(response => {

    if (!response.error) {
      resources.$patch({
        deploymentList: response.data,
        deployments: response.data.filter(deployment => namespace === 'all' || deployment.metadata.namespace === namespace).map(item => {
          return {
            name: item.metadata.name,
            ready: item.status.readyReplicas + "/" + item.status.replicas,
            age: moment(item.metadata.creationTimestamp).fromNow(),
            namespace: item.metadata.namespace,
            images: item.spec.template.spec.containers.map(container => container.image).join(", "),
            labels: Object.keys(item.metadata.labels).map(key => key + "=" + item.metadata.labels[key]).join(", "),
            status: item.status.availableReplicas + "/" + item.status.replicas,
            creationTime: item.metadata.creationTimestamp,
            pods: item.status.readyReplicas + "/" + item.status.replicas,
            replicas: item.status.replicas,
            upToDateReplicas: item.status.updatedReplicas,
            availableReplicas: item.status.availableReplicas,
            unavailableReplicas: item.status.unavailableReplicas
          }
        })
      })
    }
  })
}

export function getDeployment(namespace: string, name: string) {
  const resources = useResourcesStore()
  fetch(baseUrl + "/v1/deployment/" + namespace + "/" + name).then(response => response.json()).then(response => {
    if (!response.error) {
      console.log(response.data);
      resources.$patch({
        deployment: response.data
      })
    }
  })
}

export function getServices() {
  const resources = useResourcesStore()
  fetch(baseUrl + "/v1/service").then(response => response.json()).then(response => {
    if (!response.error) {
      resources.$patch({
        serviceList: response.data
      })
    }
  })
}

export function getNodes() {
  const resources = useResourcesStore()
  fetch(baseUrl + "/v1/node").then(response => response.json()).then(response => {

    if (!response.error) {
      resources.$patch({
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
  const resources = useResourcesStore()
  fetch(baseUrl + "/v1/namespace").then(response => response.json()).then(response => {

    if (!response.error) {
      resources.$patch({
        namespaceList: response.data,
        namespaces: response.data.map(item => {
          return {
            label: item.metadata.name,
            value: item.metadata.name,
          }
        }).concat({
          label: "All",
          value: "all",
        })
      })
    }
  })
}

export function getPodLogs(podName: string, namespace: string) {
  const resources = useResourcesStore()
  fetch(baseUrl + "/v1/pod/" + namespace + "/" + podName + "/logs").then(response => response.json()).then(response => {

    if (!response.error) {
      resources.$patch({
        logs: response.data
      })
    }
  })
}
