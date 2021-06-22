import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
const axios = require("axios");
// les views
//// site
import Home from "../views/Home.vue";
import Contact from "../views/Contact.vue";
import Article from "../views/Article.vue";
import About from "../views/About.vue";
////backoffice
import Login from "../views/backoffice/Login.vue";
import AdminHome from "../views/backoffice/AdminHome.vue";
import AdminArticles from "../views/backoffice/AdminArticles.vue";
import AdminArticlesEdit from "../views/backoffice/AdminArticlesEdit.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
		meta: { public: true },
	},
	{
		path: "/apropos",
		name: "About",
		component: About,
		meta: { public: true },
	},
	{
		path: "/contact",
		name: "Contact",
		component: Contact,
		meta: { public: true },
	},
	{
		path: "/article/:id",
		name: "article",
		component: Article,
		meta: { public: true },
	},

	// espace admin
	{
		path: "/admin",
		name: "Login",
		component: Login,
		meta: { public: true },
	},
	{
		path: "/admin/home",
		name: "AdminHome",
		component: AdminHome,
	},
	{
		path: "/admin/articles",
		name: "AdminArticles",
		component: AdminArticles,
	},
	{
		path: "/admin/articles/:id",
		name: "AdminArticlesEdit",
		component: AdminArticlesEdit,
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach(async (to, from, next) => {
	//console.log("to", to, store.state.accesstoken);
	async function autolog() {
		//console.log("token", store.state.accesstoken);
		let token = store.state.accesstoken;
		if (!store.state.accesstoken) token = window.localStorage.getItem("accesstoken");
		if (!token) return false;
		//console.log("autolog");
		try {
			let response = await axios.post(process.env.VUE_APP_SERVER_URL + "/autologin", {
				token: token,
			});
			if (response.data.err) {
				return false;
			}
			store.commit("set_connexion", {
				accesstoken: response.data.token,
				user: response.data.user,
			});
			return true;
		} catch (error) {
			console.error("ko", error);
			return false;
		}
	}
	console.log("to.meta", to.meta);
	if (to.meta && to.meta.public) return next();
	else {
		if (store.state.connected) return next();
		else {
			await autolog();
			//return next({ path: "/" });
		}
	}
	if (!store.state.connected) return next({ path: "/" });
	if (store.state.connected) return next();
	return next();
});

export default router;
