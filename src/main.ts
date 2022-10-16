// import "@/permission";
import "@/styles/index.less";
import "normalize.css/normalize.css";

import dayjs from "dayjs";
import ElementPlus, { ElLoading, ElMessage, ElMessageBox, ElNotification } from "element-plus";
import { createApp } from "vue";
import { Store } from "vuex";

import TableColumn from "@/components/TableColumn/index.vue";

import App from "./App.vue";
import SvgIcon from "./components/SvgIcon/index.vue";
import router from "./router";
import store, { IState } from "./store";

declare module "@vue/runtime-core" {
	interface ComponentCustomProperties {
		$loading: typeof ElLoading;
		$message: typeof ElMessage;
		$msgbox: typeof ElMessageBox;
		$alert: typeof ElMessageBox.alert;
		$confirm: typeof ElMessageBox.confirm;
		$prompt: typeof ElMessageBox.prompt;
		$notify: typeof ElNotification;

		$refs: Record<string, any>;
		$store: Store<IState>;
		$dayjs: dayjs.Dayjs;
	}
}

declare module "vue-router" {
	interface RouteMeta {
		title?: string;
		icon?: string;
		hidden?: boolean;
		alwaysShow?: boolean;
	}
}

const app = createApp(App);
app.config.globalProperties.$dayjs = dayjs;
app.component("SvgIcon", SvgIcon);
app.use(ElementPlus);
// 自定义 el-table-column
delete app._context.components.ElTableColumn;
app.component("ElTableColumn", TableColumn);
app.use(router);
app.use(store);
app.mount("#app");
