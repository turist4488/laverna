import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const getSearchParam = (parameter = '', location = window.location) => {
  const params = new URLSearchParams(location.search);

  return params.get(parameter) || '';
};

export const useSearchParams = props => {
  const location = useLocation();
  const { parameter, setValue } = props;
  const value = getSearchParam(parameter, location);

  useEffect(() => {
    setValue(value);
  }, [setValue, value]);
};
