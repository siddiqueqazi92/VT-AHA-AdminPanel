import { ChipField, useNotify, useRefresh } from "react-admin";
import RejectRequestButton from "./RejectRequestButton";

import TransferPaymentButton from "./TransferPaymentButton";

export const TransferButtons = (props) => {
  // console.log({ propsInActivateDeactivate: props });
  const notify = useNotify();
  const showAlert = (msg, type = "success") => {
    notify(msg, type);
  };

  const refresh = useRefresh();
  const status = props.record.status.toLowerCase();

  return status == 'pending' ? (
    <>
    <TransferPaymentButton showNotification={showAlert} {...props} refresh={refresh} /> |
      <RejectRequestButton showNotification={showAlert} {...props} refresh={refresh} />
      </>
  ) : (
    <TransferPaymentButton showNotification={showAlert} {...props} refresh={refresh} />
  );

 
};
