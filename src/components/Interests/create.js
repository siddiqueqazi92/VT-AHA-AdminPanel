import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  useTranslate,
  Create,
  ImageInput,
  ImageField,
  useNotify,
  useRedirect,
  useRefresh,
} from "react-admin";

import _ from "lodash";

import { makeStyles } from "@material-ui/core/styles";
import { RESOURCES } from "../../constants";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    width: "40%",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  numberInput: {
    maxWidth: 256,
    width: "100%",
  },
});
export const CreateInterest = (props) => {
  const classes = useStyles();
  const translate = useTranslate();

  const notify = useNotify();
  const redirect = useRedirect();
  const refresh = useRefresh();
  const onFailure = (error) => {
    console.log({ errrrrrrrrr: error });
    //notify("ra.notification.http_error", { type: "warning" });
    // notify("Title already exist", { type: "error" });
    notify("Title already exist", "error");
  };
  return (
    <Create
      {...props}
      onFailure={onFailure}
      title={translate("ra.strings.create_interest")}
    >
      <SimpleForm validate={validate} redirect="list">
        <div className={classes.root}>
          <TextInput
            className={classes.numberInput}
            source="title"
            label="ra.strings.title"
            //validate={validateSlot}
            //validate={[regex(/^[0-9]+$/,'number ']}
          />
        </div>

        <div className={classes.root}>
          <ImageInput source="image" label="ra.strings.image" accept="image/*">
            <ImageField source="src" title="title" />
          </ImageInput>
        </div>
      </SimpleForm>
    </Create>
  );
};
const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = ["required"];
  }
  if (values.title && !values.title.replace(/\s/g, "").length) {
    errors.title = ["Must be a valid title"];
  }
  if (!_.isUndefined(values.title) && values.title.length > 100) {
    errors.title = ["Must be less than or equal to 100 characters"];
  }

  if (!values.image) {
    errors.image = ["required"];
  }

  return errors;
};
