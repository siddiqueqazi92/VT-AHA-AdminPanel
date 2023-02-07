import * as React from "react";
import { List, Datagrid, TextField } from "react-admin";
import UserLinkField from "../Common/Fields/UserLinkField";

export const WalletList = (props) => (
  <div>
    <List {...props} bulkActionButtons={false} title="ra.strings.wallets">
      <Datagrid>
        <UserLinkField label="ra.strings.user" />
        <TextField source="wallet" label="ra.strings.wallet" />
        <TextField source="country" label="ra.strings.country" />
        <TextField source="currency" label="ra.strings.currency" />
      </Datagrid>
    </List>
  </div>
);
