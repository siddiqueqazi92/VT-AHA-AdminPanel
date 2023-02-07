import * as React from "react";

import { makeStyles } from "@material-ui/core/styles";
import MotorcycleIcon from "@material-ui/icons/Motorcycle";
import { useTranslate, useQueryWithStore } from "react-admin";
import { subDays } from "date-fns";

import CardWithIcon from "./CardWithIcon";
import { RESOURCES } from "../constants";

const TotalDrivers = () => {
  const translate = useTranslate();

  const { loaded, data: data } = useQueryWithStore({
    type: "getList",
    resource: RESOURCES.DRIVERS,
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
      to={`/${RESOURCES.DRIVERS}`}
      icon={MotorcycleIcon}
      title={translate("ra.strings.total_delivery_partners")}
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

export default TotalDrivers;
