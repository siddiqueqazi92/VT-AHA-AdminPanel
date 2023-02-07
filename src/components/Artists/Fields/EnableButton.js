// in src/users/EnableButton.js
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FlatButton from "material-ui/FlatButton";
import { showNotification as showNotificationAction } from "admin-on-rest";
import { push as pushAction } from "react-router-redux";

import { Button, Confirm, useRedirect } from "react-admin";

import _ from "lodash";
import { API_URL, RESPONSE_STATUS, RESOURCES } from "../../../constants";

class EnableButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmationModalShow: false,
    };
  }
  handleClick = () => {
    const { push, record, showNotification, refresh } = this.props;

    const updatedRecord = { user_id: record.id, is_active: true };
    var auth = localStorage.getItem("auth");
    const { access_token } = JSON.parse(auth);
    const url = API_URL + "/users/change-status";

    fetch(url, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      method: "PUT",
      body: JSON.stringify(updatedRecord),
    })
      .then((response) => {
        this.handleApproveConfirmation();
        if (response.status == RESPONSE_STATUS.UPDATED) {
          showNotification("Artist activated");
        } else {
          response.text().then((text) => {
            text = JSON.parse(text);
            //showNotification(text.message, "warning");
            showNotification("Artist activated");
            push(`/${RESOURCES.USERS}`);
            refresh();
          });
        }

        //useRedirect("list", "users");
        push(`/${RESOURCES.ARTISTS}`);
        refresh();
      })
      .catch((e) => {
        console.error(e);
        showNotification("Error: Artist could not be activated", "warning");
      });
  };

  handleApproveConfirmation = (e) => {
    if (!_.isUndefined(e)) {
      e.stopPropagation();
    }

    const temp = !this.state.confirmationModalShow;
    this.setState({
      confirmationModalShow: temp,
    });
  };

  render() {
    //const redirect = (basePath, id, data) => `${API_URL}/users`;
    return (
      <>
        <Button
          label="ra.strings.activate"
          handleApproveConfirmation
          onClick={this.handleApproveConfirmation}
        />
        <Confirm
          isOpen={this.state.confirmationModalShow}
          loading={!this.state.confirmationModalShow}
          title="ra.strings.activate_artist"
          content="ra.message.are_you_sure"
          onConfirm={this.handleClick}
          onClose={this.handleApproveConfirmation}
        />
      </>
    );
  }
}

EnableButton.propTypes = {
  push: PropTypes.func,
  record: PropTypes.object,
  showNotification: PropTypes.func,
};

export default connect(null, {
  push: pushAction,
})(EnableButton);
