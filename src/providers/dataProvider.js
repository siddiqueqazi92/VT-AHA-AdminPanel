import _, { debounce } from "lodash";
import { fetchUtils, useListParams } from "react-admin";
import { stringify } from "query-string";

import { API_URL, RESOURCE_TYPES, RESOURCES } from "../constants";
import { compressFile, isValidHttpUrl, isValidUrl } from "../util";

const apiUrl = API_URL;

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  var auth = localStorage.getItem("auth");
  if (!auth) {
    return Promise.reject();
  }

  const { access_token } = JSON.parse(auth);
  //console.log(access_token);
  // options.method = "POST";
  options.headers.set("Authorization", `Bearer ${access_token}`);
  //debugger;
  return fetchUtils.fetchJson(url, options);
};

/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
const convertFileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.rawFile);

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

// const isValidUrl = (url) => {
//   var pattern = new RegExp(
//     "^(https?:\\/\\/)?" + // protocol
//       "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
//       "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
//       "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
//       "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
//       "(\\#[-a-z\\d_]*)?$",
//     "i"
//   ); // fragment locator
//   return !!pattern.test(url);
// };

export default {
  // getList: (resource, params) => {
  //   const { page, perPage } = params.pagination;
  //   const { field, order } = params.sort;
  //   const query = {
  //     sort: JSON.stringify([{ field, order }]),
  //     range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
  //     filter: JSON.stringify(params.filter),
  //   };
  //   const url = `${apiUrl}/${resource}?${stringify(query)}`;

  //   return httpClient(url).then(({ headers, json }) => {
  //     return {
  //       data: json.data,
  //       total: json.data.length,
  //     };

  //     // total: parseInt(headers.get('content-range').split('/').pop(), 10),
  //   });
  // },
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    let { field, order } = params.sort;
    // console.log(order);
    order = "DESC";
    const query = {
      sort: JSON.stringify([{ field, order }]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };
    // console.log({ params111: JSON.stringify(query) });

    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => {
      if (json.data.length) {
        // console.log({ getList: json.data[0] });
        return {
          data: json.data,
          total: json.data[0].total || 0,
        };
      } else {
        return {
          data: [],
          total: 0,
        };
      }

      // total: parseInt(headers.get('content-range').split('/').pop(), 10),
    });
  },

  getOne: (resource, params) => {
    return httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => {
      if (json.data) {
        //json.data.createdAt = moment(json.data.createdAt).format(DATE_FORMAT1);
        // const _image = {
        //   src: json.data.image,
        // };

        //json.data.image = _image;
        // console.log({ getOne: json.data });
        return {
          data: json.data,
          id: params.id,
        };
      } else {
        return {
          data: [],
          total: 0,
        };
      }

      // total: parseInt(headers.get('content-range').split('/').pop(), 10),
    });
  },
  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url).then(({ json }) => ({
      data: json.data,
      id: json.data.id,
    }));
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([{ field, order }]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${apiUrl}/${resource}?${stringify(
      query
    )}`;

    return httpClient(url).then(({ headers, json }) => {
      // console.log({ headers: headers.get("Content-Range") });
      if (json.data.length) {
        return {
          data: json.data,
          total: json.data[0].total || 0,
        };
      } else {
        return {
          data: [],
          total: 0,
        };
      }

      // total: parseInt(headers.get('content-range').split('/').pop(), 10),
    });
    // return httpClient(url).then(({ headers, json }) => ({
    //   data: json,
    //   total: json.data.total,
    // }));
  },

  update: async (resource, params) => {
    
    //  debugger;
    // console.log({
    //   imag111: params.data.profile_image,
    //   valid: isValidUrl(params.data.profile_image),
    //   valid_cover: isValidUrl(params.data.cover_image),
    // });    
    switch (resource) {
      case RESOURCES.INTERESTS:
      case RESOURCES.COMMUNITIES:
      case RESOURCES.VIBES: {
        if (!_.isUndefined(params.data.image) && !_.isNull(params.data.image)) {
          if (!isValidUrl(params.data.image)) {                        
            params.data.image.rawFile = await compressFile(params.data.image);
            await convertFileToBase64(params.data.image).then((base64Image) => {
              params.data.image = base64Image;
            });
          }
        }

        break;
      }
      case RESOURCES.USERS:
      case RESOURCES.ARTISTS:
      case RESOURCES.ADMINS: {
        // console.log({ datainUpdate: params.data });
        // debugger;
        if (
          params.data.contact &&
          !_.isEmpty(params.data.contact) &&
          !_.isString(params.data.contact)
        ) {
          let contact = {};         
          contact.country_code = "+" + params.data.contact.dialCode;
          contact.number = params.data.contact.phone.substring(params.data.contact.dialCode.length);
          params.data.contact = contact;
        } else {
          delete params.data.contact;
        }

        if (
          !_.isUndefined(params.data.profile_image) &&
          !_.isEmpty(params.data.profile_image) &&
          !_.isNull(params.data.profile_image)
        ) {
          if (!isValidUrl(params.data.profile_image)) {            
            params.data.profile_image.rawFile = await compressFile(params.data.profile_image);
            await convertFileToBase64(params.data.profile_image).then(
              (base64Image) => {
                params.data.profile_image = base64Image;
              }
            );
          }
        }
        if (
          !_.isUndefined(params.data.cover_image) &&
          !_.isEmpty(params.data.cover_image) &&
          !_.isNull(params.data.cover_image)
        ) {
          if (!isValidUrl(params.data.cover_image)) {            
            params.data.cover_image.rawFile = await compressFile(params.data.cover_image);
            await convertFileToBase64(params.data.cover_image).then(
              (base64Image) => {
                params.data.cover_image = base64Image;
              }
            );
          }
        }
        break;
      }
      case RESOURCES.ARTS: {
        if (
          !_.isUndefined(params.data.resources) &&
          _.isArray(params.data.resources)
        ) {
          let resources = [];
          for (let file of params.data.resources) {
            let r = file;    
            console.log({ valid: isValidUrl(file.uri),validHttp:isValidHttpUrl(file.uri), file: file })
            debugger
            if (!(isValidUrl(file.uri) && isValidHttpUrl(file.uri))) {
              debugger
              if (!file.uri.includes("video/mp4")) {
                file.rawFile = await compressFile(file);  
              }
              
              await convertFileToBase64(file).then((base64Image) => {
                r.uri = base64Image;
                switch (true) {
                  case base64Image.includes("image/png"):
                  case base64Image.includes("image/jpeg"): {
                    r.type = "image";                    
                    break;
                  }
  
                  case base64Image.includes("video/mp4"): {
                    r.type = "video";
                    break;
                  }
                }                
              });

            }
            resources.push(r);

          }
          params.data.resources = resources;
        }
        break;
      }
    }

    return (
      httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(params.data),
      }) //then(({ json }) => {
        //   return <Redirect to="cancellation-reasons" />;
        // });
        .then(({ json }) => ({ data: json.data, id: json.data.id }))
    );
  },

  updateMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },

  create: async (resource, params) => {
    switch (resource) {
      case RESOURCES.COMMUNITIES:
      case RESOURCES.INTERESTS:
      case RESOURCES.VIBES: {
        if (!_.isUndefined(params.data.image)) {
          params.data.image.rawFile = await compressFile(params.data.image);
          await convertFileToBase64(params.data.image).then((base64Image) => {
            params.data.image = base64Image;
          });
        }
        break;
      }
      case RESOURCES.USERS:
      case RESOURCES.ARTISTS:
      case RESOURCES.ADMINS: {
        
        let contact = {};
        
        contact.country_code = "+" + params.data.contact.dialCode;
        contact.number = params.data.contact.phone.substring(params.data.contact.dialCode.length);
        params.data.contact = contact;

        if (!_.isUndefined(params.data.profile_image)) {
          params.data.profile_image.rawFile = await compressFile(params.data.profile_image);          
          await convertFileToBase64(params.data.profile_image).then(
            (base64Image) => {
              params.data.profile_image = base64Image;
            }
          );
        }
        if (!_.isUndefined(params.data.cover_image)) {
          params.data.cover_image.rawFile = await compressFile(params.data.cover_image);          
          await convertFileToBase64(params.data.cover_image).then(
            (base64Image) => {
              params.data.cover_image = base64Image;
            }
          );
        }
        break;
      }
      case RESOURCES.ARTS: {
        if (
          !_.isUndefined(params.data.resources) &&
          _.isArray(params.data.resources)
        ) {
          let resources = [];
          
          // params.data.resources2 = {...params.data.resources}
          for (let file of params.data.resources) {
            let r = {};
            debugger
            if (!file.rawFile.type.includes("video/mp4")) {
              file.rawFile = await compressFile(file);   
            }            
            await convertFileToBase64(file).then((base64Image) => {
              r.uri = base64Image;
              switch (true) {
                case base64Image.includes("image/png"):
                case base64Image.includes("image/jpeg"): {
                  r.type = "image";
                  break;
                }

                case base64Image.includes("video/mp4"): {
                  r.type = "video";
                  break;
                }
              }
              resources.push(r);
            });
          }
          params.data.resources = resources;
        }
        break;
      }
    }

    // console.log({ paramsInCreateAfterChanges: params });
    return httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => {
      ///console.log({ json1111: json });
      if (json.status === true && !_.isUndefined(json.data) && json.data.id) {
        return {
          data: { ...params.data, id: json.data.id },
        };
      }
      // return Promise.reject();
    });
    // return httpClient(`${apiUrl}/${resource}/${RESOURCE_TYPES.ADD}`, {
    //   method: "POST",
    //   body: JSON.stringify(params.data),
    // }).then(({ json }) => ({
    //   data: { ...params.data, id: json.data.id },
    // }));
  },

  delete: (resource, params) => {
    return httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    }).then(({ json }) => ({ data: json }));
  },

  deleteMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(
      `${apiUrl}/${resource}/${RESOURCE_TYPES.DELETE}?${stringify(query)}`,
      {
        method: "DELETE",
        body: JSON.stringify(params.data),
      }
    ).then(({ json }) => ({ data: json.data }));
  },
};
