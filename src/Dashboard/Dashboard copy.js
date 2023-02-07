import React, { useState, useEffect, useCallback, CSSProperties } from "react";
import { useVersion, useDataProvider } from "react-admin";
import { useMediaQuery, Theme } from "@material-ui/core";
import { subDays } from "date-fns";

import Welcome from "./Welcome";
import MonthlyRevenue from "./MonthlyRevenue";
import NbNewOrders from "./NbNewOrders";
import PendingOrders from "./PendingOrders";
import PendingVendors from "./PendingVendors";
import NewCustomers from "./NewCustomers";
import OrderChart from "./OrderChart";
import { RESOURCES } from "../constants";
import PendingDrivers from "./PendingDrivers";

const styles = {
  flex: { display: "flex" },
  flexColumn: { display: "flex", flexDirection: "column" },
  leftCol: { flex: 1, marginRight: "0.5em" },
  rightCol: { flex: 1, marginLeft: "0.5em" },
  singleCol: { marginTop: "1em", marginBottom: "1em" },
};

const Spacer = () => <span style={{ width: "1em" }} />;
const VerticalSpacer = () => <span style={{ height: "1em" }} />;

const Dashboard = () => {
  const [state, setState] = useState({});
  const version = useVersion();
  const dataProvider = useDataProvider();
  const isXSmall = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const fetchOrders = useCallback(async () => {
    const aMonthAgo = subDays(new Date(), 30);
    const { data: recentOrders } = await dataProvider.getList("orders", {
      filter: { createdAt: aMonthAgo.toISOString() },
      sort: { field: "createdAt", order: "DESC" },
      pagination: { page: 1, perPage: 50 },
    });
    const aggregations = recentOrders
      .filter((order) => order.status !== "cancelled")
      .reduce(
        (stats, order) => {
          if (order.status !== "cancelled") {
            stats.revenue += order.total;
            stats.nbNewOrders++;
          }
          if (order.status === "ordered") {
            stats.pendingOrders.push(order);
          }
          return stats;
        },
        {
          revenue: 0,
          nbNewOrders: 0,
          pendingOrders: [],
        }
      );
    setState((state) => ({
      ...state,
      recentOrders,
      revenue: aggregations.revenue.toLocaleString(undefined, {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }),
      nbNewOrders: aggregations.nbNewOrders,
      pendingOrders: aggregations.pendingOrders,
    }));
    const { data: customers } = await dataProvider.getMany(RESOURCES.USERS, {
      ids: aggregations.pendingOrders.map((order) => order.customer_id),
    });
    setState((state) => ({
      ...state,
      pendingOrdersCustomers: customers.reduce((prev, customer) => {
        prev[customer.id] = customer; // eslint-disable-line no-param-reassign
        return prev;
      }, {}),
    }));
  }, [dataProvider]);

  const fetchVendors = useCallback(async () => {
    const { data: vendors } = await dataProvider.getList(RESOURCES.VENDORS, {
      filter: { isApproved: false },
      sort: { field: "createdAt", order: "DESC" },
      pagination: { page: 1, perPage: 100 },
    });
    const nbPendingVendors = vendors.reduce((nb) => ++nb, 0);
    const pendingVendors = vendors.slice(0, Math.min(10, vendors.length));
    console.log({ vendors, nbPendingVendors, pendingVendors });
    setState((state) => ({ ...state, pendingVendors, nbPendingVendors }));
    const { data: customers } = await dataProvider.getMany(RESOURCES.USERS, {
      ids: pendingVendors.map((vendor) => vendor.customer_id),
    });
    setState((state) => ({
      ...state,
      pendingReviewsCustomers: customers.reduce((prev, customer) => {
        prev[customer.id] = customer; // eslint-disable-line no-param-reassign
        return prev;
      }, {}),
    }));
  }, [dataProvider]);

  useEffect(() => {
    fetchOrders();
    fetchVendors();
  }, [version]); // eslint-disable-line react-hooks/exhaustive-deps

  const {
    nbNewOrders,
    nbPendingVendors,
    pendingOrders,
    pendingOrdersCustomers,
    pendingVendors,
    pendingReviewsCustomers,
    revenue,
    recentOrders,
  } = state;
  return isXSmall ? (
    <div>
      <div style={styles.flexColumn}>
        <Welcome />
        <MonthlyRevenue value={revenue} />
        <VerticalSpacer />
        <NbNewOrders value={nbNewOrders} />
        <VerticalSpacer />
        <PendingOrders
          orders={pendingOrders}
          customers={pendingOrdersCustomers}
        />
      </div>
    </div>
  ) : isSmall ? (
    <div style={styles.flexColumn}>
      <div style={styles.singleCol}>
        <Welcome />
      </div>
      <div style={styles.flex}>
        <MonthlyRevenue value={revenue} />
        <Spacer />
        <NbNewOrders value={nbNewOrders} />
      </div>
      <div style={styles.singleCol}>
        <OrderChart orders={recentOrders} />
      </div>
      <div style={styles.singleCol}>
        <PendingOrders
          orders={pendingOrders}
          customers={pendingOrdersCustomers}
        />
      </div>
    </div>
  ) : (
    <>
      <Welcome />
      <div style={styles.flex}>
        <div style={styles.leftCol}>
          <div style={styles.flex}>
            <NbNewOrders value={nbNewOrders} />
            <Spacer />
            <PendingVendors nb={nbPendingVendors} vendors={pendingVendors} />
          </div>
          <div style={styles.singleCol}>
            {/* <OrderChart orders={recentOrders} /> */}
          </div>
          <div style={styles.singleCol}>
            {/* <PendingOrders
              orders={pendingOrders}
              customers={pendingOrdersCustomers}
            /> */}
          </div>
        </div>
        <div style={styles.rightCol}>
          <div style={styles.flex}>
            <NewCustomers />
            <Spacer />
            <PendingDrivers />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
