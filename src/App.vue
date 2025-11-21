<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import Taskbar from './components/Taskbar.vue'
import OsWindow from './components/OsWindow.vue'
import DesktopIcon from './components/DesktopIcon.vue'

const store = useStore()
const windows = computed(() => store.state.windows)

const icons = [
	{ id: 'explorer', title: 'Explorer', icon: '📁' },
	{ id: 'browser', title: 'Browser', icon: '🌐' },
	{ id: 'notepad', title: 'Notepad', icon: '📝' },
	{ id: 'settings', title: 'Settings', icon: '⚙️' }
]
</script>

<template>
	<div class="desktop">
		<div class="icons-layer">
			<DesktopIcon
				v-for="icon in icons"
				:key="icon.id"
				v-bind="icon"
			/>
		</div>

		<div class="windows-layer">
			<OsWindow
				v-for="win in windows"
				:key="win.id"
				:window="win"
			/>
		</div>

		<Taskbar />
	</div>
</template>

<style lang="scss">
html, body {
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
	font-family: 'Segoe UI', sans-serif;
}

#app {
	width: 100%;
	height: 100%;
}

.desktop {
	width: 100%;
	height: 100%;
	background: url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1920&q=80') no-repeat center center;
	background-size: cover;
	position: relative;
	overflow: hidden;

	.icons-layer {
		padding: 10px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		flex-wrap: wrap;
		height: 90%;
		align-content: flex-start;
	}
}
</style>
