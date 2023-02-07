import * as React from "react";
import { Link, FieldProps } from "react-admin";

import { RESOURCES } from "../../../constants";
import FullNameField from "./FullNameField";
import _ from "lodash"

const UserLinkField = (props) => {
  if (_.isUndefined(props) || _.isUndefined(props.record)) {
    return null
  }
  // console.log({props})
  let resource = props.resource;
  let id = props.record.id;

  switch (resource) {
    case RESOURCES.WALLETS: {
      resource = RESOURCES.USERS;
      break;
    }
    case RESOURCES.ARTS: {
      props.record.title2 = props.record.title;
      break;
    }
    case RESOURCES.EVENTS: {
      props.record.fullName = props.record.CreatedBy.fullName;
      break;
    }
   
  }
  return props.record ? (
     <Link to={`/${resource}/${id}/show`}>
    {/* <Link> */}
      <FullNameField {...props} />
    </Link>
  ) : null;
};

export default UserLinkField;
