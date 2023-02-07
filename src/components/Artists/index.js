import { UserList } from "./list";
import { EditUser } from "./edit";
import PeopleIcon from "@material-ui/icons/People";
import { CreateUser } from "./create";
import { ShowUser } from "./show";

export default {
  list: UserList,
  create: CreateUser,
  edit: EditUser,
  show: ShowUser,
  icon: PeopleIcon,
};
