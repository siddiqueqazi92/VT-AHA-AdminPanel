import * as React from "react";
import Avatar from "@material-ui/core/Avatar";
import _ from "lodash";

const AvatarField = ({ record, size = "25", className }) => {
  let image = record.avatar || record.image || record.profile_image;

  return record ? (
    <Avatar
      src={`${image}?size=${size}x${size}`}
      style={{ width: parseInt(size, 10), height: parseInt(size, 10) }}
      className={className}
    />
  ) : null;
};

export default AvatarField;
