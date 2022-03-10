import React, {useContext} from 'react';
import {Layout} from "antd";
import {
  LeftOutlined,
  RightOutlined
} from "@ant-design/icons";
import AuthenticationOptions from "../AuthenticationOptions";
import LangSwitcher from "../LangSwitcher";
import {SideBarContext} from "../../context/SideBarContext";
import SideBar from "../SideBar";
import Breadcrumbs from "../Breadcrumbs";
import './MainLayout.scss';

const { Header, Content } = Layout;


function MainLayout({ children }) {

  const { sidebarCollapsed, toggle } = useContext(SideBarContext);

  return (
    <Layout>
      <SideBar />
      <Layout className="main-layout" style={{minHeight: '100vh'}}>
        <Header
          className="main-layout__header"
          style={{
            width: `calc(100% - ${sidebarCollapsed ? '80px' : '250px'})`,
            left: sidebarCollapsed ? '80px' : '250px'
          }}
        >
          <button onClick={toggle} className="sidebar-trigger">
            {sidebarCollapsed ? <RightOutlined /> : <LeftOutlined />}
          </button>
          <div className="main-layout__header-actions">
            <LangSwitcher />
            <AuthenticationOptions />
          </div>
        </Header>
        <Content
          className="main-layout__wrapper"
          style={{
            marginLeft: sidebarCollapsed ? 80 : 250
          }}
        >
          <Breadcrumbs />

          <div className="main-layout__content">
            { children }
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
