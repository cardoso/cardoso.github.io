import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme-without-fonts';
import Layout from './Layout.vue';

export default {
  extends: DefaultTheme,
  Layout,
} satisfies Theme