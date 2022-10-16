/* 由脚本生成, 请勿修改!!! */
/* eslint-disable */

import request from "@/utils/request";

interface BaseRes<T = any> {
	msg: string;
	result: T;
	info: string;
	status: boolean;
	[k: string]: any;
}

export interface LoginParams {
	/**
	 * 用户账号
	 */
	username?: string;
	/**
	 * 手机号（账号合手机号都可以登录）
	 */
	mobile?: string;
	/**
	 * 密码
	 */
	password: string;
}

export interface LoginData {
	msg: string;
	code: number;
	/**
	 * token存活时间
	 */
	expire: number;
	/**
	 * tokrn
	 */
	token: string;
	[k: string]: any;
}

/**
 * /project/224/interface/api/28936
 *
 * web后台登录接口
 * ------------
 *
 * 作者: wanxianbo
 *
 * 创建时间: 2021/05/31 15:52:14
 *
 * 更新时间: 2021/05/31 15:54:39
 *
 * 接口状态: 已完成
 *
 * @param {object} data 接口请求参数*
 * @property {string} [username] 用户账号
 * @property {string} [mobile] 手机号（账号合手机号都可以登录）
 * @property {string} password 密码
 *
 * @param {object} [config] 自定义配置, 如果需要对请求特殊处理时, 可以通过此配置项来处理
 *
 */
export function login(data: LoginParams, config?: Record<string, any>): Promise<LoginData> {
	return request({
		url: import.meta.env.VITE_APP_MOCK === "true" ? `/mock/224/api/web/login` : `/api/web/login`,
		method: "post",
		data,
		...config
	}) as any;
}

export interface LogoutParams {
	token: any;
}

export interface LogoutData {
	msg: string;
	code: number;
	[k: string]: any;
}

/**
 * /project/224/interface/api/28972
 *
 * 退出接口
 * ------------
 *
 * 作者: chency
 *
 * 创建时间: 2021/06/01 14:01:26
 *
 * 更新时间: 2021/06/04 12:34:06
 *
 * 接口状态: 已完成
 *
 * @param {object} data 接口请求参数*
 * @property {any} token
 *
 * @param {object} [config] 自定义配置, 如果需要对请求特殊处理时, 可以通过此配置项来处理
 *
 */
export function logout(data: LogoutParams, config?: Record<string, any>): Promise<LogoutData> {
	const { token } = data;
	return request({
		url: import.meta.env.VITE_APP_MOCK === "true" ? `/mock/224/api/logout` : `/api/logout`,
		method: "post",
		params: { token },
		...config
	}) as any;
}
