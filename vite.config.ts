import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import { defineConfig } from "vite";

import { svgBuilder } from "./src/utils/svgBuilder";

const resolve = (dir: string) => path.join(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), vueJsx(), [svgBuilder("./src/assets/icons/")]],
	resolve: {
		alias: {
			"@": resolve("src")
		}
	},
	server: {
		proxy: {
			"/api": {
				target: "", // 开发
				changeOrigin: true
			}
		}
	},
	build: {
		target: "es2015",
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (/\/src\/(components|layout)/.test(id)) return "components";
					if (id.includes("element-plus")) return "element-plus";
					if (id.includes("node_modules")) return "vendor";
				}
			}
		}
	}
});
