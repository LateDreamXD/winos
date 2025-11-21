<script setup lang="ts">
import { useStore } from 'vuex'

const props = defineProps<{
	id: string
	title: string
	icon: string
}>()

const store = useStore()

const open = () => {
	store.commit('OPEN_WINDOW', {
		id: props.id,
		title: props.title,
		component: 'MockComponent'
	})
}
</script>

<template>
	<div class="desktop-icon" @dblclick="open">
		<div class="icon-img">{{ icon }}</div>
		<span class="icon-text">{{ title }}</span>
	</div>
</template>

<style lang="scss" scoped>
.desktop-icon {
	width: 70px;
	height: 80px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	border: 1px solid transparent;

	&:hover {
		background: rgba(255,255,255,0.1);
		border-color: rgba(255,255,255,0.2);
	}

	.icon-img {
		font-size: 32px;
		margin-bottom: 4px;
	}

	.icon-text {
		color: white;
		font-size: 12px;
		text-shadow: 0 1px 2px rgba(0,0,0,0.8);
		text-align: center;
	}
}
</style>
