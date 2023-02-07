import * as React from "react";
import {
	Show,
	TextField,
	TabbedShowLayout,
	Tab,
	ImageField,
	ShowController,
	useTranslate,
	TopToolbar,
	EditButton,
	UrlField,
  DateField,
  NumberField,
} from "react-admin";
import _ from "lodash";

import UserLinkField from "../Common/Fields/UserLinkField";
import { DateFieldCustom, DateFieldLabeled } from "../Common/Fields";
import { DATE_FORMAT1, DATE_FORMAT2, DATE_FORMAT3 } from "../../constants";


const ShowActions = ({ basePath, data, resource }) => (
	<TopToolbar>
	
	</TopToolbar>
);
export const ShowEvent = (props) => {
	const translate = useTranslate();
	return (
		<ShowController {...props}>
			{(controllerProps) => (
				<Show
					{...props}
					{...controllerProps}
					actions={<ShowActions />}
					// title={`User #${controllerProps.record.username}`}
					title={`Event #${
						!_.isUndefined(controllerProps.record)
							? controllerProps.record.Slug
							: ""
					}`}
				>
					<TabbedShowLayout>
						<Tab label="ra.strings.detail">
            <TextField source="id" label="ra.strings.id" />
              <TextField source="Name" label="ra.strings.name" />

              {controllerProps.record &&
                controllerProps.record.Headline &&(
                  <TextField
                    source="Headline"
                    label="ra.strings.headline"
                  />
                )}
              {controllerProps.record &&
                controllerProps.record.Summary &&(
                  <TextField
                    source="Summary"
                    label="ra.strings.summary"
                  />
                )}
              {controllerProps.record &&
                controllerProps.record.Description &&(
                  <TextField
                    source="Description"
                    label="ra.strings.description"
                  />
                )}
              {controllerProps.record &&
                controllerProps.record.StartDate &&(
                //   <DateField
                //     source="StartDate"
                //     label="ra.strings.start_date"
                // />
                  <DateFieldLabeled
                    source="StartDate"
                  label="ra.strings.start_date"
                  format={DATE_FORMAT3}
                />
                
                )}
              {controllerProps.record &&
                controllerProps.record.StartTime &&(
                  <TextField
                    source="StartTime"
                    label="ra.strings.start_time"
                  />
                )}
              {controllerProps.record &&
                controllerProps.record.EndTime &&(
                  <TextField
                    source="EndTime"
                    label="ra.strings.end_time"
                  />
                )}
              {controllerProps.record &&
                controllerProps.record.Price &&(
                  <NumberField
                  source="Price"
                  label="ra.strings.charges"
                  options={{ style: "currency", currency: "USD" }}
                />
                )}
              {controllerProps.record &&
                controllerProps.record.Limit &&(
                  <NumberField
                  source="Limit"
                  label="ra.strings.number_of_seats"                  
                />
                )}
              
              {controllerProps.record &&
                controllerProps.record.CreatedBy &&(                
                <TextField
                source="CreatedBy.fullName"
                label="ra.strings.artist"
                />
                )}
              {controllerProps.record &&
                controllerProps.record.Address &&(                
                <TextField
                source="Address"
                label="ra.strings.address"
                />
                )}
              

						</Tab>
					

						
					</TabbedShowLayout>
				</Show>
			)}
		</ShowController>
	);
};
