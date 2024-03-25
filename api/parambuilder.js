const builder = (data = {}) => {
  let params = '';
  let i = true;
  if (data != {} || data != '' || data != null || data != undefined) {
    params = '?';
  }
  for (const key in data) {
    if (data != {} || data != '' || data != null || data != undefined) {
      if (data[key] != '') {
        if (i) {
          params += `${key}=${data[key]}`;
        } else {
          params += `&${key}=${data[key]}`;
        }
      }
    }
    i = false;
  }
  return params;
};

export default builder;
