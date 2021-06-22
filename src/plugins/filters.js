import Vue from "vue";

Vue.filter("formatBoolean", function (value) {
	if (value) return "Oui";
	else return "Non";
});
