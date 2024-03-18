export default ({ url, method, headers, data }) => {
  return new Promise(function (resolve, reject) {
    const initHeaders = {
      'Content-Type': 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
    };
    const paramsHeaders = Object.assign({}, initHeaders, headers);
    fetch(url, {
      method: method || 'POST',
      headers: paramsHeaders,
      timeout: 1000 * 60,
      data,
    }).then((response) => {
      const data = response.json();
      if (data) {
        resolve(data);
      } else {
        reject(null);
      }
    });
  });
};
