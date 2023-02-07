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
  BooleanField,
  ReferenceField,
} from "react-admin";

import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { LANGUAGE, RESOURCES } from "../../constants";
import BulkDeleteButton from "../Buttons/BulkDeleteButton";
import { MyListActions } from "../Common/Actions";
import { LinkToRelatedUsers } from "../Common/Fields";
import UserLinkField from "../Common/Fields/UserLinkField";

export const ArtCollectionList = (props) => {
  
  return (
    <div>
      <List
        {...props}
        filters={<CategoryFilter />}
        // bulkActionButtons={
        //   <BulkDeleteButton resource_name={RESOURCES.DELIVERY_VEHICLES} />
        // }
        bulkActionButtons={false}
        title="ra.strings.collections"
        actions={false}
      >
        <Datagrid rowClick="show">
          <TextField source="id" label="ra.strings.id" />          
          <TextField source="title" label="ra.strings.title" />                    
          <ReferenceField label="ra.strings.artist" source="artist.id" reference={RESOURCES.ARTISTS} link="show" sortable={false}>            
            <UserLinkField  />
          </ReferenceField>          
          <TextField source="privacy" label="ra.strings.privacy" sortable={false} />
          <TextField source="pinned_count" label="ra.strings.pinned_count" sortable={false} />

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
