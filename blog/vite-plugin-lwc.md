---
title: Vite Plugin LWC
date: 2024-01-29
---

# Vite Plugin LWC

## Installation

```bash
npm install vite-plugin-lwc --save-dev
```

## Usage

```ts:line-numbers {3,8}
// vite.config.js
import { defineConfig } from "vite";
import lwc from "vite-plugin-lwc";

// https://vitejs.dev/config
export default defineConfig({
  plugins: [
	lwc(),
  ],
});
```
