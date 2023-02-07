import { ImageField, TextField, Labeled, useTranslate } from "react-admin";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import moment from "moment";
import { TIME_FORMAT4, DATE_FORMAT1, RESOURCES } from "../../constants";
import { get } from "lodash";

const PreviewImage = ({ record, source }) => {
  if (typeof record == "string") {
    record = {
      [source]: record,
    };
  }
  //console.log({ record: record, source: source });
  return <ImageField record={record} source={source} />;
};

const LinkToRelatedUsers = ({ record }) => {
  const translate = useTranslate();
  return record ? (
    <Button
      onClick={(e) => {
        e.stopPropagation();
      }}
      color="primary"
      component={Link}
      to={{
        pathname: `/${RESOURCES.USERS}/${record.id}`,
      }}
    >
      {translate("ra.strings.order")}
    </Button>
  ) : null;
};

const TimeFieldCustom = (props) => {
  let value = moment(props.record[props.source]).format(TIME_FORMAT4);
  const recordWithTimestampAsInteger = {
    [props.source]: value,
  };

  return <TextField {...props} record={recordWithTimestampAsInteger} />;
};
const DateFieldCustom = (props) => {
  let value = moment(props.record[props.source]).format(props.format || DATE_FORMAT1);
  const recordWithTimestampAsInteger = {
    [props.source]: value,
  };
  // console.log({
  //   recordWithTimestampAsInteger: recordWithTimestampAsInteger,
  //   saa: props.record[props.source],
  // });
  return (
    <TextField
      label="Created at"
      {...props}
      record={recordWithTimestampAsInteger}
    />
  );
};


const LabeledField = (WrappedComponent) => (props) => {
  const { record, source } = props;
  const value = get(record, source);
  console.log({ value: value, record: record, source: source });
  return value ? (
    <Labeled {...props}>
      <WrappedComponent {...props} />
    </Labeled>
  ) : null;
};

const DateFieldLabeled = LabeledField(DateFieldCustom);
const TimeFieldLabeled = LabeledField(TimeFieldCustom);
export {
  PreviewImage,
  LinkToRelatedUsers,
  TimeFieldCustom,
  DateFieldCustom,
  DateFieldLabeled,
  TimeFieldLabeled,
};
