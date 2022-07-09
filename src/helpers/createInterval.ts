export default function createInterval(callback: Function, duration: number) {
	var timerId: number;

	return {
		start() {
			this.stop();
			timerId = setInterval(callback, duration);
		},

		stop() {
			if (!timerId) return;
			clearInterval(timerId);
		},
	};
}
