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

export type MenuNavData = {
	/**
	 * 子节点
	 */
	children: {
		children: string[];
		menuId: number;
		parentId: number;
		desc: string;
		path: string;
		type: number;
		orderNum: number;
		[k: string]: any;
	}[];
	/**
	 * 菜单id
	 */
	menuId: number;
	/**
	 * 父id
	 */
	parentId: number;
	/**
	 * 菜单描述
	 */
	desc: string;
	/**
	 * 菜单路由
	 */
	path: string;
	/**
	 * 菜单类型
	 */
	type: number;
	/**
	 * 排序
	 */
	orderNum: number;
	[k: string]: any;
}[];

/**
 * /project/224/interface/api/28945
 *
 * 查看当前用户的菜单
 * ------------
 *
 * 作者: wanxianbo
 *
 * 创建时间: 2021/05/31 15:55:33
 *
 * 更新时间: 2021/05/31 16:17:51
 *
 * 接口状态: 已完成
 *
 * @param {object} data 接口请求参数*
 *
 * @param {object} [config] 自定义配置, 如果需要对请求特殊处理时, 可以通过此配置项来处理
 *
 */
export function getMenuNav(config?: Record<string, any>): Promise<BaseRes<MenuNavData>> {
	return request({
		url: import.meta.env.VITE_APP_MOCK === "true" ? `/mock/224/api/web/menu/nav` : `/api/web/menu/nav`,
		method: "get",
		...config
	}) as any;
}
