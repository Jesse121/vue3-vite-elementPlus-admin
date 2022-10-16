import "nprogress/nprogress.css";

import NProgress from "nprogress";

import router from "./router";
import settings from "./settings";
import store from "./store";

// import { ElMessage } from "element-plus";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login"]; // no redirect whitelist

function getPageTitle(pageTitle: string) {
	if (pageTitle) {
		return `${pageTitle} - ${settings.title}`;
	}
	return `${settings.title}`;
}

(async () => {
	if (store.getters.token && !store.getters.router) {
		await store.dispatch("user/generateRoutes");
	}
})();

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
	NProgress.start();

	// set page title
	document.title = getPageTitle(to.meta.title ?? "");

	if (!store.getters.token) {
		/* has no token*/
		if (whiteList.includes(to.path)) {
			// in the free login whitelist, go directly
			next();
		} else {
			// other pages that do not have permission to access are redirected to the login page.
			next({
				path: "/login",
				query: { redirect: encodeURIComponent(to.fullPath) }
			});
			NProgress.done();
		}
	} else {
		/* has token*/
		// generate routes

		if (to.path === "/login") {
			next({ path: "/" });
			NProgress.done();
		} else {
			next();
		}
	}
});

// 全局后置守卫
router.afterEach(() => {
	NProgress.done();
});
