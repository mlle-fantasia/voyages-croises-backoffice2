import Vue from "vue";
import dayjs from "dayjs";

Vue.filter("formatBoolean", function (value) {
	if (value) return "Oui";
	else return "Non";
});

Vue.filter("formatDate", function (value) {
	if (!value) return "";
	return dayjs(value).format("DD/MM/YYYY");
});

Vue.filter("formatDateTime", function (value) {
	if (!value) return "";
	return dayjs(value).format("DD/MM/YYYY [à] HH:mm");
});
