import { defineStore } from 'pinia'

export const useResourcesStore = defineStore({
  id: 'resources',
  state: () => ({
    counter: 0,
    podList: [],
    nodeList: [],
    pods: [],
    pod: {},
    nodes: [],
    namespaces: [],
    deploymentList: [],
    deployments: [],
    logs: '',
    selectedNamespace: 'default'
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment() {
      this.counter++
    }
  }
})
