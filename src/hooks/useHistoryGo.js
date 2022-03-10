import {useMemo} from 'react';
import {useRouter} from "./useRouter";
import {replacePathParams} from "../utils/replacePathParams";

export const go = (history) => ({
  replace: (path) => {
    history.replace(path);
  },
  push: (path, pathParams) => {
  history.push(replacePathParams(path, pathParams));
}
});

export const useHistoryGo = () => {
  const { history } = useRouter();
  return useMemo(() => ({go: go(history)}), [history]);
};
