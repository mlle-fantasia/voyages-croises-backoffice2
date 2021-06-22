import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./plugins/components";
import "./plugins/filters";


import Notifications from "vue-notification";
Vue.use(Notifications);

import "bootstrap";
import { Tooltip } from "bootstrap";
Object.defineProperty(Vue.prototype, "$tooltip", { value: Tooltip });

import "jodit/build/jodit.min.css";
import JoditVue from "jodit-vue";
Vue.use(JoditVue);

const axios = require("axios");
Object.defineProperty(Vue.prototype, "$axios", { value: axios });

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
