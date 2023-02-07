import * as React from "react";
import {
	Show,
	TextField,
	TabbedShowLayout,
	Tab,
	ImageField,
	ShowController,
	useTranslate,
	ReferenceManyField,
	Datagrid,
	BooleanField,
	Pagination,
  NumberField,
  DateField,
  EditButton,
  TopToolbar,
  DeleteButton,
  ArrayField,
  SingleFieldList,
  ChipField,
  ReferenceField,
} from "react-admin";
import { LANGUAGE, RESOURCES } from "../../constants";
import { DateFieldLabeled } from "../Common/Fields";
import UserLinkField from "../Common/Fields/UserLinkField";
import _ from "lodash";
const PostShowActions = ({ basePath, data, resource }) => (
    <TopToolbar>
     
    </TopToolbar>
);
export const ShowArtCollection = (props) => {
	const translate = useTranslate();
	return (
		<ShowController {...props}>
			{(controllerProps) => (
				<Show
				actions={<PostShowActions />}
					{...props}
					{...controllerProps}
					// title={
					//   translate("ra.strings.delivery_vehicle") + " #"
					//   //   !_.isUndefined(controllerProps.record) &&
					//   // !_.isUndefined(controllerProps.record.id)
					//   //   ? controllerProps.record.id
					//   //   : ""
					// }
				>
					<TabbedShowLayout>
						<Tab label="ra.strings.detail">
							<TextField source="id" label="ra.strings.id" />
							<TextField source="title" label="ra.strings.title" />
							<TextField source="artist.username" label="ra.strings.artist" />          

							{controllerProps.record && controllerProps.record.image && (
								<ImageField source="image" label="ra.strings.image" />
							)}
							{/* <BooleanField source="is_public" label="ra.strings.is_public" sortable={false} /> */}
							<TextField source="privacy" label="ra.strings.privacy" sortable={false} />
							{controllerProps.record &&
							controllerProps.record.vibes &&
							controllerProps.record.vibes.length && (
							<ArrayField label="ra.strings.vibes" source="vibes">
								<SingleFieldList>
								<ChipField source="title" />
								</SingleFieldList>
							</ArrayField>
							)}
							<DateFieldLabeled
								source="createdAt"
								label="ra.strings.created_at"
							/>
						</Tab>
						
						{controllerProps.record && controllerProps.record.art_count && (
							<Tab label="ra.strings.arts">
								<ReferenceManyField
									addLabel={false}
									reference={RESOURCES.ARTS}
									target="art_collection_id"
									sort={{ field: "createdAt", order: "DESC" }}
									pagination={<Pagination />}
									perPage={10}
								>
									<Datagrid rowClick="show">
										<TextField source="id" label="ra.strings.id" />
										
										<ReferenceField label="ra.strings.artist" source="artist.user_id" reference={RESOURCES.ARTISTS} link="show" sortable={false}>            
										<UserLinkField />
										</ReferenceField>
										<TextField source="title" label="ra.strings.title" />
										<NumberField
											source="max_quantity"
											label="ra.strings.max_quantity"
										/>
										<BooleanField
											source="sellable"
											label="ra.strings.sellable"
										/>
										<TextField source="pinned_count" label="ra.strings.pinned_count" sortable={false} />
										<DateField
											source="createdAt"
											label="ra.strings.created_at"
										/>
										<EditButton />
										<DeleteButton undoable={false} />
									</Datagrid>
								</ReferenceManyField>
							</Tab>
						)}
					</TabbedShowLayout>
				</Show>
			)}
		</ShowController>
	);
};
