import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  PasswordInput,
  required,
  regex,
  email,
  ReferenceArrayInput,
  AutocompleteArrayInput,
  BooleanInput,
  ImageInput,
  ImageField,
  useTranslate,
  SelectInput,
  Labeled,
  TextField,
  useNotify,
  useRefresh,
  useRedirect,
  Toolbar,
  SaveButton,
} from "react-admin";
import PhoneInput from "react-phone-input-2";
import { Field } from "react-final-form";
import "react-phone-input-2/lib/bootstrap.css";
import { makeStyles } from "@material-ui/core/styles";
import { RESOURCES, CountryList } from "../../constants";
import { useFormState } from "react-final-form";
import { isValidUrl } from "../../util";
import _ from "lodash";
import { PreviewImage } from "../Common/Fields";

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
  boxWidth: {
    width: "256px",
  },
  label: {
    color: "rgba(0, 0, 0, 0.54)",
    padding: 0,
    "font-size": "1rem",
    "font-weight": 400,
    "line-height": 1,
    "letter-spacing": "0.00938em",
  },
});
const AHAPhoneInput = (props) => {
  const classes = useStyles();
  const translate = useTranslate();

  return (
    <div className={classes.root}>
      <Field
        name="contact"
        render={({ input, meta }) => {
          return (
            <div style={{ position: "relative" }}>
              {meta.touched && meta.error && (
                <span
                  style={{
                    display: "block",
                    position: "absolute",
                    bottom: "-7px",
                    background: "transparent",
                    top: "auto",
                    height: 20,
                    left: 10,
                    color: "#f44336",
                    fontSize: 12,
                  }}
                >
                  {meta.error}
                </span>
              )}

              <PhoneInput
                containerStyle={{
                  marginBottom: 20,
                }}
                inputStyle={{
                  borderTop: "none",
                  background: "#f5f5f5",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: "1px solid #0000006b",
                  borderRadius: 0,
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                  width: 256,
                }}
                source="contact"
                placeholder={translate("ra.strings.phone_no")}
                inputProps={{
                  name: "contact",
                  required: true,
                  autoFocus: true,
                }}
                isValid={(value, country) => {
                  if (!value) {
                    //return "Required";
                  } else if (value.match(/12345/)) {
                    return "Invalid value: " + value + ", " + country.name;
                  } else if (value.match(/1234/)) {
                    return false;
                  } else {
                    return true;
                  }
                }}
                onChange={(value, data) => {
                  input.onChange({ phone: value, ...data });
                }}
                value={props.record.contact}
              />
            </div>
          );
        }}
      />
    </div>
  );
};
const ArtistInputs = (props) => {
  const { values } = useFormState();
  const classes = useStyles();
  const redirect = useRedirect()
  if (props.record.login_type != 'simple') {
    redirect(`/${props.resource}`);
  }
  const is_artist = values.is_artist;
  return (
    is_artist == true && (
      <>
        <div className={classes.root}>
          <ImageInput
            source="cover_image"
            label="ra.strings.cover_image"
            accept="image/*"
          >
            <PreviewImage source="cover_image" />
          </ImageInput>
        </div>
        <span className={classes.label}>Address</span>
        <div className={classes.root}>
          <SelectInput
            className={classes.numberInput}
            source="address.country"
            label="ra.strings.country"
            choices={CountryList}
            optionText="name"
            optionValue="name"
          />
        </div>

        <div className={classes.root}>
          <TextInput
            className={classes.numberInput}
            source="address.state"
            label="ra.strings.state"
            validate={validateName}
          />
        </div>
        <div className={classes.root}>
          <TextInput
            className={classes.numberInput}
            source="address.city"
            label="ra.strings.city"
            validate={validateName}
          />
        </div>

        <span className={classes.label}>Social Links</span>
        <div className={classes.root}>
          <TextInput
            className={classes.numberInput}
            source="facebook"
            validate={validateUrl}
          />
        </div>
        <div className={classes.root}>
          <TextInput
            className={classes.numberInput}
            source="instagram"
            validate={validateUrl}
          />
        </div>
        <div className={classes.root}>
          <TextInput
            className={classes.numberInput}
            source="tiktok"
            validate={validateUrl}
          />
        </div>
        <div className={classes.root}>
          <TextInput
            className={classes.numberInput}
            source="dribble"
            validate={validateUrl}
          />
        </div>
      </>
    )
  );
};

const UserEditToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);
export const EditUser = (props) => {
  const redirect = useRedirect()

  const classes = useStyles();
  const translate = useTranslate();
  const notify = useNotify();  
  const refresh = useRefresh();
  const onSuccess = () => {
    notify(`Artist updated successfully`);
    redirect(`/${RESOURCES.ARTISTS}`);
    refresh();
  };
  const onFailure = (error) => {
    notify("Either Username,Phone number or Email already taken", "error");
    // redirect("/interests");
    // refresh();
  };
  // const PageTitle = ({ record }) => {
  //   // return <span>Edit User {record ? `"${record.username}"` : ""}</span>;
  //   return <span>Edit User </span>;
  // };
  return (
    <Edit
      onFailure={onFailure}
      onSuccess={onSuccess}
      undoable={false}
      {...props}
      // title={translate("ra.strings.edit_user") //+
      // ` #${!_.isUndefined(props.username) ? props.username : ""}`}
      title={`Edit Artist`}
      // title={PageTitle}
    >
      <SimpleForm
        redirect="list"
        validate={validateForm}
        toolbar={<UserEditToolbar />}
      >
        <div className={classes.root}>
          <ImageInput
            source="profile_image"
            label="ra.strings.profile_image"
            accept="image/*"
          >
            <PreviewImage source="profile_image" />
          </ImageInput>
        </div>
        <div className={classes.root}>
          <TextInput
            className={classes.numberInput}
            source="username"
            validate={validateUsername}
          />
        </div>

        <AHAPhoneInput />
        <div className={classes.root}>
          <TextInput
            className={classes.numberInput}
            source="name"
            validate={validateName}
          />
        </div>
        <div className={classes.root}>
          <TextInput
            className={classes.numberInput}
            source="bio"
            multiline={true}
          />
        </div>
        <div className={classes.root}>
          <TextInput
            className={classes.numberInput}
            source="email"
            type="email"
            validate={validateEmail}
          />
        </div>
        <div className={classes.root}>
          <ReferenceArrayInput
            label="ra.strings.select_vibes"
            source="vibes"
            reference={RESOURCES.VIBES}
            className={classes.boxWidth}
            perPage={1000}
            filter={{ trim_title_length: 25 }}
          >
            <AutocompleteArrayInput optionText="title" />
          </ReferenceArrayInput>
        </div>
        <div className={classes.root}>
          <ReferenceArrayInput
            label="ra.strings.select_interests"
            source="interests"
            reference={RESOURCES.INTERESTS}
            className={classes.boxWidth}
            perPage={1000}
            filter={{ trim_title_length: 25 }}
          >
            <AutocompleteArrayInput optionText="title" />
          </ReferenceArrayInput>
        </div>
        {/* <div className={classes.root}>
          <ReferenceArrayInput
            label="ra.strings.select_communities"
            source="communities"
            reference={RESOURCES.COMMUNITIES}
            allowEmpty
            className={classes.boxWidth}
          >
            <AutocompleteArrayInput optionText="profile_name" />
          </ReferenceArrayInput>
        </div> */}
        <div className={classes.root}>
          <BooleanInput source="is_artist" />
        </div>
        <ArtistInputs />

        {/* <PasswordInput source="password" validate={validatePassword} /> */}
      </SimpleForm>
    </Edit>
  );
};

//validation
const validateName = [
  //required(),
  regex(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i, "Must be a valid name"),
];
const validateUsername = [
  required(),
  regex(/^\S*$/i, "Must be a valid username"),
];
const validateUrl = [
  regex(
    new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ),
    "Must be a valid url"
    //required(),
  ),
];
const validateEmail = [email()];

const validateForm = (values) => {
  const errors = {};
  console.log({ values });
  if (!values.profile_image) {
    errors.profile_image = ["Required"];
  }
  if (
    !values.contact ||
    (_.isObject(values.contact) && !values.contact.phone)
  ) {
    errors.contact = ["Required"];
  }
  if (values.is_artist == true) {
    if (!values.cover_image) {
      errors.cover_image = ["Required"];
    }
    errors.address = {};
    if (_.isUndefined(values.address)) {
      errors.address.city = ["Required"];
      errors.address.state = ["Required"];
      errors.address.country = ["Required"];
    } else {
      if (!values.address.city) {
        errors.address.city = ["Required"];
      }
      if (!values.address.state) {
        errors.address.state = ["Required"];
      }
      if (!values.address.country) {
        errors.address.country = ["Required"];
      }
    }
  }
  return errors;
};
