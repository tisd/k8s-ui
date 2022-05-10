import { useCounterStore } from '@/stores/counter'

export function getPods() {
    const counter = useCounterStore()
    fetch("http://localhost:8080/v1/api/pod").then(response => response.json()).then(response => {
        console.log(response.data.map((v, i) => {
            return { key: i, name: v.Name, tag: [v.Phase] }
        }));
        if (!response.error) {
            counter.$patch({
                pods: response.data.map((v, i) => {
                    return { key: i, name: v.Name, tags: [v.Phase] }
                })
            })
        }
    })
}

export function getNodes() {
    const counter = useCounterStore()
    fetch("http://localhost:8080/v1/api/node").then(response => response.json()).then(response => {
        console.log(response.data.map((v, i) => {
            return { key: i, name: v.Name, tag: [v.Phase] }
        }));
        if (!response.error) {
            counter.$patch({
                nodes: response.data.map((v, i) => {
                    return { key: i, name: v.Name, osImage: v.OSImage, containerRuntimeVersion: v.ContainerRuntimeVersion, kubeletVersion: v.KubeletVersion, kernelVersion: v.KernelVersion, tags: [v.Phase] }
                })
            })
        }
    })
}