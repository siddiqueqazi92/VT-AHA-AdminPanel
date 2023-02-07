// in src/users/TransferPaymentButton.js
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FlatButton from "material-ui/FlatButton";
import { showNotification as showNotificationAction } from "admin-on-rest";
import { push as pushAction } from "react-router-redux";

import { Button, Confirm, useRedirect } from "react-admin";

import _ from "lodash";
import { API_URL, RESPONSE_STATUS, RESOURCES } from "../../../constants";

class RejectRequestButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmationModalShow: false,
    };
  }
  handleClick = () => {
    const { push, record, showNotification, refresh } = this.props;

    const updatedRecord = { user_id: record.user_id,id:record.id };
    var auth = localStorage.getItem("auth");
    const { access_token } = JSON.parse(auth);
    const url = API_URL + `/${RESOURCES.WITHDRAWAL_REQUESTS}/reject`;

    fetch(url, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      method: "POST",
      body: JSON.stringify(updatedRecord),
    })
      .then((response) => {
        this.handleApproveConfirmation();
        
        if (response.status == RESPONSE_STATUS.UPDATED) {
          showNotification("Request rejected");
        } else {
          response.text().then((text) => {
            
            text = JSON.parse(text);
            if (text.status) {
              showNotification(text.message,"success");
            } else {
              showNotification(text.message, "warning");
            }
            
            // showNotification("User activated");
            push(`/${RESOURCES.WITHDRAWAL_REQUESTS}`);
            refresh();
          });
        }
        
        push(`/${RESOURCES.WITHDRAWAL_REQUESTS}`);
        refresh();
      })
      .catch((e) => {
        console.error(e);
        showNotification("Error: Request could not be rejected", "warning");
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
          label="ra.strings.reject"
          handleApproveConfirmation
          onClick={this.handleApproveConfirmation}
          disabled={this.props.record.status.toLowerCase() == 'pending'?false:true}
        />
        <Confirm
          isOpen={this.state.confirmationModalShow}
          loading={!this.state.confirmationModalShow}
          title="ra.strings.reject_request"
          content="ra.message.are_you_sure"
          onConfirm={this.handleClick}
          onClose={this.handleApproveConfirmation}
        />
      </>
    );
  }
}

RejectRequestButton.propTypes = {
  push: PropTypes.func,
  record: PropTypes.object,
  showNotification: PropTypes.func,
};

export default connect(null, {
  push: pushAction,
})(RejectRequestButton);
