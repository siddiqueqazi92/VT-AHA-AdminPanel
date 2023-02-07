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
  ReferenceField,
  FunctionField,
} from "react-admin";
import { LANGUAGE, RESOURCES } from "../../constants";
import { DateFieldLabeled } from "../Common/Fields";
import UserLinkField from "../Common/Fields/UserLinkField";
import _ from "lodash";
import { EnableDisableButton } from "../Users/Fields/EnableDisableButton";
const PostShowActions = ({ basePath, data, resource }) => (
    <TopToolbar>
     
    </TopToolbar>
);
export const ShowCommunity = (props) => {
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
							<TextField source="name" label="ra.strings.name" />

							{controllerProps.record && controllerProps.record.image && (
								<ImageField source="image" label="ra.strings.image" />
							)}

							<DateFieldLabeled
								source="createdAt"
								label="ra.strings.created_at"
							/>
						</Tab>
						{controllerProps.record && controllerProps.record.follower_count && (
							<Tab label={`${translate('ra.strings.followers')} (${ controllerProps.record.follower_count})`}>
								<ReferenceManyField
									addLabel={false}
									reference={RESOURCES.USERS}
									target="community_id"
									sort={{ field: "createdAt", order: "ASC" }}
									pagination={<Pagination />}
									perPage={10}
								>
									<Datagrid rowClick="show">
									<UserLinkField label="ra.strings.user" />

									<TextField source="name" label="ra.strings.name" />
									<FunctionField
											label="ra.strings.phone"
											render={(record) => `${record.contact}`}
											/>

									<BooleanField source="is_artist" />
									<TextField source="following_count" label="ra.strings.followings" sortable={false} />
									<TextField source="follower_count" label="ra.strings.followers" sortable={false} />
									
									<EnableDisableButton />       

									<EditButton />
																		</Datagrid>
								</ReferenceManyField>
							</Tab>
						)}
						{controllerProps.record && controllerProps.record.drop_count && (
							<Tab label="ra.strings.drops">
								<ReferenceManyField
									addLabel={false}
									reference={RESOURCES.ARTS}
									target="community_id"
									sort={{ field: "createdAt", order: "DESC" }}
									pagination={<Pagination />}
									perPage={10}
								>
									<Datagrid rowClick="show">
										<TextField source="id" label="ra.strings.id" />									
										<ReferenceField label="ra.strings.artist" source="artist.user_id" reference={RESOURCES.ARTISTS} link="show" sortable={false}>            
										<UserLinkField />
										</ReferenceField>
										<ReferenceField
												label="ra.strings.art_title"
												source="id"
												reference={RESOURCES.ARTS}
												link="show"												
												sortable={false}
											>
												<UserLinkField />
											</ReferenceField>
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
