interface params {
	container?: HTMLElement;
	content?: string;
	width?: string;
	height?: string;
	font?: string;
	textAlign?: CanvasTextAlign;
	textBaseline?: CanvasTextBaseline;
	rotate?: number;
	color?: string;
	zIndex?: number;
}

function createWatermark({
	content = "水印内容",
	container = document.body,
	width = "200px",
	height = "150px",
	font = "20px Microsoft YaHei",
	textAlign = "center",
	textBaseline = "middle",
	rotate = -15,
	color = "rgba(144,147,153,0.1)",
	zIndex = 9999
}: params) {
	const args = arguments[0];
	// 创建canvas
	const canvas = document.createElement("canvas");
	canvas.setAttribute("width", width);
	canvas.setAttribute("height", height);
	const ctx = canvas.getContext("2d");
	if (!ctx) return;
	// 绘制水印
	ctx.font = font;
	ctx.textAlign = textAlign;
	ctx.textBaseline = textBaseline;
	ctx.fillStyle = color;
	ctx.rotate((Math.PI / 180) * rotate);
	ctx.fillText(content, parseFloat(width) / 2, parseFloat(height) / 2);
	// 输出水印图片地址
	const base64Url = canvas.toDataURL();
	const watermarkNode = document.querySelector(".watermarkNode");
	const watermark = watermarkNode || document.createElement("div");
	const styleStr = `position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  z-index:${zIndex};
  pointer-events:none;
  background-image:url('${base64Url}')`;
	watermark.setAttribute("style", styleStr);
	watermark.classList.add("watermarkNode");

	if (!watermarkNode) {
		// 只有当watermarkNode不存在时才插入水印节点
		container.style.position = "relative";
		container.insertBefore(watermark, container.firstChild);
	}

	if (MutationObserver) {
		let MOInstance = new MutationObserver(function () {
			const watermarkNode = document.querySelector(".watermarkNode");
			// 只在watermarkNode元素变动才重新调用 createWatermark
			if (!watermarkNode || (watermarkNode && watermarkNode.getAttribute("style") !== styleStr)) {
				// 避免一直触发
				MOInstance.disconnect();
				// 重新创建水印
				createWatermark(JSON.parse(JSON.stringify(args)));
			}
		});

		MOInstance.observe(container, {
			attributes: true,
			subtree: true,
			childList: true
		});
	}
}

export default createWatermark;
