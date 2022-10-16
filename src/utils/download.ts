import { saveAs } from "file-saver";
import qs from "qs";

import { getToken } from "@/utils/auth";

export function downloadFile(url: string) {
	saveAs(url.replace(/^https?:/, location.protocol), url.replace(/https?:\/\/[^/]+\//, "") || url);
}

export function exportFile(url: string) {
	return (data: Record<string, any>) => saveAs(`${url}?${qs.stringify({ ...data, token: getToken() })}`);
}
