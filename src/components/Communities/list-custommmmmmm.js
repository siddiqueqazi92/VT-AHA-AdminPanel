import {
  Datagrid,
  DatagridBody,
  DateField,
  List,
  TextField
} from "react-admin";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";

import React from "react";
import UserLinkField from "../Common/Fields/UserLinkField";

const CustomDatagridRow = ({
  record,
  resource,
  id,
  onToggleItem,
  children,
  selected,
  basePath
}) =>
  (
    <TableRow key={id}>      
      <TableCell key={`${id}-text`}>        
        <UserLinkField
          source="name"
          record={record}
          basePath={basePath}
          resource={resource}
        />
        
      </TableCell>
      <TableCell>        
      <TextField
        label="ra.strings.artist"
          source="artist.username"
          record={record}
          basePath={basePath}
          resource={resource}
        />
        
      </TableCell>
    </TableRow>
  ) 
const CustomDatagridBody = props => (
  <DatagridBody {...props} row={<CustomDatagridRow />} />
);
const CustomDatagrid = props => (
  <Datagrid {...props} body={<CustomDatagridBody />} />
);

export const CommunityList = props => (
  <List {...props}>
    <CustomDatagrid />
  </List>
);


