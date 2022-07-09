<template>
	<nav class="bg-slate-800 text-white">
		<div class="container mx-auto flex flex-wrap justify-between">
			<div class="h-14 px-4 flex items-center sm:order-1">
				<span class="font-['Roboto_Mono'] font-[700] text-xl">JAY-AR</span>
			</div>
			<div class="h-14 px-4 flex items-center justify-center sm:order-3 font-['Roboto_Mono'] text-xs">
				<span>{{ getToday.time }}</span>
				<span class="ml-2 inline-block sm:hidden md:inline-block">{{ getToday.date }}</span>
			</div>
			<div class="mx-4 flex sm:hidden items-center justify-center">
				<button
					class="flex items-center p-1 border rounded-full text-teal-200 border-teal-400 hover:text-white hover:border-white"
					v-on:click="navOpen = !navOpen">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
					</svg>
				</button>
			</div>
			<div
				class="nav-links sm:px-8 w-full sm:w-auto sm:h-auto sm:flex-grow flex flex-col sm:flex-row sm:order-2 transition-[height] overflow-y-auto text-sm"
				:class="{ 'h-52': navOpen, 'h-0': !navOpen }">
				<RouterLink
					v-for="route in routes"
					:to="route.path"
					class="h-12 sm:h-auto sm:w-20 px-10 sm:px-4 hover:bg-slate-700 flex items-center sm:justify-center capitalize">
					{{ route.name }}
				</RouterLink>
			</div>
		</div>
	</nav>
</template>

<script lang="ts">
	import { defineComponent, ref } from "vue";
	import { RouterLink } from "vue-router";
	import { format } from "date-fns";
	import createInterval from "@/helpers/createInterval";

	const routes: { path: string; name: string }[] = [
		{ path: "/", name: "Home" },
		{ path: "/apps", name: "Apps" },
		{ path: "/profile", name: "Profile" },
		{ path: "/support", name: "Support" },
	];

	export default defineComponent({
		components: {
			RouterLink,
		},

		data() {
			return {
				routes,
				navOpen: false,
			};
		},

		setup() {
			const today = ref(new Date());

			const timer = createInterval(() => {
				today.value = new Date();
			}, 1000);

			return { timer, today };
		},

		methods: {},

		computed: {
			getToday() {
				return {
					time: format(this.today, "HH:mm"),
					date: format(this.today, "MMM-dd-yy"),
				};
			},
		},

		mounted() {
			this.timer.start();
		},

		beforeUnmount() {
			this.timer.stop();
		},
	});
</script>

<style lang="postcss">
	.router-link-active {
		@apply text-green-700 font-bold;
	}
</style>
