<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const windows = computed(() => store.state.windows)
const activeId = computed(() => store.state.activeWindowId)
const time = ref('')
let timer: number

const updateTime = () => {
	const now = new Date()
	time.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

onMounted(() => {
	updateTime()
	timer = setInterval(updateTime, 1000)
})

onUnmounted(() => clearInterval(timer))

const toggleWindow = (id: string) => {
	const win = windows.value.find((w: any) => w.id === id)
	if (activeId.value === id && !win.isMinimized) {
		store.commit('MINIMIZE_WINDOW', id)
	} else {
		store.commit('FOCUS_WINDOW', id)
	}
}

const openStart = () => alert('Start Menu placeholder')
</script>

<template>
	<div class="taskbar">
		<button class="start-btn" @click="openStart">
			<span>❖</span>
		</button>
		<div class="apps-list">
			<div
				v-for="win in windows"
				:key="win.id"
				class="app-item"
				:class="{ active: activeId === win.id && !win.isMinimized }"
				@click="toggleWindow(win.id)"
			>
				{{ win.title }}
			</div>
		</div>
		<div class="system-tray">
			<span>{{ time }}</span>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.taskbar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 40px;
	background: #e0e0e0;
	display: flex;
	align-items: center;
	z-index: 9999;
	border-top: 1px solid rgba(0,0,0,0.1);
	padding: 0 10px;
	user-select: none;

	.start-btn {
		width: 36px;
		height: 30px;
		border: none;
		background: transparent;
		font-size: 20px;
		cursor: pointer;

		&:hover {
			background: rgba(0,0,0,0.05);
		}
	}

	.apps-list {
		flex: 1;
		display: flex;
		gap: 4px;
		margin-left: 10px;
		height: 100%;
		padding: 4px 0;

		.app-item {
			padding: 0 10px;
			background: rgba(255,255,255,0.5);
			display: flex;
			align-items: center;
			font-size: 12px;
			cursor: pointer;
			border-bottom: 2px solid transparent;
			width: 120px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;

			&:hover {
				background: rgba(255,255,255,0.7);
			}

			&.active {
				background: #fff;
				border-bottom-color: #0078d7;
			}
		}
	}

	.system-tray {
		margin-left: auto;
		font-size: 12px;
		padding: 0 10px;
	}
}
</style>
