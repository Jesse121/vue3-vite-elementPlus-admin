<template>
	<TableCol v-if="$attrs.type" :prop="prop" v-bind="$attrs" />
	<TableCol v-else :min-width="minWidth" :prop="prop" :show-overflow-tooltip="showOverflowTooltip" v-bind="$attrs">
		<template #default="scope">
			<slot name="default" v-bind="scope">
				{{ getValue(scope) }}
			</slot>
		</template>
		<template v-if="$slots.header" #header="scope">
			<slot name="header" v-bind="scope" />
		</template>
	</TableCol>
</template>
<script lang="ts">
import { isFunction } from "@vue/shared";
import { ElTableColumn } from "element-plus";
import { defineComponent } from "vue";

/**
 * ElTableColumn
 */
export default defineComponent({
	name: "TableColumn",
	components: {
		TableCol: ElTableColumn
	},
	props: {
		/** 对应列内容的字段名，也可以使用 property 属性 */
		prop: {
			type: String,
			default: ""
		},
		/** 默认值 */
		defaultValue: {
			type: String,
			default: ""
		},
		/** 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列 */
		minWidth: {
			type: String,
			default: "85"
		},
		/** 当内容过长被隐藏时显示 tooltip */
		showOverflowTooltip: {
			type: Boolean,
			default: true
		},
		/** 用来格式化内容 */
		formatter: {
			type: Function,
			default: (_row: any, _column: any, cellValue: any) => cellValue
		}
	},
	setup(props) {
		function getValue({ row, column, $index }) {
			const cellValue = row?.[props.prop];
			const value = isFunction(props.formatter) ? props.formatter(row, column, cellValue, $index) : undefined;
			return value ?? props.defaultValue;
		}

		return {
			getValue
		};
	}
});
</script>
