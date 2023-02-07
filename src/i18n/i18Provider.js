import polyglotI18nProvider from "ra-i18n-polyglot";
import englishMessages from "./en";
import arabicMessages from "./ar";
import { createMuiTheme } from "@material-ui/core/styles";

var auth = localStorage.getItem("auth");
let lang = "en";
if (auth) {
  const { language } = JSON.parse(auth);
  lang = language;
}
let theme;
const i18nProvider = polyglotI18nProvider((locale) => {
  if (locale === "en") {
    theme = createMuiTheme({
      direction: "ltr",
      palette: {
        primary: {
          main: "#4B0082", //indigo
        },
        secondary: {
          main: "#0089c1",
        },
      },
    });
    // initial call, must return synchronously
    return englishMessages;
  } else if (locale === "ar") {
    theme = createMuiTheme({
      direction: "rtl",
      palette: {
        primary: {
          main: "#4B0082", //indigo
        },
        secondary: {
          main: "#0089c1",
        },
      },
    });
    // initial call, must return synchronously
    return arabicMessages;
  }
}, lang);

export { theme, i18nProvider, englishMessages, arabicMessages };
