import { useState, useCallback } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

export default function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = useCallback(async (method, url, data = null, config = {}) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance({
        method,
        url,
        data,
        ...config,
      });

      return response.data; // directly return data
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      setError(message);
      toast.error(message);
      return null; // return null in case of error
    } finally {
      setLoading(false);
    }
  }, []);

  return { callApi, loading, error };
}
