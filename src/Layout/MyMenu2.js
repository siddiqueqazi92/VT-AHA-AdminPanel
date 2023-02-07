import * as React from "react";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery, Box } from "@material-ui/core";
import { useTranslate, MenuItemLink } from "react-admin";

import Banner from "../Banner";
import Badge from "../Badge";
import Business from "../Business";
import Categories from "../Categories";
import Interests from "../Interests";
import Contact from "../Contact";
import Faq from "../Faq";
import FaqCategory from "../Faq/FaqCategory";
import Pages from "../Pages";
import Users from "../Users";
import SubMenu from "./SubMenu";

const MyMenu2 = ({ onMenuClick, logout, dense = false }) => {
  const [state, setState] = useState({
    menuBanners: true,
    menuUsers: true,
    menuCategory: true,
    menuFaqs: true,
    menuPages: true,
    menuContact: true,
    menuBusiness: true,
  });
  const translate = useTranslate();
  const isXSmall = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const open = useSelector((state) => state.admin.ui.sidebarOpen);
  useSelector((state) => state.theme); // force rerender on theme change

  const handleToggle = (menu) => {
    setState((state) => ({ ...state, [menu]: !state[menu] }));
  };

  return (
    <Box mt={1}>
      {/ { banner menu } /}
      <MenuItemLink
        to={`/banner`}
        primaryText={"Banner"}
        leftIcon={<Banner.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />

      {/ { badges menu } /}
      <MenuItemLink
        to={`/badges`}
        primaryText={"Badges"}
        leftIcon={<Badge.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />

      {/ { business menu } /}
      <MenuItemLink
        to={`/business`}
        primaryText={"Business"}
        leftIcon={<Business.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      {/ { categories menu } /}
      <SubMenu
        handleToggle={() => handleToggle("menuCategory")}
        isOpen={state.menuCategory}
        sidebarIsOpen={open}
        name="Categories"
        icon={<Categories.icon />}
        dense={dense}
      >
        <MenuItemLink
          to={`/category`}
          primaryText={"Category"}
          leftIcon={<Categories.icon />}
          onClick={onMenuClick}
          sidebarIsOpen={open}
          dense={dense}
        />
        <MenuItemLink
          to={`/interest`}
          primaryText={"Interest"}
          leftIcon={<Interests.icon />}
          onClick={onMenuClick}
          sidebarIsOpen={open}
          dense={dense}
        />
      </SubMenu>

      {/ { content pages menu } /}
      <MenuItemLink
        to={`/pages`}
        primaryText={"Content Pages"}
        leftIcon={<Pages.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />

      {/ { contact menu } /}
      <MenuItemLink
        to={`/Contact`}
        primaryText={"Contact"}
        leftIcon={<Contact.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />

      {/ { faq menu } /}
      <SubMenu
        handleToggle={() => handleToggle("menuFaqs")}
        isOpen={state.menuFaqs}
        sidebarIsOpen={open}
        name="Faqs"
        icon={<Faq.icon />}
        dense={dense}
      >
        <MenuItemLink
          to={`/faq`}
          primaryText={"Faq"}
          leftIcon={<Faq.icon />}
          onClick={onMenuClick}
          sidebarIsOpen={open}
          dense={dense}
        />
        <MenuItemLink
          to={`/faq_category`}
          primaryText={"Faq Category"}
          leftIcon={<FaqCategory.icon />}
          onClick={onMenuClick}
          sidebarIsOpen={open}
          dense={dense}
        />
      </SubMenu>

      {/ { users menu } /}
      <MenuItemLink
        to={`/users`}
        primaryText={"Users"}
        leftIcon={<Users.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />

      {isXSmall && logout}
    </Box>
  );
};

export default MyMenu2;
