import Vue from "vue";
import Vuex from "vuex";
const axios = require("axios");

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		connected: false,
		accesstoken: "",
		user: {},
	},
	mutations: {
		set_connexion(state, what) {
			// console.log("what", what);
			if (!what.accesstoken) {
				axios.defaults.headers.common["authorization"] = "";
				window.localStorage.removeItem("accesstoken");
				state.accesstoken = null;
				/*         window.localStorage.removeItem("refreshtoken");
        state.refreshtoken = null; */
				window.localStorage.removeItem("user");
				state.user = {};
				state.connected = false;
				return;
			}
			axios.defaults.headers.common["authorization"] = what.accesstoken;
			window.localStorage.setItem("accesstoken", what.accesstoken);
			state.accesstoken = what.accesstoken;
			/*       window.localStorage.setItem("refreshtoken", what.refreshtoken);
      state.refreshtoken = what.refreshtoken; */
			window.localStorage.setItem("user", JSON.stringify(what.user));
			state.user = what.user;
			state.preferences = what.preferences;
			state.connected = true;
		},
	},
	actions: {},
	modules: {},
});
