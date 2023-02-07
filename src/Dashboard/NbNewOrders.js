import * as React from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useTranslate } from "react-admin";

import CardWithIcon from "./CardWithIcon";
import { RESOURCES } from "../constants";

const NbNewOrders = (props) => {
  const { value } = props;
  const translate = useTranslate();
  return (
    <CardWithIcon
      to={`/${RESOURCES.ORDERS}`}
      icon={ShoppingCartIcon}
      title={translate("ra.strings.new_orders")}
      subtitle={value}
    />
  );
};

export default NbNewOrders;
