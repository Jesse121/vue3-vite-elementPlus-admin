export function useBem(block: string) {
	return (element?: string, modifiers?: string): string => {
		if (!element && !modifiers) return block;

		// 如果传入了element则通过__拼接block和element,反之直接返回block
		const blockOrElement = element ? block + "__" + element : block;

		return modifiers ? `${blockOrElement}--${modifiers}` : blockOrElement;
	};
}
