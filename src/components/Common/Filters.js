const { ReferenceInput, SelectInput, SearchInput } = require("react-admin");

let auth = localStorage.getItem("auth");
let lang = "en";
if (auth) {
  const { language } = JSON.parse(auth);
  lang = language;
}
export const CountryFilter = () => {
  return (
    <ReferenceInput
      label="ra.strings.country"
      source="countryId"
      reference="countries"
      alwaysOn
      emptyText="All"
    >
      <SelectInput optionText={"name." + lang} />
    </ReferenceInput>
  );
};

export const SearchFilter = () => {
  return <SearchInput source="q" alwaysOn />;
};

//export { CountryFilter };
