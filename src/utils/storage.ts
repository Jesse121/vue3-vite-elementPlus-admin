const las: Storage = window.localStorage;

export default {
	getItem(key: string) {
		let result: any = las.getItem(key);
		if (!result) return null;
		try {
			result = JSON.parse(result);
			if (Date.now() - result.time > result.expire) {
				las.removeItem(key);
				return null;
			}
			return result.data;
		} catch (err) {
			// JSON.parse()不能解析带有中划线的字符串
			return result.data;
		}
	},
	setItem(key: string, val: any, expire: number = 24 * 60 * 60 * 1000) {
		const obj = {
			data: val,
			time: Date.now(),
			expire
		};
		las.setItem(key, JSON.stringify(obj));
	},
	clear() {
		las.clear();
	},
	keys() {
		return las.keys();
	},
	removeItem(key: string) {
		las.removeItem(key);
	}
};
