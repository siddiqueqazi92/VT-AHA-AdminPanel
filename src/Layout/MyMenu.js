// in src/Menu.js
import * as React from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@material-ui/core";
import {
  MenuItemLink,
  getResources,
  useTranslate,
  DashboardMenuItem,
  usePermissions,
  Link,
} from "react-admin";

import _ from "lodash";
import { RESOURCES } from "../constants";
import SubMenu from "./SubMenu";
import Users from "../components/Users";
import Artists from "../components/Artists";

import { useState } from "react";

import Interests from "../components/Interests";
import Vibes from "../components/Vibes";
import Communities from "../components/Communities";

import { ROLES } from "../constants";
import Arts from "../components/Arts";
import { ListItem } from "material-ui";
import Sales from "../components/Sales";
import Purchases from "../components/Purchases";
import ArtCollections from "../components/ArtCollections";
import WithdrawalRequests from "../components/WithdrawalRequests";
import Events from "../components/Events";
const MyMenu = ({ onMenuClick, logout, dense = false }) => {
  const { permissions } = usePermissions();
  const [state, setState] = useState({
    menuUsers: true,
    menuInterests: true,
    menuVibes: true,
    menuArts: true,
    menuSales: true,
    menuArtCollections: true,
    WithdrawalRequests: true,
    Events: true,
  });
  const isXSmall = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const open = useSelector((state) => state.admin.ui.sidebarOpen);
  let resources = useSelector(getResources);
  resources = _.filter(resources, { hasList: true });

  const translate = useTranslate();
  const handleToggle = (menu) => {
    setState((state) => ({ ...state, [menu]: !state[menu] }));
  };
  return (
    <div>
      {/* <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} /> */}

      {/* <MenuItemLink
          to={`/${RESOURCES.USERS}`}
          primaryText={translate("ra.strings.all_users")}
          leftIcon={<Users.icon />}
          onClick={onMenuClick}
          sidebarIsOpen={open}
          dense={dense}
        /> */}
      <SubMenu
        handleToggle={() => handleToggle("menuUsers")}
        isOpen={state.menuUsers}
        sidebarIsOpen={open}
        name={translate("ra.strings.all_users")}
        icon={<Users.icon />}
        dense={dense}
      >
        <MenuItemLink
          to={`/${RESOURCES.USERS}`}
          primaryText={translate("ra.strings.users")}
          leftIcon={<Users.icon />}
          onClick={onMenuClick}
          sidebarIsOpen={open}
          dense={dense}
        />
        <MenuItemLink
          to={`/${RESOURCES.ARTISTS}`}          
          primaryText={translate("ra.strings.artists")}
          leftIcon={<Artists.icon />}
          onClick={onMenuClick}
          sidebarIsOpen={open}
          dense={dense}
        />
               
      </SubMenu>

      <MenuItemLink
        to={`/${RESOURCES.INTERESTS}`}
        primaryText={translate("ra.strings.interests")}
        leftIcon={<Interests.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to={`/${RESOURCES.VIBES}`}
        primaryText={translate("ra.strings.vibes")}
        leftIcon={<Vibes.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to={`/${RESOURCES.ARTS}`}
        primaryText={translate("ra.strings.arts")}
        leftIcon={<Arts.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to={`/${RESOURCES.ART_COLLECTIONS}`}        
        primaryText={translate("ra.strings.collections")}
        leftIcon={<ArtCollections.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to={`/${RESOURCES.SALES}`}        
        primaryText={translate("ra.strings.sales")}
        leftIcon={<Sales.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to={`/${RESOURCES.PURCHASES}`}        
        primaryText={translate("ra.strings.purchases")}
        leftIcon={<Purchases.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
     
       <MenuItemLink
        to={`/${RESOURCES.COMMUNITIES}`}        
        primaryText={translate("ra.strings.communities")}
        leftIcon={<Communities.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to={`/${RESOURCES.WITHDRAWAL_REQUESTS}`}        
        primaryText={translate("ra.strings.withdrawal_requests")}
        leftIcon={<WithdrawalRequests.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to={`/${RESOURCES.EVENTS}`}        
        primaryText={translate("ra.strings.events")}
        leftIcon={<Events.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />

      {isXSmall && logout}
    </div>
  );
};

export default MyMenu;
