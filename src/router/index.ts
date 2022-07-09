import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{ path: "/", name: "Home", component: () => import("@/views/HomeView.vue") },
		{ path: "/apps", name: "Apps", component: () => import("@/views/AppsView.vue") },
		{ path: "/profile", name: "Profile", component: () => import("@/views/ProfileView.vue") },
		{ path: "/support", name: "Support", component: () => import("@/views/SupportView.vue") },
		{ path: "/apps/sudoku", name: "Sudoku", component: () => import("@/views/SudokuView.vue") },
	],
});

export default router;
