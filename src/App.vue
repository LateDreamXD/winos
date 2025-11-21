<script lang="ts" setup>
import { ref } from 'vue';

const count = ref(0);
const dev = import.meta.env.DEV;

function countUp() {
	count.value++;
}
</script>

<template>
	<main>
		<h1>Ciallo～(∠・ω< )⌒★<span v-if="dev">&nbsp;DEV</span></h1>
		<button @click="countUp"
			v-text="!!count? `You are clicked me ${count} time(s)!`: 'Click me!'">
		</button>
		<p>
			powered by vue, vite, scss, and typescript
		</p>
	</main>
</template>

<style lang="scss" scoped>
@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
main {
	animation: fadeIn 0.4s ease-in-out;
	> button {
		border: none;
		border-radius: 8px;
		background-color: deepskyblue;
		font-size: 1.2em;
		padding: 0.5em 1em;
		outline: 1px solid transparent;
		transition: background-color 0.4s, outline-color 0.4s;
		&:hover {
			background-color: skyblue;
			outline-color: yellow;
		}
	}
}
</style>
