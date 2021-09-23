import Vue from "vue";

import NavPublic from "../components/templates/NavPublic";
Vue.component("nav-public", NavPublic);
import NavPrivate from "../components/templates/NavPrivate";
Vue.component("nav-private", NavPrivate);
import FooterPublic from "../components/templates/FooterPublic";
Vue.component("footer-public", FooterPublic);
import Aside from "../views/Aside";
Vue.component("aside2", Aside);
import FormComment from "../views/FormComment";
Vue.component("form-comment", FormComment);
import CardArticle from "../components/CardArticle";
Vue.component("card-article", CardArticle);

/// espace admin
import FormCategory from "../views/backoffice/FormCategory";
Vue.component("form-category", FormCategory);
import FormTag from "../views/backoffice/FormTag";
Vue.component("form-tag", FormTag);
import FormPage from "../views/backoffice/FormPage";
Vue.component("form-page", FormPage);
import ModalConfirm from "../views/backoffice/ModalConfirm";
Vue.component("modal-confirm", ModalConfirm);
import LibraryImagesModal from "../views/backoffice/LibraryImagesModal";
Vue.component("modal-library-images", LibraryImagesModal);
import LibraryImages from "../views/backoffice/LibraryImages";
Vue.component("library-images", LibraryImages);

/// les composants externes
import "jodit/build/jodit.min.css";
import { JoditEditor } from "jodit-vue";
Vue.component("jodit-editor", JoditEditor);

import vSelect from "vue-select";
Vue.component("v-select", vSelect);
