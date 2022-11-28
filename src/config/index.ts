// 项目配置
const env = import.meta.env.NODE || "prod";
const envConfig = {
	dev: {
		baseApi: "/",
		mockApi: ""
	},
	test: {
		baseApi: "/",
		mockApi: ""
	},
	prod: {
		baseApi: "/",
		mockApi: ""
	}
};
export default {
	env,
	title: "***后台管理系统",
	TokenKey: "***-admin_token",
	NAME: "***-admin_name",
	ROUTE: "***-admin_route",
	namespace: "projectName",
	mock: true,
	...envConfig[env]
};
