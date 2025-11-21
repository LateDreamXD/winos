// @ts-nocheck
import { createStore } from 'vuex'

export interface WindowState {
	id: string
	title: string
	component: string
	zIndex: number
	isMinimized: boolean
	x: number
	y: number
}

interface State {
	windows: WindowState[]
	activeWindowId: string | null
	zIndexCounter: number
}

export default createStore<State>({
	state: {
		windows: [],
		activeWindowId: null,
		zIndexCounter: 100
	},
	mutations: {
		OPEN_WINDOW(state, payload: { id: string; title: string; component: string }) {
			if (state.windows.find(w => w.id === payload.id)) {
				this.commit('FOCUS_WINDOW', payload.id)
				return
			}
			state.zIndexCounter++
			state.windows.push({
				id: payload.id,
				title: payload.title,
				component: payload.component,
				zIndex: state.zIndexCounter,
				isMinimized: false,
				x: 50 + (state.windows.length * 20),
				y: 50 + (state.windows.length * 20)
			})
			state.activeWindowId = payload.id
		},
		CLOSE_WINDOW(state, id: string) {
			state.windows = state.windows.filter(w => w.id !== id)
			if (state.activeWindowId === id) {
				state.activeWindowId = null
			}
		},
		FOCUS_WINDOW(state, id: string) {
			const win = state.windows.find(w => w.id === id)
			if (win) {
				state.zIndexCounter++
				win.zIndex = state.zIndexCounter
				win.isMinimized = false
				state.activeWindowId = id
			}
		},
		MINIMIZE_WINDOW(state, id: string) {
			const win = state.windows.find(w => w.id === id)
			if (win) {
				win.isMinimized = true
				state.activeWindowId = null
			}
		},
		UPDATE_WINDOW_POS(state, payload: { id: string; x: number; y: number }) {
			const win = state.windows.find(w => w.id === payload.id)
			if (win) {
				win.x = payload.x
				win.y = payload.y
			}
		}
	}
})
