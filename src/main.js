import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App.vue'
import Index from './views/Index.vue'
import Category from './views/Category.vue'

library.add(faHome)
library.add(faSearch)
library.add(faFilter)
library.add(faEnvelope)
library.add(faPlus)
library.add(faPhone)
library.add(faAngleRight)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use (VueRouter)
const router = new VueRouter({
	hashbang: false,
	mode: 'history',
	transitionOnLoad: true,
	root: '/',
	routes: [
		{ path: '/', component: Index, meta:{title:'Главная'} },
		{ path: '/category/:id', name:'category', component: Category, meta:{title:'Категории'} }
	],
	scrollBehavior (to, from, savedPosition) {
		//https://router.vuejs.org/guide/advanced/scroll-behavior.html
		if (to.hash) {
			return { selector: to.hash }
		} else if (savedPosition) {
			return savedPosition
		} else {
			return { x: 0, y: 0 }
		}
	}
})
window.axios = axios
router.beforeEach((to, from, next) => {
	document.title = to.meta.title
	next()
})
new Vue({
	el: '#app',
	render: h => h(App),
	router
})
