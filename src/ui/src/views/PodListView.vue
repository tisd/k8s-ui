<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Menu from '@/components/Menu.vue'
import PodsList from '@/components/PodsList.vue'
import { NLayout, NLayoutSider, NLayoutHeader, NLayoutFooter, NLayoutContent, NConfigProvider, NGlobalStyle } from 'naive-ui'
</script>

<template>
  <div>
    <n-layout has-sider full-screen>
      <n-layout-sider bordered content-style="padding: 24px; height: 100vh;">
        <Menu />
      </n-layout-sider>
      <n-layout content-style="padding: 24px; display: flex; flex-direction: column;">
        <n-layout-content content-style="padding: 24px;">
          <PodsList />
        </n-layout-content>
        <n-layout-footer bordered>
          k8s-ui
        </n-layout-footer>
      </n-layout>
    </n-layout>
  </div>
</template>