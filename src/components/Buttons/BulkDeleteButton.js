// in ./BulkDeleteButton.js
import * as React from "react";
import { Fragment, useState } from "react";
import {
  Button,
  Confirm,
  useDeleteMany,
  useRefresh,
  useNotify,
  useUnselectAll,
} from "react-admin";

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

const BulkDeleteButton = ({ selectedIds, resource_name }) => {
  //console.log({ selectedIds: selectedIds, data: resource_name });
  const [open, setOpen] = useState(false);
  const refresh = useRefresh();
  const notify = useNotify();
  const unselectAll = useUnselectAll();
  const [deleteMany, { loading }] = useDeleteMany(resource_name, selectedIds, {
    onSuccess: () => {
      refresh();
      notify(`${resource_name.capitalize()} deleted`);
      unselectAll(resource_name);
    },
    onFailure: (error) => {
      notify(`Error: ${resource_name} not deleted. ${error}`, "warning");
    },
  });

  const handleClick = () => setOpen(true);
  const handleDialogClose = () => setOpen(false);

  const handleConfirm = () => {
    deleteMany();
    setOpen(false);
  };

  return (
    <Fragment>
      <Button label="ra.action.delete" onClick={handleClick} />
      <Confirm
        isOpen={open}
        loading={loading}
        title={`Delete ${resource_name.capitalize()}`}
        content="Are you sure you want to delete these items?"
        onConfirm={handleConfirm}
        onClose={handleDialogClose}
      />
    </Fragment>
  );
};

export default BulkDeleteButton;
