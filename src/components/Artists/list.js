import * as React from "react";
import {
  List,
  Datagrid,
  TextField,  
  FunctionField,  
  CardActions,  
  CreateButton,  
} from "react-admin";


import { UserFilter } from "./Filters";
import UserLinkField from "../Common/Fields/UserLinkField";
import { EnableDisableButton } from "./Fields/EnableDisableButton";
import { CustomEditButton } from "../Common/Buttons";

// const LinkToRelatedOrders = ({ record }) => {
//   const translate = useTranslate();
//   return record ? (
//     <Button
//       onClick={(e) => {
//         e.stopPropagation();
//       }}
//       color="primary"
//       component={Link}
//       to={{
//         pathname: "/rfps",
//         search: `filter=${JSON.stringify({ user_id: record.id })}`,
//       }}
//     >
//       {translate("ra.strings.rfps")}
//     </Button>
//   ) : null;
// };
const ActionsRefresh = (props) => (
  <CardActions>
    <CreateButton basePath={props.basePath} />
  </CardActions>
);

export const UserList = (props) => (
  <div>
    <List
      {...props}
      filterDefaultValues={{ is_artist: true }}
      filters={<UserFilter />}
      // bulkActionButtons={<BulkDeleteButton resource_name={RESOURCES.USERS} />}
      bulkActionButtons={false}
      actions={<ActionsRefresh />}
      title="ra.strings.users"
    >
      <Datagrid rowClick="show">
        {/* <TextField source="id" label="ra.strings.id" /> */}
        <UserLinkField label="ra.strings.user" />

        <TextField source="name" label="ra.strings.name" />
        {/* <TextField source="username" label="ra.strings.username" /> */}
        <FunctionField
                  label="ra.strings.phone"
                  render={(record) => `${record.contact}`}
                />

        <TextField source="following_count" label="ra.strings.followings" sortable={false} />
        <TextField source="follower_count" label="ra.strings.followers" sortable={false} />
        <TextField source="login_type" label="ra.strings.signup_via" sortable={false} />
        <EnableDisableButton />
      

        <CustomEditButton />
      </Datagrid>
    </List>
  </div>
);

