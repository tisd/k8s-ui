<template>
  <n-layout has-sider scrollable>
    <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="240" :collapsed="collapsed"
      show-trigger @collapse="collapsed = true" @expand="collapsed = false">
      <n-menu ref="menuInstRef" v-model:value="selectedKey" :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions"
        key-field="key" label-field="label" children-field="whateverChildren" />
    </n-layout-sider>
    <n-layout />
  </n-layout>
</template>

<script lang="ts">
import { defineComponent, h, ref, Component } from 'vue'
import { NIcon, NMenu, NLayout, NLayoutSider } from 'naive-ui'
import type { MenuOption, MenuInst } from 'naive-ui'
import { RouterLink } from 'vue-router'
import {
  Cube,
  CubeOutline,
  Server,
  LogoTux,
  TerminalOutline,
  Home,
  Settings,
  GitNetwork,
  Cloud
} from '@vicons/ionicons5'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'dashboard'
          }
        },
        { default: () => 'Dashboard' }
      ),
    key: 'dashboard',
    icon: renderIcon(Home),
  },
  {
    label: 'Workloads',
    key: 'workloads',
    icon: renderIcon(Cube),
    whateverChildren: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'pods'
              }
            },
            { default: () => 'Pods' }
          ),
        key: 'pods',
        icon: renderIcon(CubeOutline)
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'deployments'
              }
            },
            { default: () => 'Deployments' }
          ),
        key: 'deployments',
        icon: renderIcon(CubeOutline)
      },
      {
        label: 'StatefulSets',
        key: 'statefulsets',
        icon: renderIcon(CubeOutline)
      },
      {
        label: 'DaemonSets',
        key: 'daemonsets',
        icon: renderIcon(CubeOutline)
      }
    ]
  },
  {
    label: 'Networking',
    key: 'networking',
    icon: renderIcon(GitNetwork),
    whateverChildren: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'services'
              }
            },
            { default: () => 'Services' }
          ),
        key: 'services',
        icon: renderIcon(CubeOutline)
      },
      {
        label: 'Ingresses',
        key: 'ingresses',
        icon: renderIcon(CubeOutline)
      }
    ]
  },
  {
    label: 'Storage',
    key: 'storage',
    icon: renderIcon(Server),
    whateverChildren: [
      {
        label: 'Config Maps',
        key: 'configmaps',
        icon: renderIcon(CubeOutline)
      },
      {
        label: 'Persistant Volume Claims',
        key: 'persistantvolumeclaims',
        icon: renderIcon(CubeOutline)
      },
      {
        label: 'Persistant Volumes',
        key: 'persistantvolumes',
        icon: renderIcon(CubeOutline)
      },
      {
        label: 'Secrets',
        key: 'secrets',
        icon: renderIcon(CubeOutline)
      },
      {
        label: 'Storage Classes',
        key: 'storageclasses',
        icon: renderIcon(CubeOutline)
      },
    ]
  },
  {
    label: 'Cluster',
    key: 'cluster',
    icon: renderIcon(Cloud),
    whateverChildren: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'nodes'
              }
            },
            { default: () => 'Nodes' }
          ),
        key: 'nodes',
        icon: renderIcon(LogoTux),
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'namespaces'
              }
            },
            { default: () => 'Namespaces' }
          ),
        key: 'namespaces',
        icon: renderIcon(Settings),
      },
      {
        label: 'Roles',
        key: 'roles',
        icon: renderIcon(Settings)
      },
      {
        label: 'Role Bindings',
        key: 'rolebindings',
        icon: renderIcon(Settings)
      },
      {
        label: 'Service Accounts',
        key: 'serviceaccounts',
        icon: renderIcon(Settings)
      },
      {
        label: 'Terminal',
        key: 'terminal',
        icon: renderIcon(TerminalOutline)
      }
    ]
  },
  {
    label: 'Settings',
    key: 'settings',
    icon: renderIcon(Settings)
  }
]

export default defineComponent({
  components: {
    NMenu,
    NLayout,
    NLayoutSider
  },
  setup() {
    const menuInstRef = ref<MenuInst | null>(null)
    
    const selectedKeyRef = ref(window.location.pathname.split('/')[1] || 'dashboard')
    return {
      menuInstRef,
      selectedKey: selectedKeyRef,
      collapsed: ref(false),
      menuOptions
    }
  }
})
</script>