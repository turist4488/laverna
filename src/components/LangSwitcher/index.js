import React from 'react';
import {Menu, Dropdown, Button} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {useTranslation} from "react-i18next";
import {AVAILABLE_LANGUAGES, DEFAULT_LANG} from "../../constants/languages";
import styles from './lang-switcher.module.scss';

function LangSwitcher() {

  const { i18n } = useTranslation();

  const onClick = ({ key }) => {
    if (key === DEFAULT_LANG) {
      const regex = new RegExp(`^/${AVAILABLE_LANGUAGES.join('|')}/`);
      window.location.href = window.location.pathname.replace(regex, '');
    } else {
      const pathname = window.location.pathname.replace(/^\/+|\/+$/g, '');
      window.location.href = (`/${[key, pathname].join('/')}/`).replace('//', '/');
    }
  };

  const menu = (
    <Menu onClick={onClick}>
      {AVAILABLE_LANGUAGES.filter(row => row !== i18n.language).map(l => (
        <Menu.Item key={l} className={styles.item}>{l.toUpperCase()}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      trigger={['click']}
      className={styles.root}
      overlayClassName={styles.list}
      placement="bottom"
    >
      <Button type="text" className="ant-dropdown-link">
        {i18n.language?.toUpperCase()} <DownOutlined />
      </Button>
    </Dropdown>
  );
}

export default LangSwitcher;
