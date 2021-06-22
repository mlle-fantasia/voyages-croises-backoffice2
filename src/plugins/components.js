import Vue from "vue";

import NavPublic from "../components/templates/NavPublic";
Vue.component("nav-public", NavPublic);
import NavPrivate from "../components/templates/NavPrivate";
Vue.component("nav-private", NavPrivate);
import FooterPublic from "../components/templates/FooterPublic";
Vue.component("footer-public", FooterPublic);

/// les composants
import "jodit/build/jodit.min.css";
import { JoditEditor } from "jodit-vue";
Vue.component("jodit-editor", JoditEditor);

import vSelect from "vue-select";
Vue.component("v-select", vSelect);

