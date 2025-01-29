import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme-without-fonts';

export default {
  extends: DefaultTheme,
  Layout: DefaultTheme.Layout,
} satisfies Theme