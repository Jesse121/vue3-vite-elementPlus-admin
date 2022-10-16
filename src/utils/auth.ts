import { RouteRecordRaw } from "vue-router";

import settings from "@/settings";

import las from "./storage";

const { NAME, ROUTE, TokenKey } = settings;

export function getToken() {
	return las.getItem(TokenKey);
}

export function saveToken(token: string) {
	return las.setItem(TokenKey, token);
}

export function removeToken() {
	return las.removeItem(TokenKey);
}

export function removeState() {
	las.removeItem(NAME);
	las.removeItem(ROUTE);
}

export function getName() {
	return las.getItem(NAME);
}
export function saveName(name: string) {
	return las.setItem(NAME, name);
}

export function getRoutes() {
	return las.getItem(ROUTE);
}

export function saveRoutes(routes: RouteRecordRaw[]) {
	return las.setItem(ROUTE, routes);
}
