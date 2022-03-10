import React, {useCallback, useEffect} from 'react';
import {Row, Col} from "antd";
import {useTranslation} from "react-i18next";
import {useRestApi} from "../../../hooks/useRestApi";


function PricesTab({locales}) {

  const { t } = useTranslation();

  const [getTariffsState, getTariffsApi] = useRestApi('/tariffs?active=1');

  const fetchTariffs = useCallback(() => {
    getTariffsApi.sendRequest({
      method: 'GET'
    });
  }, [getTariffsApi]);

  useEffect(() => {
    if(!getTariffsState.data) {
      fetchTariffs();
    }
  }, [fetchTariffs, getTariffsState.data]);

  return (
    <Row>
      <Col span={16}>

      </Col>
    </Row>
  );
}

export default PricesTab;
