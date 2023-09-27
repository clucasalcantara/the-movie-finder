import { createAlova } from "alova";
import GlobalFetch from "alova/GlobalFetch";
import ReactHook from "alova/react";

const BASE_URL = "https://api.themoviedb.org/3";
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

export const apiClient = createAlova({
  baseURL: BASE_URL,
  statesHook: ReactHook,
  requestAdapter: GlobalFetch(),
  beforeRequest(method) {
    method.config.headers = {
      ...method.config.headers,
      Authorization: `Bearer ${API_TOKEN}`,
    };
  },
});
