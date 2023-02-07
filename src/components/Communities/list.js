import React from "react";
import {
  Datagrid,
  DeleteButton,
  EditButton,
  List,
  DateField,
  TextField,
  Filter,
  SearchInput,
  ChipField,
  ImageField,
  ReferenceField,
} from "react-admin";

import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { LANGUAGE, RESOURCES } from "../../constants";
import BulkDeleteButton from "../Buttons/BulkDeleteButton";
import { MyListActions } from "../Common/Actions";
import { LinkToRelatedUsers } from "../Common/Fields";
import UserLinkField from "../Common/Fields/UserLinkField";

export const CommunityList = (props) => {
  return (
    <div>
      <List
        {...props}
        filters={<CategoryFilter />}
        // bulkActionButtons={
        //   <BulkDeleteButton resource_name={RESOURCES.DELIVERY_VEHICLES} />
        // }
        bulkActionButtons={false}
        title="ra.strings.communities"
        actions={false}
      >
        <Datagrid rowClick="show">
          <TextField source="id" label="ra.strings.id" />          
          <UserLinkField label="ra.strings.name" />          
          <ReferenceField label="ra.strings.artist" source="artist.user_id" reference={RESOURCES.ARTISTS} link="show" sortable={false}>            
            <UserLinkField label="ra.strings.user" />
            </ReferenceField>
          <TextField source="follower_count" label="ra.strings.followers" sortable={false} />
          <DateField source="createdAt" label="ra.strings.created_at" />          
          {/* <EditButton /> */}
          {/* <DeleteButton undoable={false} /> */}
        </Datagrid>
      </List>
    </div>
  );
};

//categorylist filter

const CategoryFilter = (props) => {
  return (
    <Filter {...props}>
      <SearchInput source="q" alwaysOn />
      {/* <TextInput source="name" defaultValue="Qui tempore rerum et voluptates" /> */}
      {/* <DateInput label="Created At" source="createdAt" defaultValue /> */}
    </Filter>
  );
};

// const QuickFilter = ({ label }) => {
//   const translate = useTranslate();
//   const classes = useQuickFilterStyles();
//   return <Chip className={classes.chip} label={translate(label)} />;
// };
