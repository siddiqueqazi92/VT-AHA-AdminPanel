import { EditButton, useListContext } from "react-admin";
import { RESOURCES } from "../../constants";

const CustomEditButton = (props) => {
    const { ids, data, basePath } = useListContext();    
    switch (props.resource)
    {
        case RESOURCES.USERS:
        case RESOURCES.ARTISTS:
            if (props.record.login_type == 'simple') {
                return <EditButton resource={props.resource} basePath={basePath} record={data[props.record.id]} />    
              } else{
                return null
              }
            break;
    }
    
}
  
export {
    CustomEditButton
  };