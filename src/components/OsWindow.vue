<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import type { WindowState } from '../store'

const props = defineProps<{
	window: WindowState
}>()

const store = useStore()
const dragging = ref(false)
const offset = ref({ x: 0, y: 0 })

const styleObject = computed(() => ({
	zIndex: props.window.zIndex,
	left: `${props.window.x}px`,
	top: `${props.window.y}px`,
	display: props.window.isMinimized ? 'none' : 'flex'
}))

const isActive = computed(() => store.state.activeWindowId === props.window.id)

const onMouseDown = (e: MouseEvent) => {
	store.commit('FOCUS_WINDOW', props.window.id)
}

const startDrag = (e: MouseEvent) => {
	dragging.value = true
	offset.value = {
		x: e.clientX - props.window.x,
		y: e.clientY - props.window.y
	}
	window.addEventListener('mousemove', onDrag)
	window.addEventListener('mouseup', stopDrag)
}

const onDrag = (e: MouseEvent) => {
	if (!dragging.value) return
	let x = e.clientX - offset.value.x
	let y = e.clientY - offset.value.y
	store.commit('UPDATE_WINDOW_POS', { id: props.window.id, x, y })
}

const stopDrag = () => {
	dragging.value = false
	window.removeEventListener('mousemove', onDrag)
	window.removeEventListener('mouseup', stopDrag)
}

const minimize = () => store.commit('MINIMIZE_WINDOW', props.window.id)
const close = () => store.commit('CLOSE_WINDOW', props.window.id)
</script>

<template>
	<div
		class="os-window"
		:class="{ active: isActive }"
		:style="styleObject"
		@mousedown="onMouseDown"
	>
		<div class="title-bar" @mousedown="startDrag">
			<span class="title">{{ window.title }}</span>
			<div class="controls">
				<button @click.stop="minimize">_</button>
				<button class="close" @click.stop="close">×</button>
			</div>
		</div>
		<div class="content">
			<div class="mock-content">
				App Content: {{ window.component }}
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.os-window {
	position: absolute;
	width: 400px;
	height: 300px;
	background: #fff;
	border: 1px solid #ccc;
	box-shadow: 0 4px 10px rgba(0,0,0,0.2);
	display: flex;
	flex-direction: column;
	overflow: hidden;
	border-radius: 4px;

	&.active {
		box-shadow: 0 8px 20px rgba(0,0,0,0.3);
		border-color: #0078d7;

		.title-bar {
			background: #0078d7;
			color: white;
		}
	}

	.title-bar {
		height: 30px;
		background: #f0f0f0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 10px;
		cursor: default;
		user-select: none;

		.title {
			font-size: 12px;
		}

		.controls {
			display: flex;
			gap: 4px;

			button {
				width: 24px;
				height: 20px;
				border: none;
				background: transparent;
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;

				&:hover {
					background: rgba(255,255,255,0.2);
				}

				&.close:hover {
					background: #e81123;
					color: white;
				}
			}
		}
	}

	.content {
		flex: 1;
		padding: 10px;
		background: white;
		overflow: auto;
	}
}
</style>
