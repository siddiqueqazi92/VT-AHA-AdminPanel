import * as React from "react";
import { List, Datagrid, TextField, NumberField, ChipField } from "react-admin";
import UserLinkField from "../Common/Fields/UserLinkField";

import { makeStyles } from '@material-ui/core/styles';
import { EventFilter } from "./Filters";
const useStyles = makeStyles({
  draft: { backgroundColor: '4BB543' },
  transferred: { backgroundColor: '#4BB543' },
});



export const EventList = (props) => (
  <div>
    <List {...props} bulkActionButtons={false}
      filters={<EventFilter />}
      title="ra.strings.events">
      <Datagrid>
        <UserLinkField label="ra.strings.created_by" />
        <TextField source="Name" label="ra.strings.name"  />        
        
      </Datagrid>
    </List>
  </div>
);
