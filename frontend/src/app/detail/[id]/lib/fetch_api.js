// utils/api.js
const baseURL = "http://13.209.91.211:8000/";

async function fetchData(endpoint, options = {}) {
  const response = await fetch(`${baseURL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`An error has occurred: ${response.status}`);
  }

  return response.json();
}

async function get(endpoint, headers = {}) {
  return fetchData(endpoint, { method: "GET", headers });
}

async function post(endpoint, data, headers = {}) {
  return fetchData(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

async function patch(endpoint, data, headers = {}) {
  return fetchData(endpoint, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

async function del(endpoint, data, headers = {}) {
  return fetchData(endpoint, { method: "DELETE", body: JSON.stringify(data) });
}

export { get, post, patch, del };
