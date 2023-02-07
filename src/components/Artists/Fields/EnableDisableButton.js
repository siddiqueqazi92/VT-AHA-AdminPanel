import { useNotify, useRefresh } from "react-admin";
import EnableButton from "./EnableButton";
import DisableButton from "./DisableButton";

export const EnableDisableButton = (props) => {
  // console.log({ propsInActivateDeactivate: props });
  const notify = useNotify();
  const showAlert = (msg, type = "success") => {
    notify(msg, type);
  };

  const refresh = useRefresh();
  const show = props.record.is_active;

  return show == false ? (
    <EnableButton showNotification={showAlert} {...props} refresh={refresh} />
  ) : (
    <DisableButton showNotification={showAlert} {...props} refresh={refresh} />
  );
};
