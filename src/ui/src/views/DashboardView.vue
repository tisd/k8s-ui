<template>
  <n-layout has-sider>
    <n-layout-sider bordered content-style="padding: 24px;">
      Handian Bridge
    </n-layout-sider>
    <n-layout>
      <n-layout-header bordered>
        Yiheyuan Road
      </n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        Pingshan Road
      </n-layout-content>
      <n-layout-footer bordered>
        Chengfu Road
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<script>
import { defineComponent } from 'vue'
import { NLayout, NLayoutSider, NLayoutHeader, NLayoutFooter, NLayoutContent } from 'naive-ui'

export default defineComponent({
  components: {
    NLayout,
    NLayoutSider,
    NLayoutHeader,
    NLayoutFooter,
    NLayoutContent
  }
})
</script>