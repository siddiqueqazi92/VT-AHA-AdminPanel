import {
  Filter,
  TextInput,
  ReferenceInput,
  SelectInput,
  BooleanField,
  NullableBooleanInput,
  usePermissions,
} from "react-admin";
import { ROLES } from "../../constants";

let auth = localStorage.getItem("auth");
let lang = "en";
if (auth) {
  const { language } = JSON.parse(auth);
  lang = language;
}

const EventFilter = (props) => {
  const { permissions } = usePermissions();
  return (
    <Filter {...props}>
      <TextInput label="ra.action.search" source="q" alwaysOn />
    </Filter>
  );
};

export { EventFilter };
