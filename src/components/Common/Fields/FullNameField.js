import * as React from "react";
import { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { FieldProps } from "react-admin";
import AvatarField from "./AvatarField";
import { RESOURCES } from "../../../constants";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
  },
  avatar: {
    marginRight: theme.spacing(1),
    marginTop: -theme.spacing(0.5),
    marginBottom: -theme.spacing(0.5),
  },
}));

const FullNameField = (props) => {
  let excluded_resources = [RESOURCES.ARTS]
  let { record, size } = props;
  const classes = useStyles();
  let user = record.user;
  
  let name = record.username || record.name ||record.title2|| record.title || record.fullName;
  if (_.isObject(user)) {
    name = user.name || user.username;

    record = user;
  }
  // console.log({ recordin: record });
  return record ? (
    <div className={classes.root}>
     {!excluded_resources.includes(props.resource)? <AvatarField className={classes.avatar} record={record} size={size} />:null}
      {name}
    </div>
  ) : null;
};

export default memo(FullNameField);
