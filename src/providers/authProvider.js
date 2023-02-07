import { API_URL } from "../constants";
import _ from "lodash";

// Authenticated by default
export default {
  login: ({ username, password }) => {
    const url = API_URL + "/login";

    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify({ email: username, password: password }),
      //headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((response) => {
        if (response.data.access_token) {
          localStorage.removeItem("not_authenticated");
          localStorage.setItem("auth", JSON.stringify(response.data));
          localStorage.setItem("permissions", response.data.role);
          return Promise.resolve({ redirectTo: "/interests" });
        }
        localStorage.setItem("not_authenticated", true);
        return Promise.reject();
      });
  },
  logout: () => {
    localStorage.clear();
    localStorage.setItem("not_authenticated", true);
    return Promise.resolve();
  },
  checkError: (obj) => {
    return _.isUndefined(obj) || obj.status === 401 || obj.status === 403
      ? Promise.reject()
      : Promise.resolve();
  },
  // checkError: ({ status }) => {
  //   return status === 401 || status === 403
  //     ? Promise.reject()
  //     : Promise.resolve();
  // },
  checkAuth: () => {
    const auth = localStorage.getItem("auth");
    return auth !== null ? Promise.resolve() : Promise.reject();
  },
  getPermissions: () => {
    const role = localStorage.getItem("permissions");
    return role ? Promise.resolve(role) : Promise.reject();
  },
  getIdentity: () => {
    return {
      id: localStorage.getItem("login"),
      fullName: localStorage.getItem("user"),
      avatar: localStorage.getItem("avatar"),
    };
  },
};
