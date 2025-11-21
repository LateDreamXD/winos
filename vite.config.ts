import type { UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default <UserConfig>{
	base: './', // allow setup to child directory
	plugins: [vue()],
	server: {
		host: '0.0.0.0'
	},
	build: {
		modulePreload: {
			polyfill: true
		},
		rollupOptions: {
			output: {
				manualChunks: {
					vue: ['vue'],
					vuex: ['vuex']
				}
			}
		}
	}
}
