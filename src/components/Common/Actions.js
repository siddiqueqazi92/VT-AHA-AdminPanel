import * as React from "react";
import { cloneElement } from "react";
import {
  List,
  Button,
  TopToolbar,
  CreateButton,
  ExportButton,
} from "react-admin";
export const MyListActions = (props) => (
  <TopToolbar>
    {cloneElement(props.filters, { context: "button" })}
    <CreateButton />
    <ExportButton />
    {/* Add your custom actions */}
  </TopToolbar>
);
