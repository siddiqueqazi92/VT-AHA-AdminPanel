// in src/vendors/DisableButton.js
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FlatButton from "material-ui/FlatButton";
import { showNotification as showNotificationAction } from "admin-on-rest";
import { push as pushAction } from "react-router-redux";

import { Button, Confirm } from "react-admin";

import _ from "lodash";
import { API_URL, RESOURCES } from "../../../constants";

class DisableButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmationModalShow: false,
    };
  }
  handleClick = () => {
    const { push, record, showNotification, refresh } = this.props;

    const updatedRecord = { user_id: record.id, is_active: false };
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
      .then(() => {
        this.handleApproveConfirmation();
        showNotification("Artist deactivated");
        push(`/${RESOURCES.ARTISTS}`);
        refresh();
      })

      .catch((e) => {
        console.error(e);
        showNotification("Error: Artist could not be deactivated", "warning");
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
    return (
      <>
        <Button
          label="ra.strings.deactivate"
          handleApproveConfirmation
          onClick={this.handleApproveConfirmation}
        />
        <Confirm
          isOpen={this.state.confirmationModalShow}
          loading={!this.state.confirmationModalShow}
          title="ra.strings.deactivate_artist"
          content="ra.message.are_you_sure"
          onConfirm={this.handleClick}
          onClose={this.handleApproveConfirmation}
        />
      </>
    );
  }
}

DisableButton.propTypes = {
  push: PropTypes.func,
  record: PropTypes.object,
  showNotification: PropTypes.func,
};

export default connect(null, {
  push: pushAction,
})(DisableButton);
