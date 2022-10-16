import { createStore } from "vuex";

import app, { IAppState } from "./modules/app";
import tagsView, { ITagsViewState } from "./modules/tags-view";
import user, { IUserState } from "./modules/user";

export interface IState {
	app: IAppState;
	user: IUserState;
	tagsView: ITagsViewState;
}

const getters = {
	sidebar: (state: IState) => state.app.sidebar,
	token: (state: IState) => state.user.token,
	avatar: (state: IState) => state.user.avatar,
	name: (state: IState) => state.user.name,
	routes: (state: IState) => state.user.routes,
	visitedViews: (state: IState) => state.tagsView.visitedViews
};

const store = createStore<IState>({
	modules: {
		app,
		user,
		tagsView
	},
	getters
});

export default store;
