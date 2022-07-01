<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Menu from '@/components/Menu.vue'
import { NLayout, NLayoutSider, NLayoutHeader, NPageHeader, NSpace, NButton, NLayoutFooter, NLayoutContent, NConfigProvider, NGlobalStyle, NDialogProvider } from 'naive-ui'
import { darkTheme } from 'naive-ui'
</script>

<template>
  <div>
    <n-config-provider :theme="darkTheme">
      <n-layout full-screen>
        <n-layout-header bordered>
          <n-page-header subtitle="" class="top-bar">
            <template #title>
              <a href="/" style="text-decoration: none; color: inherit; font-size: 20px;">
                k8s-ui
              </a>
            </template>
          </n-page-header>
        </n-layout-header>
        <n-global-style />
        <n-layout has-sider>
          <n-layout-sider bordered content-style="padding: 24px; height: 95vh;">
            <Menu />
          </n-layout-sider>
          <n-layout content-style="padding: 24px; display: flex; flex-direction: column;">
            <n-layout-content content-style="padding: 3px;">
              <n-dialog-provider>
                <RouterView />
              </n-dialog-provider>
            </n-layout-content>
            <n-layout-footer id="drawer-target" bordered>
            </n-layout-footer>
          </n-layout>
        </n-layout>
      </n-layout>
    </n-config-provider>
  </div>
</template>

<style>
.top-bar {
  height: 4vh;
  display: flex;
}

.n-page-header-wrapper {
  display: flex;
  padding-left: 10px;
}
</style>