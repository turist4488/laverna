import { useCallback, useMemo, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { getSearchParam } from './useSearchParams';

const setQueryParam = ({ history, location, parameter, replace, value }) => {
  const { search } = location;
  const queryParams = new URLSearchParams(search);

  queryParams.set(parameter, value);
  const destination = { search: queryParams.toString() };

  if (replace) {
    history.replace(destination);
  } else {
    history.push(destination);
  }
};

const defaultInitialPage = 1;

export const usePagination = (props = {}) => {
  const { namespace = '', parameter = 'page', initialTotalPages = 1 } = props;

  const history = useHistory();
  const location = useLocation();
  const [totalPages, setTotalPages] = useState(initialTotalPages);

  const searchParam = namespace ? `${namespace}_${parameter}` : parameter;
  const initialPage = props.initialPage || defaultInitialPage;
  const currentPage = parseInt(getSearchParam(searchParam, location));

  // use the location to hold state
  const setCurrentPage = useCallback(
    (page, replace = false) => {
      // Update the query parameter.
      setQueryParam({
        history,
        location,
        parameter: searchParam,
        replace,
        value: page
      });
    },
    [history, location, searchParam]
  );

  // ensure the location contains a page number
  useEffect(() => {
    if (!currentPage) {
      setCurrentPage(initialPage, true);
    }
  }, [currentPage, initialPage, setCurrentPage]);

  const paginationState = {
    currentPage: currentPage || initialPage,
    totalPages
  };

  const api = useMemo(
    () => ({
      setCurrentPage,
      setTotalPages
    }),
    [setCurrentPage, setTotalPages]
  );

  return [paginationState, api];
};
