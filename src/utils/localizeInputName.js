export const localizeInputName = (name, locale) => `${name}-${locale}`;

export const parseTranslationsToInputs = (translations, langs, fields) => (
  fields.reduce((result, currField) => {
    const translatedField = langs.reduce((fieldResult, currLang) => {
      const fieldValue = translations[currField] ? translations[currField][currLang.locale] : '';

      return {
        ...fieldResult,
        [localizeInputName(currField, currLang.locale)]: fieldValue
      };
    }, {});

    return {
      ...result,
      ...translatedField
    };
  }, {})
);
