import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  required,
  useTranslate,
} from "react-admin";

import RichTextInput from "ra-input-rich-text";
import _ from "lodash";
import { EditToolbarNoDeleteButton } from "../Common/Toolbars";
const configureQuill = (quill) =>
  quill.getModule("toolbar").addHandler("bold", function (value) {
    this.quill.format("bold", value);
  });

export const EditScreenContent = (props) => {
  const translate = useTranslate();

  return (
    <Edit
      {...props}
      title={
        translate("ra.strings.screen_content") +
        ` #${!_.isUndefined(props.id) ? props.id : ""}`
      }
    >
      <SimpleForm toolbar={<EditToolbarNoDeleteButton />}>
        <TextInput disabled source="id" />
        <TextInput disabled source="display_name" label="ra.strings.name" />

        <RichTextInput source="en" label="Content(EN)" />
        <RichTextInput
          source="ar"
          label="Content(AR)"
          configureQuill={configureQuill}
        />
      </SimpleForm>
    </Edit>
  );
};
const validateType = required();
const validateVendor = required();
const validateRequired = required();
