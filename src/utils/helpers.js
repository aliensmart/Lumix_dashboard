import localization from "moment/locale/fr";
import moment from "moment";

export const renderDate = (date) => {
  moment.updateLocale("fr", localization);
  return moment(date).format("llll");
};
