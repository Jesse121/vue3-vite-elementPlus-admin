import { RouteRecordRaw } from "vue-router";
import { ActionContext } from "vuex";

import { login, logout } from "@/api/_common";
import { getMenuNav } from "@/api/_menu";
import router, { asyncRoutes } from "@/router";
import { getName, getRoutes, getToken, removeState, removeToken, saveName, saveRoutes, saveToken } from "@/utils/auth";

import { IState } from "..";

export interface IUserState {
	token: string;
	name: string;
	routes: RouteRecordRaw[] | undefined;
	avatar: string;
	introduction: string;
	email: string;
}

const getDefaultState = () => {
	return {
		token: getToken(),
		name: getName(),
		routes: undefined,
		avatar: "",
		introduction: "",
		email: ""
	};
};

export function getConfigRoutes(routes: any[], configRouter: any[], isChildren?: boolean) {
	const accessRoutes: Array<RouteRecordRaw> = [];
	configRouter.forEach(m => {
		const route = routes.find(x => {
			if (isChildren) {
				return m.path === "/" + x.path;
			} else {
				return m.path === x.path;
			}
		});
		if (!route) return;
		if (route.children && route.children.length > 1) {
			accessRoutes.push({
				...route,
				meta: {
					...route.meta,
					title: m.desc
				},
				children: route.children
			});
		} else {
			accessRoutes.push({
				...route,
				meta: {
					...route.meta,
					title: m.desc
				}
			});
		}
	});
	return accessRoutes;
}

const state: IUserState = getDefaultState();

const mutations = {
	RESET_STATE: (state: IUserState) => {
		Object.assign(state, getDefaultState());
	},
	SET_TOKEN: (state: IUserState, token: string) => {
		state.token = token;
	},
	SET_NAME: (state: IUserState, name: string) => {
		state.name = name;
	},
	SET_AVATAR: (state: IUserState, avatar: string) => {
		state.avatar = avatar;
	},
	SET_ROUTES: (state: IUserState, routes: RouteRecordRaw[]) => {
		state.routes = routes;
	}
};

const actions = {
	// user login
	login({ commit }: ActionContext<IUserState, IState>, userInfo: { username: string; password: string }) {
		const username = userInfo.username.trim();
		const password = userInfo.password;
		return new Promise<void>((resolve, reject) => {
			login({
				username,
				password
			})
				.then((res: any) => {
					// console.log(res);
					const { token } = res;
					commit("SET_NAME", username);
					saveName(username);
					commit("SET_TOKEN", token);
					saveToken(token);
					resolve();
				})
				.catch(error => {
					reject(error);
				});
		});
	},

	generateRoutes({ commit }: ActionContext<IUserState, IState>) {
		return new Promise<void>((resolve, reject) => {
			if (state.routes) return resolve();

			const routes = getRoutes();
			if (routes) {
				// 读取缓存获取路由
				const accessRoutes = getConfigRoutes(asyncRoutes, routes, false);
				accessRoutes.forEach(element => router.addRoute(element));

				commit("SET_ROUTES", routes);
				resolve();
			} else {
				// 读取接口获取路由
				getMenuNav()
					.then((res: any) => {
						// console.log(res);
						const accessRoutes = getConfigRoutes(asyncRoutes, res.result, false);
						accessRoutes.forEach(element => router.addRoute(element));

						saveRoutes(res.result);
						commit("SET_ROUTES", res.result);
						resolve();
					})
					.catch(err => {
						reject(err);
					});
			}
		});
	},

	// get user info
	// getInfo({ commit, state }: any) {
	// 	return new Promise((resolve, reject) => {
	// 		// getInfo(state.token)
	// 		// 	.then(res => {
	// 		// 		const { data } = res;
	// 		// 		if (!data) {
	// 		// 			return reject("Verification failed, please Login again.");
	// 		// 		}
	// 		// 		const { name, avatar } = data;
	// 		// 		commit("SET_NAME", name);
	// 		// 		commit("SET_AVATAR", avatar);
	// 		// 		resolve(data);
	// 		// 	})
	// 		// 	.catch(error => {
	// 		// 		reject(error);
	// 		// 	});
	// 	});
	// },

	// user logout
	logout({ commit }: ActionContext<IUserState, IState>) {
		return new Promise<void>((resolve, reject) => {
			logout({ token: getToken() })
				.then(() => {
					removeToken(); // must remove  token  first
					removeState();
					// 退出后默认进首页
					router.push("/");
					// resetRouter();
					commit("RESET_STATE");
					resolve();
				})
				.catch(error => {
					reject(error);
				});
		});
	},

	// reset token
	resetToken({ commit }: ActionContext<IUserState, IState>) {
		return new Promise<void>(resolve => {
			// console.log(state.token);

			removeToken(); // must remove  token  first
			commit("RESET_STATE");
			resolve();
		});
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
