export const request = url => {
  const options = {
    method: 'GET',
    accept: 'application/vnd.api+json',
  };

  return fetch(url, options).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return new Promise(async (_, reject) => {
        reject(
          await res.json().catch(() => {
            reject(res.statusText);
          }),
        );
      });
    }
  });
};
