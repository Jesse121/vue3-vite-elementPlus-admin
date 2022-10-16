import {
	clear as clearItems,
	createStore,
	del as removeItem,
	entries as getEntries,
	get as getItem,
	getMany as getItems,
	keys as getKeys,
	set as setItem,
	setMany as setItems,
	update as updateItem,
	UseStore,
	values as getValues
} from "idb-keyval";

class IDB {
	store: UseStore;
	/**
	 *
	 * @param storeName 表名, 默认: common
	 * @param dbName 数据库名, 默认: qiake-db
	 */
	constructor(storeName = "common", dbName = "qiake-db") {
		this.store = createStore(dbName, storeName);
	}

	set(key: IDBValidKey, value: any) {
		return setItem(key, value, this.store);
	}

	setMany(entries: [IDBValidKey, any][]) {
		return setItems(entries, this.store);
	}

	get(key: IDBValidKey) {
		return getItem(key, this.store);
	}

	getMany(keys: IDBValidKey[]) {
		return getItems(keys, this.store);
	}

	update(key: IDBValidKey, updater: (oldValue: any) => any) {
		return updateItem(key, updater, this.store);
	}

	del(key: IDBValidKey) {
		return removeItem(key, this.store);
	}

	clear() {
		return clearItems(this.store);
	}

	entries() {
		return getEntries(this.store);
	}

	keys() {
		return getKeys(this.store);
	}

	values() {
		return getValues(this.store);
	}
}

export default IDB;
