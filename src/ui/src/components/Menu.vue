<template>
  <n-layout has-sider>
    <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="240" :collapsed="collapsed"
      show-trigger @collapse="collapsed = true" @expand="collapsed = false">
      <n-menu :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions"
        key-field="whateverKey" label-field="whateverLabel" children-field="whateverChildren" />
    </n-layout-sider>
    <n-layout />
  </n-layout>
</template>

<script lang="ts">
import { defineComponent, h, ref, Component } from 'vue'
import { NIcon, NMenu, NLayout, NLayoutSider } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router'
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
  Cube,
  CubeOutline,
  Server
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
            name: 'nodes'
          }
        },
        { default: () => 'Nodes' }
      ),
    whateverKey: 'nodes',
    icon: renderIcon(Server),
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
  }
]

export default defineComponent({
  components: {
    NMenu,
    NLayout,
    NLayoutSider
  },
  setup() {
    return {
      collapsed: ref(false),
      menuOptions
    }
  }
})
</script>