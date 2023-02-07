import * as React from "react";
import {
  Show,
  TextField,
  TabbedShowLayout,
  Tab,
  ShowController,
  useTranslate,
  NumberField,
  BooleanField,
  FileField,
  ArrayField,
  Datagrid,
  UrlField,
  SingleFieldList,
  ChipField,
  ImageField,
  ReferenceManyField,
  Pagination,
  DateField,
} from "react-admin";
import { LANGUAGE, RESOURCES } from "../../constants";
import { DateFieldLabeled } from "../Common/Fields";
import _ from "lodash";

export const ShowSale = (props) => {
  const translate = useTranslate();
  return (
    <ShowController {...props}>
      {(controllerProps) => (
        <Show
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

              {controllerProps.record &&
                controllerProps.record.artist &&
                controllerProps.record.artist.username && (
                  <TextField
                    source="artist.username"
                    label="ra.strings.artist"
                  />
                )}

              {controllerProps.record && controllerProps.record.price && (
                <NumberField source="price" label="ra.strings.price" />
              )}
                {controllerProps.record && controllerProps.record.max_quantity && controllerProps.record.sellable == true && (
                   <NumberField
                   source="max_quantity"
                   label="ra.strings.max_quantity"
                 />
              )}
           
              <BooleanField source="sellable" label="ra.strings.sellable" />
              {controllerProps.record && controllerProps.record.description && (
                <TextField
                  source="description"
                  label="ra.strings.description"
                />
              )}
              {controllerProps.record &&
                controllerProps.record.vibes &&
                controllerProps.record.vibes.length && (
                  <ArrayField label="ra.strings.vibes" source="vibes">
                    <SingleFieldList>
                      <ChipField source="title" />
                    </SingleFieldList>
                  </ArrayField>
                )}
              {controllerProps.record &&
                controllerProps.record.thumbnail &&
                (
                 <ImageField source="thumbnail" />
                )}
              <DateFieldLabeled
                source="createdAt"
                label="ra.strings.created_at"
              />
            </Tab>
            {controllerProps.record &&
              controllerProps.record.resources &&
              controllerProps.record.resources.length && (
                <Tab label="ra.strings.resources">
                  {/* {controllerProps.record.resources.map((r) => {
                  // return <FileField source={r.uri} title="title" />;
                  return (
                    <div>
                      <a href={r.uri} title="Presentation">
                        Presentation
                      </a>
                    </div>
                  );
                })} */}
                  <ArrayField label="" source="resources" fieldKey="id">
                    <Datagrid>
                      <TextField source="type" />
                      <UrlField source="uri" />
                    </Datagrid>
                  </ArrayField>
                </Tab>
              )}
            {controllerProps.record &&
              controllerProps.record.sizes &&
              controllerProps.record.sizes.length && (
                <Tab label="ra.strings.sizes">
                  <ArrayField label="" source="sizes" fieldKey="id">
                    <Datagrid>
                      <TextField source="size" />
                      <NumberField source="price" />
                      <NumberField source="quantity" />
                    </Datagrid>
                  </ArrayField>
                </Tab>
              )}
            	{controllerProps.record && controllerProps.record.comment_count && (
							<Tab label="ra.strings.comments">
								<ReferenceManyField
									addLabel={false}
									reference={RESOURCES.COMMENTS}
									target="art_id"
									sort={{ field: "createdAt", order: "DESC" }}
									pagination={<Pagination />}
									perPage={10}
								>
									<Datagrid rowClick="show">
										<TextField source="id" label="ra.strings.id" />
										<TextField
											source="user.username"
											label="ra.strings.user"
										/>
										<TextField source="body" label="ra.strings.body" />
									

										<DateField
											source="created_at"
											label="ra.strings.commented_at"
										/>										
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
