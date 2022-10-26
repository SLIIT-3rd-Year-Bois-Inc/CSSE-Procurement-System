import { API_ENDPOINT } from "../config";

class HTTPError extends Error {
  data: any;

  constructor(message: string, data: any) {
    super(message);
    this.data = data;
  }
}

export async function postJson(
  endpoint: string,
  data: any,
  json_response: boolean
) {
  let res = await fetch(`${API_ENDPOINT}${endpoint}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  let res_data: any = {};

  if (json_response) res_data = await res.json();

  if (res.status >= 300) {
    throw new HTTPError(`Received status ${res.status}`, {
      status: res.status,
      ...res_data,
    });
  }

  if (json_response) return res_data;
}

export async function deleteRequest(endpoint: string) {
  let res = await fetch(`${API_ENDPOINT}${endpoint}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (res.status >= 300) {
    throw new Error(`Received status ${res.status}`);
  }

  return true;
}

export async function getJson(endpoint: string, json_response: boolean) {
  let res = await fetch(`${API_ENDPOINT}${endpoint}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
  });

  if (res.status >= 300) {
    throw new Error(`Received status ${res.status}`);
  }

  if (json_response) return await res.json();
}

export async function patchJson(
  endpoint: string,
  data: any,
  json_response: boolean
) {
  let res = await fetch(`${API_ENDPOINT}${endpoint}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (res.status >= 300) {
    throw new Error(`Received status ${res.status}`);
  }

  if (json_response) return await res.json();
}
