import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  required,
  regex,
  email,
  ReferenceArrayInput,
  AutocompleteArrayInput,
  BooleanInput,
  ImageInput,
  SelectInput,
  useTranslate,
} from "react-admin";
import PhoneInput from "react-phone-input-2";
import { Field } from "react-final-form";
import "react-phone-input-2/lib/bootstrap.css";
import { makeStyles } from "@material-ui/core/styles";
import { RESOURCES, CountryList } from "../../constants";
import { useFormState } from "react-final-form";
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
const ArtistInputs = (props) => {
  const record = props.record;
  const { values } = useFormState();
  const classes = useStyles();
  const is_artist = values.is_artist;

  return (
    is_artist == true && (
      <>
        <span className={classes.label}>Address</span>
        <div className={classes.root}>
          <TextInput
            className={classes.numberInput}
            source="address.city"
            validate={validateName}
          />
        </div>
        <div className={classes.root}>
          <TextInput
            className={classes.numberInput}
            source="address.state"
            validate={validateName}
          />
        </div>
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
        <span className={classes.label}>Social Links</span>
        <div className={classes.root}>
          <TextInput
            className={classes.numberInput}
            source="facebook"
            validate={validateName}
          />
        </div>
        <div className={classes.root}>
          <TextInput
            className={classes.numberInput}
            source="instagram"
            validate={validateName}
          />
        </div>
        <div className={classes.root}>
          <TextInput
            className={classes.numberInput}
            source="tiktok"
            validate={validateName}
          />
        </div>
        <div className={classes.root}>
          <TextInput
            className={classes.numberInput}
            source="dribble"
            validate={validateName}
          />
        </div>
        <div className={classes.root}>
          <ImageInput
            source="cover_image"
            label="Upload Cover Image"
            accept="image/*"
          >
            <PreviewImage source="cover_image" />
          </ImageInput>
        </div>
        <div className={classes.root}>
          <ImageInput
            source="profile_image"
            label="Upload Profile Image"
            accept="image/*"
          >
            <PreviewImage source="profile_image" />
          </ImageInput>
        </div>
      </>
    )
  );
};
const ContactInput = (props) => {
  const classes = useStyles();
  const translate = useTranslate();
  return (
    <div className={classes.root}>
      <Field
        name="contact"
        render={({ input, meta }) => {
          console.log({ recordInPhone: props.record });
          return (
            <div>
              {meta.touched && meta.error && <span>{meta.error}</span>}

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
                  if (value.match(/12345/)) {
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
                //value={input.data}
                value={props.record.contact}
              />
            </div>
          );
        }}
      />
    </div>
  );
};
export const EditUser = (props) => {
  const classes = useStyles();
  console.log({ propsInEditUser: props });
  return (
    <Edit {...props}>
      <SimpleForm redirect="list">
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
            source="username"
            validate={validateUsername}
          />
        </div>
        <ContactInput />
        <div className={classes.root}>
          <ReferenceArrayInput
            label="ra.strings.select_vibes"
            source="vibes"
            reference={RESOURCES.VIBES}
            allowEmpty
            className={classes.boxWidth}
          >
            <AutocompleteArrayInput optionText="title" />
          </ReferenceArrayInput>
        </div>
        <div className={classes.root}>
          <ReferenceArrayInput
            label="ra.strings.select_interests"
            source="interests"
            reference={RESOURCES.INTERESTS}
            allowEmpty
            className={classes.boxWidth}
          >
            <AutocompleteArrayInput optionText="title" />
          </ReferenceArrayInput>
        </div>
        <div className={classes.root}>
          <ReferenceArrayInput
            label="ra.strings.select_communities"
            source="communities"
            reference={RESOURCES.COMMUNITIES}
            allowEmpty
            className={classes.boxWidth}
          >
            <AutocompleteArrayInput optionText="profile_name" />
          </ReferenceArrayInput>
        </div>
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
  required(),
  regex(/^[a-zA-Z ]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i, "Must be a valid name"),
];
const validateUsername = [
  required(),
  regex(/^[a-zA-Z0-9.]+$/i, "Must be a valid username"),
];
const validateUserEmail = [required(), email()];
const validatePassword = required();
