<template>
	<Navbar />
	<RouterView />
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { RouterView } from "vue-router";
	import Navbar from "./components/Navbar.vue";

	export default defineComponent({
		components: {
			Navbar,
			RouterView,
		},
	});
</script>
