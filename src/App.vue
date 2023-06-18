<template>
	<el-config-provider :locale="locale">
		<router-view />
	</el-config-provider>
</template>

<script setup lang="ts">
import locale from "element-plus/lib/locale/lang/zh-cn";
import { onMounted } from "vue";

import createWatermark from "@/utils/createWatermark";

onMounted(() => {
	createWatermark({
		content: "jesse"
	});
});
</script>
