import * as React from "react";
import {
  Show,
  TextField,
  TabbedShowLayout,
  Tab,
  ShowController,
  useTranslate,
  NumberField,
  RichTextField,
} from "react-admin";

import { LANGUAGE } from "../../constants";
import _ from "lodash";

export const ShowScreenContent = (props) => {
  const translate = useTranslate();
  return (
    <ShowController {...props}>
      {(controllerProps) => (
        <Show {...props} {...controllerProps}>
          <TabbedShowLayout>
            <Tab label="ra.strings.english">
              {controllerProps.record && controllerProps.record.en && (
                <RichTextField source="en" label="" />
              )}
            </Tab>
            <Tab label="ra.strings.arabic">
              {controllerProps.record && controllerProps.record.ar && (
                <RichTextField source="ar" label="" />
              )}
            </Tab>
          </TabbedShowLayout>
        </Show>
      )}
    </ShowController>
  );
};
