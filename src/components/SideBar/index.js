import React, {useContext, useMemo} from 'react';
import {Layout, Menu} from "antd";
import {
  UsergroupAddOutlined,
  DashboardOutlined,
  ReadOutlined,
  FileImageOutlined,
  FontSizeOutlined
} from "@ant-design/icons";
import {SideBarContext} from "../../context/SideBarContext";
import {useTranslation} from "react-i18next";
import {Link, useLocation} from "react-router-dom";
import {ROUTES} from "../../constants/routes";

const {Sider} = Layout;

const MenuIconMap = {
  [ROUTES.dashboard.key]: <DashboardOutlined/>,
  [ROUTES.media.key]: <FileImageOutlined/>,
  [ROUTES.catalog.key]: <ReadOutlined/>,
  [ROUTES.customers.key]: <UsergroupAddOutlined/>,
  [ROUTES.languages.key]: <FontSizeOutlined/>,
}

function SideBar() {

  const {sidebarCollapsed} = useContext(SideBarContext);
  const {t} = useTranslation();
  const location = useLocation();


  const currentRouteKey = useMemo(() => {
    const current = Object.values(ROUTES).find(row => {
      if (row.routes) {
        return !!Object.values(row.routes).find(subRow => (
          subRow.exact ? subRow.path === location.pathname : location.pathname.includes(subRow.path)
        ));
      } else {
        return row.exact ? row.path === location.pathname : location.pathname.includes(row.path);
      }
    })

    if (current && current.routes) {
      return Object.values(current.routes).find(subRow => (
        subRow.exact ? subRow.path === location.pathname : location.pathname.includes(subRow.path)
      ))?.key;
    } else {
      return current?.key;
    }
  }, [location.pathname]);

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={sidebarCollapsed}
      width={sidebarCollapsed ? 80 : 250}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        background: '#fff'
      }}
    >
      <div className="logo">
        {sidebarCollapsed ? 'L' : 'Laverna'}
      </div>
      <Menu mode="inline" selectedKeys={[currentRouteKey]}>
        {Object.values(ROUTES).map(route => {
          const subRoutes = route.routes ? Object.values(route.routes) : [];

          return subRoutes?.length ? (
            <Menu.SubMenu
              key={route.key}
              icon={MenuIconMap[route.key] || null}
              title={t(route.name)}
            >
              {subRoutes.map(subroute => (
                <Menu.Item
                  key={subroute.key}
                  icon={MenuIconMap[subroute.key] || null}
                >
                  <Link to={subroute.path}>
                    {t(subroute.name)}
                  </Link>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item
              key={route.key}
              icon={MenuIconMap[route.key] || null}
            >
              <Link to={route.path}>
                {t(route.name)}
              </Link>
            </Menu.Item>
          )
        })}
      </Menu>
    </Sider>
  );
}

export default SideBar;
