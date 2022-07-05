export const fetchAll = (urls) =>
  Promise.all(
    urls.map((url) =>
      fetch(url)
        .then((response) => response.json())
        .then((data) => ({ data, url }))
        .catch((error) => ({ error, url })),
    ),
  );
