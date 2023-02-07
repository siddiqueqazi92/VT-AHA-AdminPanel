import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StoreIcon from "@material-ui/icons/Store";
import { Link } from "react-router-dom";
import { useTranslate, useQueryWithStore } from "react-admin";
import { subDays } from "date-fns";

import CardWithIcon from "./CardWithIcon";
import { Customer } from "../types";
import { RESOURCES } from "../constants";

const PendingDrivers = () => {
  const translate = useTranslate();
  const classes = useStyles();

  const aMonthAgo = subDays(new Date(), 30);
  aMonthAgo.setDate(aMonthAgo.getDate() - 30);
  aMonthAgo.setHours(0);
  aMonthAgo.setMinutes(0);
  aMonthAgo.setSeconds(0);
  aMonthAgo.setMilliseconds(0);

  const { loaded, data: visitors } = useQueryWithStore({
    type: "getList",
    resource: RESOURCES.VENDORS,
    payload: {
      filter: {
        isApproved: false,
      },
      sort: { field: "createdAt", order: "DESC" },
      pagination: { page: 1, perPage: 100 },
    },
  });

  if (!loaded) return null;

  const nb = visitors ? visitors.reduce((nb) => ++nb, 0) : 0;
  return (
    <CardWithIcon
      to={`/${RESOURCES.VENDORS}`}
      icon={StoreIcon}
      title={translate("ra.strings.pending_vendors")}
      subtitle={nb}
    >
      <List>
        {visitors
          ? visitors.map((record) => (
              <ListItem
                button
                to={`/${RESOURCES.VENDORS}/${record.id}/show`}
                component={Link}
                key={record.id}
              >
                <ListItemAvatar>
                  <Avatar src={`${record.image}?size=32x32`} />
                </ListItemAvatar>
                <ListItemText primary={`${record.name}`} />
              </ListItem>
            ))
          : null}
      </List>
      <Box flexGrow="1">&nbsp;</Box>
      <Button
        className={classes.link}
        component={Link}
        to={`/${RESOURCES.VENDORS}`}
        size="small"
        color="primary"
      >
        <Box p={1} className={classes.linkContent}>
          {translate("ra.strings.all_vendors")}
        </Box>
      </Button>
    </CardWithIcon>
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

export default PendingDrivers;
