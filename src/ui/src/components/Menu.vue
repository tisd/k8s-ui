<template>
  <n-layout has-sider scrollable>
    <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="240" :collapsed="collapsed"
      show-trigger @collapse="collapsed = true" @expand="collapsed = false">
      <n-menu ref="menuInstRef" v-model:value="selectedKey" :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions"
        key-field="whateverKey" label-field="whateverLabel" children-field="whateverChildren" />
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
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
  Cube,
  CubeOutline,
  Server,
  LogoTux,
  TerminalOutline,
  Home,
  Settings,
  GitNetwork,
  Cloud,
  LaptopOutline
} from '@vicons/ionicons5'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    whateverLabel: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'dashboard'
          }
        },
        { default: () => 'Dashboard' }
      ),
    whateverKey: 'dashboard',
    icon: renderIcon(Home),
  },
  {
    whateverLabel: 'Workloads',
    whateverKey: 'workloads',
    icon: renderIcon(Cube),
    whateverChildren: [
      {
        whateverLabel: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'pods'
              }
            },
            { default: () => 'Pods' }
          ),
        whateverKey: 'pods',
        icon: renderIcon(CubeOutline)
      },
      {
        whateverLabel: 'Deployments',
        whateverKey: 'deployments',
        icon: renderIcon(CubeOutline)
      },
      {
        whateverLabel: 'StatefulSets',
        whateverKey: 'statefulsets',
        icon: renderIcon(CubeOutline)
      },
      {
        whateverLabel: 'DaemonSets',
        whateverKey: 'daemonsets',
        icon: renderIcon(CubeOutline)
      }
    ]
  },
  {
    whateverLabel: 'Networking',
    whateverKey: 'networking',
    icon: renderIcon(GitNetwork),
    whateverChildren: [
      {
        whateverLabel: 'Services',
        whateverKey: 'services',
        icon: renderIcon(CubeOutline)
      },
      {
        whateverLabel: 'Ingresses',
        whateverKey: 'ingresses',
        icon: renderIcon(CubeOutline)
      }
    ]
  },
  {
    whateverLabel: 'Storage',
    whateverKey: 'storage',
    icon: renderIcon(Server),
    whateverChildren: [
      {
        whateverLabel: 'Config Maps',
        whateverKey: 'configmaps',
        icon: renderIcon(CubeOutline)
      },
      {
        whateverLabel: 'Persistant Volume Claims',
        whateverKey: 'persistantvolumeclaims',
        icon: renderIcon(CubeOutline)
      },
      {
        whateverLabel: 'Persistant Volumes',
        whateverKey: 'persistantvolumes',
        icon: renderIcon(CubeOutline)
      },
      {
        whateverLabel: 'Secrets',
        whateverKey: 'secrets',
        icon: renderIcon(CubeOutline)
      },
      {
        whateverLabel: 'Storage Classes',
        whateverKey: 'storageclasses',
        icon: renderIcon(CubeOutline)
      },
    ]
  },
  {
    whateverLabel: 'Cluster',
    whateverKey: 'cluster',
    icon: renderIcon(Cloud),
    whateverChildren: [
      {
        whateverLabel: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'nodes'
              }
            },
            { default: () => 'Nodes' }
          ),
        whateverKey: 'nodes',
        icon: renderIcon(LogoTux),
      },
      {
        whateverLabel: 'Namespaces',
        whateverKey: 'namespaces',
        icon: renderIcon(Settings)
      },
      {
        whateverLabel: 'Roles',
        whateverKey: 'roles',
        icon: renderIcon(Settings)
      },
      {
        whateverLabel: 'Role Bindings',
        whateverKey: 'rolebindings',
        icon: renderIcon(Settings)
      },
      {
        whateverLabel: 'Service Accounts',
        whateverKey: 'serviceaccounts',
        icon: renderIcon(Settings)
      },
      {
        whateverLabel: 'Terminal',
        whateverKey: 'terminal',
        icon: renderIcon(TerminalOutline)
      }
    ]
  },
  {
    whateverLabel: 'Settings',
    whateverKey: 'settings',
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