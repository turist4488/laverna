import React from 'react';
import {useTranslation} from "react-i18next";
import {EditLanguageForm} from "../../components/LanguagesPage";


function LanguageEditPage({match}) {

    const id = match.params.id;

    const { t } = useTranslation();

    return (
        <div className="route-content route-content--white">
            <div className="route-header route-header--separate">
                <h3>{t('Language editing')}</h3>
            </div>
            <EditLanguageForm id={id} editMode={true}/>
        </div>
    );
}

export default LanguageEditPage;
