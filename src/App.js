import * as React from "react";
import { Admin, Resource } from "react-admin";

import authProvider from "./providers/authProvider";
import myDataProvider from "./providers/dataProvider";

import { createHashHistory } from "history";

import { i18nProvider, theme } from "./i18n/i18Provider";
import { RESOURCES } from "./constants";
import MyLayout from "./Layout/MyLayout";
import { Dashboard } from "./Dashboard";

import Interests from "./components/Interests";
import Vibes from "./components/Vibes";
import Communities from "./components/Communities";

import Users from "./components/Users";
import Artists from "./components/Artists";
import Arts from "./components/Arts";
import Sales from "./components/Sales";
import Purchases from "./components/Purchases";
import ArtCollections from "./components/ArtCollections";
import WithdrawalRequests from "./components/WithdrawalRequests";
import Events from "./components/Events";

// const myTheme = createMuiTheme({
//   palette: {
//     primary: indigo,
//     secondary: pink,
//     error: red,
//   },
// });

const history = createHashHistory();

class App extends React.Component {
  render() {
    return (
      <Admin
        layout={MyLayout}
        theme={theme}
        //dashboard={Dashboard}
        authProvider={authProvider}
        dataProvider={myDataProvider}
        i18nProvider={i18nProvider}
        // theme={myTheme}
        history={history}
        //customRoutes={customRoutes}
      >
        <Resource name={RESOURCES.USERS} {...Users} />
        <Resource name={RESOURCES.ARTISTS} {...Artists} />
        <Resource name={RESOURCES.INTERESTS} {...Interests} />
        <Resource name={RESOURCES.VIBES} {...Vibes} />
        <Resource name={RESOURCES.ARTS} {...Arts} />
        <Resource name={RESOURCES.ART_COLLECTIONS} {...ArtCollections} />
        <Resource name={RESOURCES.COMMUNITIES} {...Communities} />
        <Resource name={RESOURCES.COMMENTS} />
        <Resource name={RESOURCES.SALES} {...Sales} />
        <Resource name={RESOURCES.PURCHASES} {...Purchases}  />
        <Resource name={RESOURCES.ADDRESSES} />
        <Resource name={RESOURCES.WITHDRAWAL_REQUESTS} {...WithdrawalRequests} />
        <Resource name={RESOURCES.EVENTS} {...Events} />
      </Admin>
    );
  }
}

export default App;
