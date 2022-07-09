<template>
	<div class="spinner-bracelet">
		<div v-for="(_, i) in new Array(12)" :style="`--child-index: ${i};`"></div>
	</div>
</template>

<style lang="postcss">
	.spinner-bracelet {
		@apply inline-block relative;
		width: 80px;
		height: 80px;

		& div {
			@apply absolute;
			top: 50%;
			left: 50%;
			width: 40px;
			height: 6px;
			transform-origin: 0px 3px;
			transform: rotate(calc(30deg * var(--child-index)));

			&::before {
				@apply bg-stone-500;
				content: "";
				display: block;
				position: inherit;
				right: 10px;
				width: 6px;
				height: 6px;
				border-radius: 50%;
				animation-name: spinner-bracelet-scale;
				animation-duration: 1.2s;
				animation-delay: calc(0.1s * var(--child-index));
				animation-timing-function: linear;
				animation-iteration-count: infinite;
			}
		}
	}

	@keyframes spinner-bracelet-scale {
		0%,
		20%,
		80%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.5);
		}
	}
</style>
