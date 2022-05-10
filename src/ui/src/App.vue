<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Menu from '@/components/Menu.vue'
import { NLayout, NLayoutSider, NLayoutHeader, NLayoutFooter, NLayoutContent } from 'naive-ui'
</script>

<template>
  <div>
    <n-layout has-sider>
      <n-layout-sider bordered content-style="padding: 24px;">
        <Menu />
      </n-layout-sider>
      <n-layout>
        <n-layout-header bordered>
          Header
        </n-layout-header>
        <n-layout-content content-style="padding: 24px;">
          <RouterView />
        </n-layout-content>
        <n-layout-footer bordered>
          Footer
        </n-layout-footer>
      </n-layout>
    </n-layout>
  </div>
</template>