// import React from "react";
// import {
//   Edit,
//   TextInput,
//   useTranslate,
//   Create,
//   ImageInput,
//   ImageField,
//   useNotify,
//   useRedirect,
//   useRefresh,
//   TabbedForm,
//   FormTab,
//   Datagrid,
//   TextField,
//   DateField,
//   ReferenceManyField,
//   NumberInput,
//   DateInput,
//   BooleanInput,
//   FileField,
//   FileInput,
//   SimpleFormIterator,
//   ArrayInput,
//   ReferenceArrayInput,
//   AutocompleteArrayInput,
//   ReferenceInput,
//   SelectInput,
// } from "react-admin";

// import { useFormState } from "react-final-form";
// import _ from "lodash";

// import { makeStyles } from "@material-ui/core/styles";
// import { RESOURCES } from "../../constants";

// const useStyles = makeStyles({
//   root: {
//     display: "flex",
//     alignItems: "center",
//     width: "40%",
//     justifyContent: "space-between",
//     flexWrap: "wrap",
//   },
//   numberInput: {
//     maxWidth: 256,
//     width: "100%",
//   },
//   refArrayInput: {
//     maxWidth: 256,
//   },
// });
// const CollectionInput = (props) => {
//   const { values } = useFormState();
//   const classes = useStyles();

//   if (values.artist_id) {
//     return (
//       <ReferenceArrayInput
//         label="ra.strings.select_collections"
//         source="collections"
//         reference={RESOURCES.ART_COLLECTIONS}
//         className={classes.refArrayInput}
//         perPage={1000}
//         filter={{ artist_id: values.artist_id }}
//         sort={{ field: "id", order: "DESC" }}
//       >
//         <AutocompleteArrayInput optionText="title" />
//       </ReferenceArrayInput>
//     );
//   }

//   return null;
// };

// export const EditArt = (props) => {
//   const classes = useStyles();
//   const translate = useTranslate();
//   const notify = useNotify();
//   const redirect = useRedirect();
//   const refresh = useRefresh();
//   const onFailure = (error) => {
//     console.log({ errrrrrrrrr: error });
//     //notify("ra.notification.http_error", { type: "warning" });
//     // notify("Title already exist", { type: "error" });
//     notify("Unable to update", "error");
//   };
//   return (
//     <Edit
//       onFailure={onFailure}
//       {...props}
//       title={translate("ra.strings.create_art")}
//     >
//       <TabbedForm validate={validateForm}>
//         <FormTab label="summary">
//           <TextInput source="title" />
//           <NumberInput source="price" />
//           <NumberInput source="max_quantity" />
//           <BooleanInput source="sellable" label="ra.strings.sellable" />
//           <ReferenceArrayInput
//             label="ra.strings.select_vibes"
//             source="vibes"
//             reference={RESOURCES.VIBES}
//             className={classes.refArrayInput}
//             perPage={1000}
//             filter={{ trim_title_length: 25 }}
//           >
//             <AutocompleteArrayInput optionText="title" />
//           </ReferenceArrayInput>
//           <ReferenceInput
//             label="ra.strings.select_artist"
//             source="artist_id"
//             reference={RESOURCES.USERS}
//             filter={{ is_artist: true }}
//           >
//             <SelectInput optionText="username" />
//           </ReferenceInput>
//           <CollectionInput />
//           <TextInput source="description" multiline={true} />
//         </FormTab>

//         <FormTab label="ra.strings.resources">
//           <FileInput
//             source="resources"
//             placeholder={<p>Drop Images And Videos here</p>}
//             multiple={true}
//             maxSize={25000000}
//           >
//             <FileField source="src" title="title" />
//           </FileInput>
//         </FormTab>
//         <FormTab label="ra.strings.sizes">
//           <ArrayInput source="sizes">
//             <SimpleFormIterator>
//               <TextInput source="size" label="ra.strings.size" />
//               <NumberInput source="price" label="ra.strings.price" />
//               <NumberInput source="quantity" label="ra.strings.quantity" />
//             </SimpleFormIterator>
//           </ArrayInput>
//         </FormTab>
//       </TabbedForm>
//     </Edit>
//   );
// };
// const validateForm = (values) => {
//   const errors = {};
//   // console.log({ sizes: values.sizes });
//   if (!values.title) {
//     errors.title = ["required"];
//   }
//   if (values.title && !values.title.replace(/\s/g, "").length) {
//     errors.title = ["Must be a valid title"];
//   }
//   if (!_.isUndefined(values.title) && values.title.length > 100) {
//     errors.title = ["Must be less than or equal to 100 characters"];
//   }

//   if (!_.isUndefined(values.resources)) {
//     if (!values.resources.length) {
//       errors.resources = ["required"];
//     } else if (values.resources.length > 5) {
//       errors.resources = ["Only 5 files are allowed"];
//     }
//   } else {
//     errors.resources = ["required"];
//   }

//   return errors;
// };

///////
import React, { useState } from "react";
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
  TabbedForm,
  FormTab,
  Datagrid,
  TextField,
  DateField,
  ReferenceManyField,
  NumberInput,
  DateInput,
  BooleanInput,
  FileField,
  FileInput,
  SimpleFormIterator,
  ArrayInput,
  ReferenceArrayInput,
  AutocompleteArrayInput,
  ReferenceInput,
  SelectInput,
  useGetList,
} from "react-admin";

import { useFormState } from "react-final-form";
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
  refArrayInput: {
    maxWidth: 256,
  },
});
const CollectionInput = (props) => {
  const { values } = useFormState();
  const classes = useStyles();

  // const { data } = useGetList(RESOURCES.ART_COLLECTIONS);
  // console.log({ dataInCollectionInput: data });
  if (values.artist_id) {
    // const projects = data.filter(
    //   ({ proartist_idject_id }) => project_id === projectId
    // );
    return (
      <ReferenceArrayInput
        label="ra.strings.select_collections"
        source="collection_ids"
        reference={RESOURCES.ART_COLLECTIONS}
        className={classes.refArrayInput}
        perPage={1000}
        filter={{ artist_id: values.artist_id }}
        sort={{ field: "id", order: "DESC" }}
        //allowEmpty={true}
      >
        <AutocompleteArrayInput
          optionText="title"
          emptyText="No collection found"
        />
      </ReferenceArrayInput>
    );
  }

  return null;
};

const SellableInputs = (props) => {
  const { values } = useFormState();
  const classes = useStyles();

  if (values.sellable == true) {
    return (
      <>
        <div className={classes.root}>
          <NumberInput source="price" className={classes.numberInput} />
        </div>
        <div className={classes.root}>
          <NumberInput source="max_quantity" className={classes.numberInput} />
        </div>
        <div className={classes.root}>
          <ArrayInput source="sizes">
            <SimpleFormIterator
            // onChange={(props) => {
            //   console.log("in onchange");
            //   let sizes = values.sizes || [];

            //   if (sizes.length) {
            //     values.max_quantity = _.sumBy(sizes, "quantity");
            //   }
            //   console.log({ valuesssss: values });
            // }}
            >
              <TextInput source="size" label="ra.strings.size" />
              <NumberInput source="price" label="ra.strings.price" />
              <NumberInput source="quantity" label="ra.strings.quantity" />
            </SimpleFormIterator>
          </ArrayInput>
        </div>
      </>
    );
  }
  return null;
};
const PriceInput = (props) => {
  const { values } = useFormState();
  const classes = useStyles();
  if (
    values.sellable == true &&
    (_.isUndefined(values.sizes) || values.sizes.length <= 0)
  ) {
    return <NumberInput source="price" className={classes.numberInput} />;
  }
  return null;
};
const MaxQuantityInput = (props) => {
  const { values } = useFormState();
  const classes = useStyles();
  if (values.sellable == true) {
    let sizes = values.sizes || [];
    let max_quantity = values.max_quantity;
    if (sizes.length) {
      values.max_quantity = _.sumBy(sizes, "quantity");
    }

    return max_quantity > 0 ? (
      <NumberInput
        source="max_quantity"
        defaultValue={max_quantity}
        // disabled={true}
        className={classes.numberInput}
      />
    ) : (
      <NumberInput source="max_quantity" className={classes.numberInput} />
    );

    // return (
    //   <NumberInput source="max_quantity" className={classes.numberInput} />
    // );
  }
  return null;
};

const SizeInput = (props) => {
  const { values } = useFormState();
  const classes = useStyles();
  // const sumQuantity = () => {
  //   let max_quantity = values.max_quantity;
  //   if (values.sellable == true) {
  //     let sizes = values.sizes || [];
  //     if (sizes.length) {
  //       values.max_quantity = _.sumBy(sizes, "quantity");
  //     }
  //   }
  //   console.log({ qnow: values.max_quantity });
  // };

  if (values.sellable == true) {
    return (
      <ArrayInput source="sizes">
        <SimpleFormIterator>
          <TextInput source="size" label="ra.strings.size" />
          <NumberInput source="price" label="ra.strings.price" />
          <NumberInput
            source="quantity"
            label="ra.strings.quantity"
            // onChange={() => {
            //   values.max_quantity = sumQuantity();
            // }}
          />
        </SimpleFormIterator>
      </ArrayInput>
    );
  }
  return null;
};

const VibesInput = (props)=>{
  console.log({resesjhjh:props.record.vibes,source:props.source})
  const record = {
    
  };
  record.source = "vibes"
  record[record.source] =  _.map(props.record.vibes,"id")
  const classes = useStyles();
  return  <ReferenceArrayInput
  label="ra.strings.select_vibes"
  source="vibe_ids"
 // record={record}
  reference={RESOURCES.VIBES}
  className={classes.refArrayInput}
  perPage={1000}
  filter={{ trim_title_length: 25 }}
>
  <AutocompleteArrayInput optionText="title" />
</ReferenceArrayInput>
}

export const EditArt = (props) => {
  const classes = useStyles();
  const translate = useTranslate();
  const notify = useNotify();
  const redirect = useRedirect();
  const refresh = useRefresh();
  const onSuccess = () => {
    notify(`Art updated successfully`);
    redirect(`/${RESOURCES.ARTS}`);
    refresh();
  };
  const onFailure = (error) => {
    console.log({ errrrrrrrrr: error });
    //notify("ra.notification.http_error", { type: "warning" });
    // notify("Title already exist", { type: "error" });
    notify("Unable to update", "error");
  };
  return (
    <Edit
      onFailure={onFailure}
      {...props}
      title={translate("ra.strings.create_art")}
      onSuccess={onSuccess}
      undoable={false}
    >
      <TabbedForm validate={validateForm} >
        <FormTab label="summary">
          <TextInput source="title" />
          <TextInput source="description" multiline={true} />
         <VibesInput />
          <ReferenceInput
            label="ra.strings.select_artist"
            source="artist_id"
            reference={RESOURCES.USERS}
            filter={{ is_artist: true }}
          >
            <SelectInput optionText="username" />
          </ReferenceInput>
          <CollectionInput />
          <BooleanInput source="sellable" label="ra.strings.sellable" />
          {/* <SellableInputs /> */}
          <PriceInput />
          <MaxQuantityInput />
          <SizeInput />
        </FormTab>

        <FormTab label="ra.strings.resources">
          <FileInput
            source="resources"
            placeholder={<p>Drop Images And Videos here</p>}
            multiple={true}
            maxSize={25000000}
          >
            <FileField source="uri" title="uri" />
          </FileInput>
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};
const validateForm = (values) => {
  const errors = {};
  // console.log({ sizes: values.sizes });
  if (!values.title) {
    errors.title = ["Required"];
  }
  if (values.title && !values.title.replace(/\s/g, "").length) {
    errors.title = ["Must be a valid title"];
  }
  if (!_.isUndefined(values.title) && values.title.length > 100) {
    errors.title = ["Must be less than or equal to 100 characters"];
  }
  if (_.isUndefined(values.vibes) || values.vibes.length <= 0) {
    errors.vibes = ["Required"];
  }

  if (!values.artist_id) {
    errors.artist_id = ["Required"];
  }
  if (!_.isUndefined(values.resources)) {
    if (!values.resources.length) {
      errors.resources = ["required"];
    } else if (values.resources.length > 5) {
      errors.resources = ["Only 5 files are allowed"];
    }
  } else {
    errors.resources = ["Required"];
  }
  if (values.sellable == true) {
    errors.sizes = [];
    if (
      !_.isUndefined(values.sizes) &&
      _.isArray(values.sizes) &&
      values.sizes.length
    ) {
      for (let i = 0; i < values.sizes.length; i++) {
        errors.sizes[i] = {};
        if (_.isUndefined(values.sizes[i])) {
          errors.sizes[i].size = ["Required"];
          errors.sizes[i].price = ["Required"];
          errors.sizes[i].quantity = ["Required"];
        } else {
          if (!values.sizes[i].size) {
            errors.sizes[i].size = ["Required"];
          }
          if (!values.sizes[i].price) {
            errors.sizes[i].price = ["Required"];
          }
          if (!values.sizes[i].quantity) {
            errors.sizes[i].quantity = ["Required"];
          }
        }
      }
    } else {
      if (!values.price) {
        errors.price = ["Required"];
      }
      if (!values.max_quantity) {
        errors.max_quantity = ["Required"];
      }
    }
  }

  return errors;
};
