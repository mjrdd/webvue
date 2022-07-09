<template>
	<div class="container mx-auto p-6">
		<h1 class="font-2xl">Sudoku</h1>
		<div class="my-4 flex">
			<button class="px-3 py-2 border" @click="create">New Game</button>
		</div>
		<div class="flex justify-center">
			<div class="flex flex-col">
				<div class="relative w-96 h-96 select-none">
					<img src="@/assets/sudoku/grid.png" alt="Sudoku grid template" class="absolute inset-0 z-10" />
					<div class="absolute inset-0 z-20 grid grid-cols-9 font-['Open_Sans'] font-light">
						<div v-for="tile in tiles" class="aspect-square text-xl flex items-center justify-center">
							{{ hints[tile.y][tile.x] !== 0 ? hints[tile.y][tile.x] : "" }}
						</div>
					</div>
					<div
						class="absolute inset-0 z-30 flex items-center justify-center bg-black bg-opacity-20"
						v-show="isGenerating">
						<SpinnerBracelet />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, ref } from "vue";
	import WorkerScript from "@/scripts/sudoku/worker?worker";
	import { createEmptyBoard } from "@/scripts/sudoku/main";
	import SpinnerBracelet from "@/components/spinners/Bracelet.vue";

	/**
	 * DIFFICULTY LEVEL
	 * VERY EASY 46+
	 * EASY      36-46
	 * MEDIUM    32-35
	 * DIFFICULT 28-31
	 * EXTREME   17-27
	 */

	export default defineComponent({
		components: { SpinnerBracelet },

		setup() {
			const worker = new WorkerScript();
			const tiles = Array.from({ length: 81 }, (_, i) => ({ x: i % 9, y: ~~(i / 9) }));
			return { worker, tiles };
		},

		data() {
			return {
				isGenerating: false,
				hints: createEmptyBoard(),
				solution: createEmptyBoard(),
			};
		},

		methods: {
			create() {
				if (this.isGenerating) return;
				this.hints = createEmptyBoard();
				this.solution = createEmptyBoard();
				this.worker.postMessage({ key: "generate", value: 55 });
				this.isGenerating = true;
			},
		},

		mounted() {
			this.worker.addEventListener("message", (e) => {
				if (e.data.key === "generate") {
					this.hints = e.data.value.hints;
					this.solution = e.data.value.solution;
					this.isGenerating = false;
				}
			});
		},

		beforeUnmount() {
			this.worker.terminate();
		},
	});
</script>
