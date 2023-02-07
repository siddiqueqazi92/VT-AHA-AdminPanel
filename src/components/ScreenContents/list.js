import * as React from "react";
import { List, Datagrid, TextField, EditButton } from "react-admin";

export const ScreenContentList = (props) => {
  return (
    <List
      {...props}
      bulkActionButtons={false}
      exporter={false}
      title="ra.strings.screen_contents"
    >
      <Datagrid rowClick="show">
        <TextField source="display_name" label="ra.strings.name" />
        <EditButton />
      </Datagrid>
    </List>
  );
};
