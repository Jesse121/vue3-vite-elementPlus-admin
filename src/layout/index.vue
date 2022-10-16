<template>
	<div :class="classObj" class="app-wrapper">
		<sidebar class="sidebar-container" />
		<div class="main-container">
			<div class="fixed-header">
				<navbar />
				<tags-view />
			</div>
			<app-main />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

import { IState } from "@/store";

import { AppMain, Navbar, Sidebar, TagsView } from "./components";

const store = useStore<IState>();

const sidebarRef = computed(() => store.state.app.sidebar);
const classObj = computed(() => ({
	hideSidebar: !sidebarRef.value.opened,
	openSidebar: sidebarRef.value.opened,
	withoutAnimation: sidebarRef.value.withoutAnimation
}));
</script>

<style lang="less" scoped>
@import "@/styles/mixin";
@import "@/styles/variables";

.app-wrapper {
	.clearfix();
	position: relative;
	width: 100%;
	height: 100%;
}
.drawer-bg {
	position: absolute;
	top: 0;
	z-index: 999;
	width: 100%;
	height: 100%;
	background: #000;
	opacity: 0.3;
}

.fixed-header {
	position: fixed;
	top: 0;
	right: 0;
	z-index: 9;
	width: calc(100% - (@sideBarWidth));
	transition: width 0.28s;
}

.hideSidebar .fixed-header {
	width: calc(100% - 64px);
}
</style>
