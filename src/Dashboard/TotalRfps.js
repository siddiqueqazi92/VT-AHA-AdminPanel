import * as React from "react";

import { makeStyles } from "@material-ui/core/styles";
import ReorderIcon from "@material-ui/icons/Reorder";

import { useTranslate, useQueryWithStore } from "react-admin";
import { subDays } from "date-fns";

import CardWithIcon from "./CardWithIcon";
import { RESOURCES } from "../constants";

const TotalRfps = () => {
  const translate = useTranslate();

  const { loaded, data: data } = useQueryWithStore({
    type: "getList",
    resource: RESOURCES.RFPS,
    payload: {
      filter: {},
      sort: { field: "createdAt", order: "DESC" },
      pagination: { page: 1, perPage: 100 },
    },
  });

  if (!loaded) return null;

  const nb = data ? data.reduce((nb) => ++nb, 0) : 0;
  return (
    <CardWithIcon
      to={`/${RESOURCES.RFPS}`}
      icon={ReorderIcon}
      title={translate("ra.strings.total_rfps")}
      subtitle={nb}
    ></CardWithIcon>
  );
};

const useStyles = makeStyles((theme) => ({
  link: {
    borderRadius: 0,
  },
  linkContent: {
    color: theme.palette.primary.main,
  },
}));

export default TotalRfps;
