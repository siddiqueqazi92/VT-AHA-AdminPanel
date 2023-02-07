// in src/MyLayout.js
import { Layout } from "react-admin";
import MyMenu from "./MyMenu";

const MyLayout = (props) => <Layout {...props} menu={MyMenu} />;
//const MyLayout = (props) => <Layout {...props} />;

export default MyLayout;
