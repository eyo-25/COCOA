import axios, { AxiosResponse } from "axios";

export const fetchAxios = async <T>(endpoint: string): Promise<T> => {
  const response: AxiosResponse<T> = await axios.get(endpoint);
  return response.data;
};
