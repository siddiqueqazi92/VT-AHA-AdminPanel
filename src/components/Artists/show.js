import * as React from "react";
import {
	Show,
	TextField,
	Datagrid,
	TabbedShowLayout,
	Tab,
	ReferenceManyField,
	ImageField,
	ShowController,
	FunctionField,
	EmailField,
	useTranslate,
	Pagination,
	RichTextField,
	BooleanField,
	TopToolbar,
	EditButton,
	SingleFieldList,
	ChipField,
	ArrayField,
	UrlField,
	NumberField,
	DateField,
	ReferenceField,
} from "react-admin";
import _ from "lodash";
import { RESOURCES } from "../../constants";
import UserLinkField from "../Common/Fields/UserLinkField";
import { EnableDisableButton } from "../Users/Fields/EnableDisableButton";

const ShowActions = ({ basePath, data, resource }) => (
	<TopToolbar>		
		{!_.isUndefined(data) && data.login_type == 'simple' && <EditButton basePath={basePath} record={data} />}
		{/* Add your custom actions */}
		{/* <Button color="primary" onClick={customAction}>Custom Action</Button> */}
	</TopToolbar>
);

export const ShowUser = (props) => {
	const translate = useTranslate();
	
	return (
		<ShowController {...props}>
			{(controllerProps) => (
				<Show
					{...props}
					{...controllerProps}
					actions={<ShowActions />}
					// title={`User #${controllerProps.record.username}`}
					title={`Artist #${
						!_.isUndefined(controllerProps.record)
							? controllerProps.record.username
							: ""
					}`}
				>
					<TabbedShowLayout>
						<Tab label="ra.strings.detail">
							{/* <TextField source="id" label="ra.strings.id" /> */}
							<TextField source="username" label="ra.strings.username" />
							<TextField source="name" label="ra.strings.name" />
							<BooleanField source="is_artist" />
							{controllerProps.record && controllerProps.record.email && (
								<TextField source="email" label="ra.strings.email" />
							)}

							{controllerProps.record && controllerProps.record.contact && (
								<FunctionField
									label="ra.strings.phone"
									render={(record) => `${record.contact}`}
								/>
							)}
							{controllerProps.record && controllerProps.record.bio && (
								<RichTextField source="bio" />
							)}

							{controllerProps.record &&
								controllerProps.record.user_vibes &&
								controllerProps.record.user_vibes.length && (
									<ArrayField label="ra.strings.vibes" source="user_vibes">
										<SingleFieldList>
											<ChipField source="title" />
										</SingleFieldList>
									</ArrayField>
								)}
							{controllerProps.record &&
								controllerProps.record.user_interests &&
								controllerProps.record.user_interests.length && (
									<ArrayField
										label="ra.strings.interests"
										source="user_interests"
									>
										<SingleFieldList>
											<ChipField source="title" />
										</SingleFieldList>
									</ArrayField>
								)}
							{controllerProps.record &&
								controllerProps.record.profile_image && (
									<ImageField
										source="profile_image"
										label="ra.strings.profile_image"
									/>
								)}
						</Tab>
						{controllerProps.record &&
							controllerProps.record.is_artist == true && (
								<Tab label="ra.strings.additional_detail">
									{controllerProps.record &&
										controllerProps.record.cover_image && (
											<ImageField
												source="cover_image"
												label="ra.strings.cover_image"
											/>
										)}

									{controllerProps.record &&
										controllerProps.record.address &&
										controllerProps.record.address.country && (
											<TextField
												source="address.country"
												label="ra.strings.country"
											/>
										)}

									{controllerProps.record &&
										controllerProps.record.address &&
										controllerProps.record.address.state && (
											<TextField
												source="address.state"
												label="ra.strings.state"
											/>
										)}

									{controllerProps.record &&
										controllerProps.record.address &&
										controllerProps.record.address.city && (
											<TextField
												source="address.city"
												label="ra.strings.city"
											/>
										)}
									{controllerProps.record &&
										controllerProps.record.facebook && (
											<UrlField source="facebook" label="ra.strings.facebook" />
										)}
									{controllerProps.record &&
										controllerProps.record.instagram && (
											<UrlField
												source="instagram"
												label="ra.strings.instagram"
											/>
										)}
									{controllerProps.record && controllerProps.record.tiktok && (
										<UrlField source="tiktok" label="ra.strings.tiktok" />
									)}
									{controllerProps.record && controllerProps.record.dribble && (
										<UrlField source="dribble" label="ra.strings.dribble" />
									)}
								</Tab>
							)}
					
						<Tab
						label={`${translate("ra.strings.addresses")} (${
							!_.isUndefined(controllerProps.record) && controllerProps.record.address_count ||0
						})`}
						>
								<ReferenceManyField
										addLabel={false}
										reference={RESOURCES.ADDRESSES}
										target="user_id"
										sort={{ field: "id", order: "DESC" }}
										pagination={<Pagination />}
										perPage={10}
									>
										<Datagrid>
											<TextField source="title" label="ra.strings.title" />
											<TextField source="country" label="ra.strings.country" />
											<TextField source="state" label="ra.strings.state" />
											<TextField source="address" label="ra.strings.address" />
											<BooleanField
												source="is_selected"
												label="ra.strings.default"
											/>
											{/* <EditButton called_from="editPage" /> */}
											{/* <LinkToEdit /> */}
										</Datagrid>
									</ReferenceManyField>
								</Tab>
							
						
						<Tab 
						label={`${translate("ra.strings.sales")} (${
							!_.isUndefined(controllerProps.record) && controllerProps.record.sale_count ||0
						})`}
						>
									<ReferenceManyField
										addLabel={false}
										reference={RESOURCES.SALES}
										target="artist_id"
										sort={{ field: "id", order: "DESC" }}
										pagination={<Pagination />}
										perPage={10}
									>
										<Datagrid>
											<TextField
												source="order.id"
												label="ra.strings.order_id"
											/>

											<ReferenceField
												label="ra.strings.art_title"
												source="art_id"
												reference={RESOURCES.ARTS}
												link="show"
												filter={{ title: "order" }}
												sortable={false}
											>
												<UserLinkField />
											</ReferenceField>

											<NumberField
												source="total_amount"
												label="ra.strings.total"
												options={{ style: "currency", currency: "USD" }}
											/>
											<NumberField
												source="total_amount"
												label="ra.strings.goods_price"
												options={{ style: "currency", currency: "USD" }}
											/>
											<NumberField
												source="artist_share"
												label="ra.strings.vendor_share"
												options={{ style: "currency", currency: "USD" }}
											/>
											<NumberField
												source="aha_commission"
												label="ra.strings.aha_share"
												options={{ style: "currency", currency: "USD" }}
											/>
											<TextField source="status" label="ra.strings.status" />
											<DateField
												source="order.createdAt"
												label="ra.strings.placed_at"
												showTime
											/>
										</Datagrid>
									</ReferenceManyField>
								</Tab>
							
						
							
						<Tab
						label={`${translate("ra.strings.purchases")} (${
							!_.isUndefined(controllerProps.record) && controllerProps.record.order_count ||0
						})`}>
									<ReferenceManyField
										addLabel={false}
										reference={RESOURCES.PURCHASES}
										target="user_id"
										sort={{ field: "id", order: "DESC" }}
										pagination={<Pagination />}
										perPage={10}>
										<Datagrid>
											<TextField source="id" label="ra.strings.id" />
											<ReferenceField
												label="ra.strings.art_title"
												source="art_id"
												reference={RESOURCES.ARTS}
												link="show"
												filter={{ title: "order" }}
												sortable={false}
											>
												<UserLinkField />
											</ReferenceField>
											
											<ReferenceField
												label="ra.strings.artist"
												source="artist.user_id"
												reference={RESOURCES.ARTISTS}
												link="show"
												sortable={false}
											>
												<UserLinkField label="ra.strings.artist" />
											</ReferenceField>
											<NumberField
												source="quantity"
												label="ra.strings.quantity"
											/>
											<TextField source="size" label="ra.strings.size" />
											<NumberField
												source="total_amount"
												label="ra.strings.total"
												options={{ style: "currency", currency: "USD" }}
											/>
											<TextField source="status" label="ra.strings.status" />
											<DateField
												source="order.createdAt"
												label="ra.strings.placed_at"
												showTime
											/>
										</Datagrid>
									</ReferenceManyField>
								</Tab>
							
						
							<Tab
								label={`${translate("ra.strings.followings")} (${
									!_.isUndefined(controllerProps.record) && controllerProps.record.following_count ||0
								})`}
							>
								<ReferenceManyField
									addLabel={false}
									reference={RESOURCES.ARTISTS}
									target="follower_id"
									sort={{ field: "createdAt", order: "DESC" }}
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
										<TextField
											source="following_count"
											label="ra.strings.followings"
											sortable={false}
										/>
										<TextField
											source="follower_count"
											label="ra.strings.followers"
											sortable={false}
										/>
										<EnableDisableButton />

										<EditButton />
									</Datagrid>
								</ReferenceManyField>
							</Tab>
						
						
							<Tab
								label={`${translate("ra.strings.followers")} (${
									!_.isUndefined(controllerProps.record) && controllerProps.record.follower_count ||0
								})`}
							>
								<ReferenceManyField
									addLabel={false}
									reference={RESOURCES.ARTISTS}
									target="following_id"
									sort={{ field: "createdAt", order: "DESC" }}
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
										<TextField
											source="following_count"
											label="ra.strings.followings"
											sortable={false}
										/>
										<TextField
											source="follower_count"
											label="ra.strings.followers"
											sortable={false}
										/>

										<EnableDisableButton />

										<EditButton />
									</Datagrid>
								</ReferenceManyField>
						</Tab>
						
						<Tab
							label={`${translate("ra.strings.arts")} (${
								!_.isUndefined(controllerProps.record) && controllerProps.record.art_count ||0
							})`}
						>
								<ReferenceManyField
									addLabel={false}
									reference={RESOURCES.ARTS}
									target="artist_id"
									sort={{ field: "createdAt", order: "DESC" }}
									pagination={<Pagination />}
									perPage={10}
								>
									<Datagrid rowClick="show">
										<TextField source="id" label="ra.strings.id" />																			
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
						<Tab 
						label={`${translate("ra.strings.collections")} (${
							!_.isUndefined(controllerProps.record) && controllerProps.record.art_collection_count ||0
						})`}
						>
								<ReferenceManyField
									addLabel={false}
									reference={RESOURCES.ART_COLLECTIONS}
									target="artist_id"
									sort={{ field: "createdAt", order: "DESC" }}
									pagination={<Pagination />}
									perPage={10}
								>
									<Datagrid rowClick="show">
									<TextField source="id" label="ra.strings.id" />          
									<TextField source="title" label="ra.strings.title" />                    
									      
									<TextField source="privacy" label="ra.strings.privacy" sortable={false} />
									<TextField source="pinned_count" label="ra.strings.pinned_count" sortable={false} />
									</Datagrid>
								</ReferenceManyField>
						</Tab>
						<Tab            
						label={`${translate("ra.strings.communities")} (${
									!_.isUndefined(controllerProps.record) && controllerProps.record.community_count ||0
								})`}>
								<ReferenceManyField
									addLabel={false}
									reference={RESOURCES.COMMUNITIES}
									target="follower_id"
									sort={{ field: "createdAt", order: "DESC" }}
									pagination={<Pagination />}
									perPage={10}
								>
									<Datagrid rowClick="show">
										<TextField source="id" label="ra.strings.id" />          
										<UserLinkField label="ra.strings.name" />          
										<ReferenceField label="ra.strings.artist" source="artist.user_id" reference={RESOURCES.ARTISTS} link="show" sortable={false}>            
											<UserLinkField label="ra.strings.user" />
										</ReferenceField>
										<TextField source="follower_count" label="ra.strings.followers" sortable={false} />
										<DateField source="createdAt" label="ra.strings.created_at" />     
									</Datagrid>
								</ReferenceManyField>
							</Tab>
					</TabbedShowLayout>
				</Show>
			)}
		</ShowController>
	);
};
