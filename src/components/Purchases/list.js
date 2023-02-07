import React from "react";
import {
	Datagrid,
	DeleteButton,
	EditButton,
	List,
	DateField,
	TextField,
	Filter,
	SearchInput,
	ChipField,
	ImageField,
	NumberField,
	BooleanField,
	ReferenceField,
	FileField,
} from "react-admin";

import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { LANGUAGE, RESOURCES } from "../../constants";
import BulkDeleteButton from "../Buttons/BulkDeleteButton";
import { MyListActions } from "../Common/Actions";
import {
	DateFieldCustom,
	DateFieldLabeled,
	TimeFieldLabeled,
} from "../Common/Fields";
import UserLinkField from "../Common/Fields/UserLinkField";

export const PurchaseList = (props) => {
	return (
		<div>
			<List
				{...props}
				filters={<CategoryFilter />}
				// bulkActionButtons={
				//   <BulkDeleteButton resource_name={RESOURCES.DELIVERY_VEHICLES} />
				// }
				bulkActionButtons={false}
				title="ra.strings.arts"
				// actions={MyListActions}
			>
				<Datagrid>
					<TextField source="id" label="ra.strings.id" />
					<TextField source="title" label="ra.strings.art_title" />
					{/* <ReferenceField
						label="ra.strings.art_title"
						source="art_id"
						reference={RESOURCES.ARTS}
						link="show"
						sortable={false}
					>
						<UserLinkField />
					</ReferenceField> */}
					<ReferenceField
						label="Artist"
						source="artist.user_id"
						reference={RESOURCES.ARTISTS}
						link="show"
						sortable={false}
					>
						<UserLinkField />
					</ReferenceField>
					<ReferenceField
						label="ra.strings.user"
						source="user.user_id"
						reference={RESOURCES.USERS}
						link="show"
						sortable={false}
					>
						<UserLinkField />
					</ReferenceField>

					<NumberField source="quantity" label="ra.strings.quantity" />
					<TextField source="size" label="ra.strings.size" />
					<NumberField
						source="total_amount"
						label="ra.strings.total"
						options={{ style: "currency", currency: "USD" }}
					/>
					<NumberField
						source="shipment_charges"
						label="ra.strings.shipment_charges"
						options={{ style: "currency", currency: "USD" }}
					/>
					<TextField source="status" label="ra.strings.status" />
					<DateField
						source="order.createdAt"
						label="ra.strings.placed_at"
						showTime
					/>

					<FileField
						source="tracking_url"
						label=""
						title="Track"
						target="_blank"
						onClick={(e) => {
							e.stopPropagation();
						}}
					/>
					<FileField
						source="shippo_label_url"
						label=""
						title="Download Label"
						target="_blank"
						onClick={(e) => {
							e.stopPropagation();
						}}
					/>
				</Datagrid>
			</List>
		</div>
	);
};

//categorylist filter

const CategoryFilter = (props) => {
	return (
		<Filter {...props}>
			<SearchInput source="q" alwaysOn />
			{/* <TextInput source="name" defaultValue="Qui tempore rerum et voluptates" /> */}
			{/* <DateInput label="Created At" source="createdAt" defaultValue /> */}
		</Filter>
	);
};

// const QuickFilter = ({ label }) => {
//   const translate = useTranslate();
//   const classes = useQuickFilterStyles();
//   return <Chip className={classes.chip} label={translate(label)} />;
// };
