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
	SelectArrayInput,
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

	
	const { data, ids, loading, error } = useGetList(
		RESOURCES.ART_COLLECTIONS,
		{ page: 1, perPage: 1 },
		{ field: 'id', order: 'DESC' },
		{artist_id:values.artist_id}
	);	

	if (values.artist_id && ids.length) {
		return (
			<ReferenceArrayInput
				label="ra.strings.select_collections"
				source="collections"
				reference={RESOURCES.ART_COLLECTIONS}
				className={classes.refArrayInput}
				perPage={1000}
				filter={{ artist_id: values.artist_id }}
				sort={{ field: "id", order: "DESC" }}				
			>				
				<AutocompleteArrayInput
					optionText="title"					
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
const ArtistInput = (props) => {
	const { values } = useFormState();
	const classes = useStyles();	
	if (_.isUndefined(values.post_in_community) || values.post_in_community == false) {
		return (
			<ReferenceInput
				label="ra.strings.select_artist"
				source="artist_id"
				reference={RESOURCES.USERS}
				filter={{ is_artist: true }}
			>
				<SelectInput optionText="username" />
			</ReferenceInput>
		);
	}
	return null;
};

export const CreateArt = (props) => {
	const classes = useStyles();
	const translate = useTranslate();
	const notify = useNotify();
	const redirect = useRedirect();
	const refresh = useRefresh();
	const onFailure = (error) => {
		console.log({ errrrrrrrrr: error });
		//notify("ra.notification.http_error", { type: "warning" });
		// notify("Title already exist", { type: "error" });
		notify("Unable to create", "error");
	};
	return (
		<Create
			onFailure={onFailure}
			{...props}
			title={translate("ra.strings.create_art")}
		>
			<TabbedForm validate={validateForm} redirect="list">
				<FormTab label="summary">
					<TextInput source="title" />
					<TextInput source="description" multiline={true} />
					<ReferenceArrayInput
						label="ra.strings.select_vibes"
						source="vibes"
						reference={RESOURCES.VIBES}
						className={classes.refArrayInput}
						perPage={1000}
						filter={{ trim_title_length: 25 }}
					>
						<AutocompleteArrayInput optionText="title" />
					</ReferenceArrayInput>
					<BooleanInput
						source="post_in_community"
						label="ra.strings.post_in_community"
					/>
					<ArtistInput />
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
						<FileField source="src" title="title" />
					</FileInput>
				</FormTab>
			</TabbedForm>
		</Create>
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
	if (values.description) {
		if (!values.description.replace(/\s/g, "").length) {
			errors.description = ["Must be a valid decription"];
		}
		if (values.description.length > 100) {
			errors.description = ["Must be less than or equal to 100 characters"];
		}
	}
	if (!_.isUndefined(values.title) && values.title.length > 50) {
		errors.title = ["Must be less than or equal to 50 characters"];
	}
	if (_.isUndefined(values.vibes) || values.vibes.length <= 0) {
		errors.vibes = ["Required"];
	}

	if (!values.post_in_community && !values.artist_id) {
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
					let size = values.sizes[i].size;
					let price = values.sizes[i].price;
					let quantity = values.sizes[i].quantity;
					if (!size) {
						errors.sizes[i].size = ["Required"];
					} else {
						if (!size.replace(/\s/g, "").length) {
							errors.sizes[i].size = ["Must be a valid size"];
						}
						if (size.length > 30) {
							errors.sizes[i].size = [
								"Must be less than or equal to 30 characters",
							];
						}
					}
					if (!price) {
						errors.sizes[i].price = ["Required"];
					} else {
						if (!isValidNumber(price)) {
							errors.sizes[i].price = ["Must be a valid price"];
						}
					}
					if (!quantity) {
						errors.sizes[i].quantity = ["Required"];
					} else {
						if (!isValidNumber(quantity)) {
							errors.sizes[i].quantity = ["Must be a valid quantity"];
						}
					}
				}
			}
		} else {
			if (!values.price) {
				errors.price = ["Required"];
			} else {
				if (!isValidNumber(values.price)) {
					errors.price = ["Must be a valid price"];
				}
			}
			if (!values.max_quantity) {
				errors.max_quantity = ["Required"];
			}
		}
	}

	return errors;
};

function isValidNumber(value) {
	var pattern = new RegExp("^d+(?:[.,]d+)*$", "i");
	return !pattern.test(value);
}
