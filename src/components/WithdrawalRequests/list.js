import * as React from "react";
import { List, Datagrid, TextField, NumberField, ChipField } from "react-admin";
import UserLinkField from "../Common/Fields/UserLinkField";
import { TransferButtons } from "./Fields/TransferButtons";
import TransferPaymentButton from "./Fields/TransferPaymentButton";
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  draft: { backgroundColor: '4BB543' },
  transferred: { backgroundColor: '#4BB543' },
});

const ColoredChipField = props => {
  const classes = useStyles();

  const className = v => v.toUpperCase() === 'TRANSFERRED';

  return (
    <ChipField
      className='draft'
      {...props} 
    />
  );
};


export const WithdrawalRequestList = (props) => (
  <div>
    <List {...props} bulkActionButtons={false} title="ra.strings.withdrawal_requests">
      <Datagrid>
        <UserLinkField label="ra.strings.user" />
        <TextField source="stripe_account_id" label="ra.strings.stripe_account_id"  />
        <NumberField source="available_amount" label="ra.strings.available_amount" options={{ style: 'currency', currency: 'USD' }} />
        {/* <TextField source="status" label="ra.strings.status" /> */}
        <ColoredChipField source="status" />
        <TransferButtons />
      </Datagrid>
    </List>
  </div>
);
