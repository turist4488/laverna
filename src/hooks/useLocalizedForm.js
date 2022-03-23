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


  const getValuesByField = field => {
    if (Array.isArray(data)) {
      return data.reduce((fieldTranslations, lang) => ({
        ...fieldTranslations,
        [lang.locale]: form.getFieldValue(localizeInputName(field, lang.locale)) || ''
      }), {})
    }

    return {}
  };

  const getTranslations = () => {
    return localizedFields.reduce((translations, field) => ({
      ...translations,
      [field]: {
        ...getValuesByField(field)
      }
    }), {});
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
