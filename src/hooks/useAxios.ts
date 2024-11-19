import {useEffect, useState} from 'react';
import axios from 'axios';
import {ApiError, fetchDataParams} from '../types/types';
import {BASE_URL, API_KEY} from '@env';

const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'api-key': `${API_KEY}`,
    },
  });

  axiosInstance.interceptors.request.use(
    config => {
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );
  axiosInstance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      return Promise.reject(error);
    },
  );

  let controller = new AbortController();

  useEffect(() => {
    return () => controller?.abort();
  }, []);

  const fetchData = async ({
    url,
    method,
    data = {},
    params = {},
  }: fetchDataParams) => {
    const requestData = data.formData || data.data;
    setLoading(true);
    controller.abort();
    controller = new AbortController();
    try {
      const result = await axiosInstance({
        url,
        method,
        data: requestData,
        params,
        signal: controller.signal,
      });

      return result.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request cancelled', error);
      } else {
        const err = error as ApiError;
        console.log(err);
        return err.response ? err.response.data : err.message;
      }
    } finally {
      setLoading(false);
    }
  };

  return {loading, fetchData};
};
export default useAxios;
