import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Matheus Cardoso",
  description: "Developer",
  head: [["link", { rel: "icon", href: "/favicon.png" }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      // { text: 'Blog', link: '/blog' }
      {
        text: "Packages",
        items: [
          {
            text: "Vite Plugin LWC",
            link: "https://www.npmjs.com/package/vite-plugin-lwc",
          },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/cardoso" }],
  },
});
