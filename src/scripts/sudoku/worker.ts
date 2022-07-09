import { generateHints, removeHints } from "./main";
import { cloneDeep } from "lodash-es";

self.addEventListener("message", (e) => {
	if (e.data.key === "generate") {
		let solution = generateHints();
		let hints = removeHints(cloneDeep(solution), e.data.value);

		self.postMessage({
			key: e.data.key,
			value: { hints, solution },
		});

		return;
	}
});
