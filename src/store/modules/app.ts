import las from "@/utils/storage";

export interface IAppState {
	sidebar: {
		opened: boolean;
		withoutAnimation: boolean;
	};
}

const state: IAppState = {
	sidebar: {
		opened: las.getItem("sidebarStatus") ? !!las.getItem("sidebarStatus") : true,
		withoutAnimation: false
	}
};

const mutations = {
	TOGGLE_SIDEBAR: (state: IAppState) => {
		state.sidebar.opened = !state.sidebar.opened;
		state.sidebar.withoutAnimation = false;
		if (state.sidebar.opened) {
			las.setItem("sidebarStatus", "1");
		} else {
			las.setItem("sidebarStatus", "0");
		}
	}
	// CLOSE_SIDEBAR: (state: IAppState, withoutAnimation: boolean) => {
	// 	Cookies.set("sidebarStatus", "0");
	// 	state.sidebar.opened = false;
	// 	state.sidebar.withoutAnimation = withoutAnimation;
	// }
};

const actions = {
	toggleSideBar({ commit }: any) {
		commit("TOGGLE_SIDEBAR");
	}
	// closeSideBar({ commit }: any, { withoutAnimation }: { withoutAnimation: boolean }) {
	// 	commit("CLOSE_SIDEBAR", withoutAnimation);
	// }
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
