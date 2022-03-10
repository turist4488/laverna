import {useEffect} from 'react';
import {useRestApi} from "./useRestApi";
import {localizeInputName} from "../utils/localizeInputName";
import {Form} from "antd";

export default function useLocalizedForm(localizedFields = []) {

  const [form] = Form.useForm();

  const [{loading, data}, {sendRequest}] = useRestApi('/languages/active');

  useEffect(() => {
    sendRequest({
      method: 'GET'
    });
  }, [sendRequest]);


  const getValuesByLocale = locale => {
    const values = {};

    localizedFields.forEach(field => {
      values[field] = form.getFieldValue(localizeInputName(field, locale)) || '';
    });

    return values;
  };

  const getTranslations = () => {
    if (Array.isArray(data)) {
      return data.map(lang => ({
        locale: lang.locale,
        ...getValuesByLocale(lang.locale)
      }))
    }
  };

  return [
    {
      form,
      locales: data || [],
      localesLoading: loading
    },
    { getTranslations }
  ];
}
