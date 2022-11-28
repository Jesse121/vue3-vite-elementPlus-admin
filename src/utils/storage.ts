/**
 * storage二次封装
 */
import config from "@/config/index";

export default {
	getStorage(): Record<string, any> {
		return JSON.parse(window.localStorage.getItem(config.namespace) || "{}");
	},
	getItem(key: string) {
		return this.getStorage()[key];
		// let result: any = window.localStorage.getItem(key);
		// if (!result) return null;
		// try {
		// 	result = JSON.parse(result);
		// 	if (Date.now() - result.time > result.expire) {
		// 		window.localStorage.removeItem(key);
		// 		return null;
		// 	}
		// 	return result.data;
		// } catch (err) {
		// 	// JSON.parse()不能解析带有中划线的字符串
		// 	return result.data;
		// }
	},
	setItem(key: string, val: any) {
		const storage = this.getStorage();
		storage[key] = val;
		window.localStorage.setItem(config.namespace, JSON.stringify(storage));
	},
	setExpireItem(key: string, val: any, expire: number = 24 * 60 * 60 * 1000) {
		const obj = {
			data: val,
			time: Date.now(),
			expire
		};
		window.localStorage.setItem(key, JSON.stringify(obj));
	},
	clearAll() {
		window.localStorage.clear();
	},
	removeItem(key: string) {
		const storage = this.getStorage();
		delete storage[key];
		window.localStorage.removeItem(key);
	}
};
