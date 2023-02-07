import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  useTranslate,
  ImageInput,
  ImageField,
  useNotify,
  useRedirect,
  useRefresh,
} from "react-admin";

import _ from "lodash";

import { makeStyles } from "@material-ui/core/styles";
import { PreviewImage } from "../Common/Fields";
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

export const EditVibe = (props) => {
  const classes = useStyles();
  const translate = useTranslate();

  const notify = useNotify();
  const redirect = useRedirect();
  const refresh = useRefresh();
  const onSuccess = () => {
    notify(`Vibe updated successfully`);
    redirect(`/${RESOURCES.VIBES}`);
    refresh();
  };
  const onFailure = (error) => {
    console.log({ errrrrrrrrr: error });
    notify("Title already exist", "error");
    redirect("/vibes");
    refresh();
  };

  return (
    <Edit
      onSuccess={onSuccess}
      onFailure={onFailure}
      undoable={false}
      {...props}
      //title={`Create ` + translate("ra.strings.c")}
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
          <ImageInput source="image" label="Upload Image" accept="image/*">
            <PreviewImage source="image" />
          </ImageInput>
        </div>
      </SimpleForm>
    </Edit>
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
