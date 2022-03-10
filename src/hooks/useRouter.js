import { useContext } from 'react';
import {
  __RouterContext as RouterContext
} from "react-router";

export const useRouter = () => useContext(RouterContext);
