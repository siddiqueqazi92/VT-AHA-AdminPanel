import * as React from "react";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PieChartBar from "../PieChart/pieChart";
import Images from "../../theme/Images";
import { ImageField, useTranslate } from "react-admin";
import { makeStyles } from "@material-ui/core/styles";
import Welcome from "../../Dashboard/Welcome";
const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    width: "20%",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: "2px",
  },
  numberInput: {
    maxWidth: 256,
    width: "100%",
  },
});
export default () => {
  const translate = useTranslate();
  const classes = useStyles();
  return (
    <div>
      <Welcome />
      <Card>
        <div style={{ textAlign: "center" }}>
          <ImageField src={Images.dashboard_icon} />
          {/* <DashboardIcon style={{ fontSize: 140 }} /> */}
        </div>
        <CardHeader
          style={{ textAlign: "center" }}
          title={translate("ra.strings.welcome_to_the_waspha")}
        />

        {/* <PieChartBar /> */}
      </Card>
      <Card className={classes.root}>
        <div>
          <ImageField src={Images.dashboard_icon} />
          {/* <DashboardIcon style={{ fontSize: 140 }} /> */}
        </div>
        <CardHeader
          // style={{ textAlign: "center" }}
          title={translate("ra.strings.users")}
        />
        <CardContent style={{ textAlign: "center" }}>
          Lorem ipsum sic dolor amet...
          {/* <PieChartBar /> */}
        </CardContent>
      </Card>
    </div>
  );
};
