import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  EditButton,
  DeleteButton,
  FunctionField,
  useTranslate,
  CardActions,
  RefreshButton,
  CreateButton,
  BooleanField,
  useListContext,
} from "react-admin";

import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { UserFilter } from "./Filters";
import { RESOURCES } from "../../constants";
import BulkDeleteButton from "../Buttons/BulkDeleteButton";
import UserLinkField from "../Common/Fields/UserLinkField";
import { EnableDisableButton } from "./Fields/EnableDisableButton";
import { CustomEditButton } from "../Common/Buttons";


const ActionsRefresh = (props) => (
  <CardActions>
    <CreateButton basePath={props.basePath} />
  </CardActions>
);


export const UserList = (props) => (
  <div>
    <List
      {...props}
      filterDefaultValues={{ is_artist: false }}
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
        <FunctionField
                  label="ra.strings.phone"
                  render={(record) => `${record.contact}`}
                />

        <TextField source="following_count" label="ra.strings.followings" sortable={false} />
        <TextField source="follower_count" label="ra.strings.followers" sortable={false} />
        <TextField source="login_type" label="ra.strings.signup_via" sortable={false} />
        <EnableDisableButton />       

        {/* <EditButton /> */}
        <CustomEditButton />
        {/* <DeleteButton undoable={false} /> */}
      </Datagrid>
    </List>
  </div>
);
