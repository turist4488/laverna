import { useCallback, useMemo } from 'react';

import { request } from '../services';
import { useRestResponse } from './useRestResponse';

export const useRestApi = endpoint => {
  const [restResponseState, restResponseApi] = useRestResponse();
  const { receiveError, receiveResponse, setLoading } = restResponseApi;

  const sendRequest = useCallback(
    async (options) => {
      setLoading(true);

      try {
        const response = await request(endpoint, options);
        receiveResponse(response);
      } catch (error) {
        receiveError(error.baseMessage);
      }
    },
    [endpoint, receiveError, receiveResponse, setLoading]
  );

  const api = useMemo(
    () => ({
      ...restResponseApi,
      sendRequest
    }),
    [restResponseApi, sendRequest]
  );

  return [restResponseState, api];
};
