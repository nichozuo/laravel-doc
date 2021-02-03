import React from 'react';
import ProLayout, { ProSettings } from '@ant-design/pro-layout';
import {useEffect, useState } from 'react';
import {
  ReadOutlined,
  ApiOutlined,
  DatabaseOutlined,
  CloudServerOutlined,
  CodeOutlined,
} from '@ant-design/icons';
import { history } from 'umi';

export default function Layout(props: { children: any }) {
  const [activeSkey, setActiveSkey] = useState('/readme');
  const layoutPros = {
    navTheme: 'dark',
    layout: 'top',
    contentWidth: 'Fixed',
    fixedHeader: true,
    title: '项目文档系统',
    route: {
      routes: [
        {
          index:0,
          path: '/readme',
          name: '说明',
          icon: <ReadOutlined />,
        },
        {
          index:1,
          path: '/modules',
          name: 'Api文档',
          icon: <ApiOutlined />,
        },
        {
          index:2,
          path: '/database',
          name: '数据字典',
          icon: <DatabaseOutlined />,
        },
        {
          index:3,
          path: '/php',
          name: '后端代码生成',
          icon: <CloudServerOutlined />,
        },
        {
          index:4,
          path: '/js',
          name: '前端代码生成',
          icon: <CodeOutlined />,
        },
      ],
    },
  } as ProSettings;
  useEffect(() => {
    let key = history.location
    setActiveSkey(key.pathname)
  })
  return (
    <ProLayout
      {...layoutPros}
      location={{pathname: activeSkey}}
      menuItemRender={(item, dom) => (
        <a
          onClick={() => {
            setActiveSkey(item.key)
            history.push(item.path as string);
          }}
        >
          {dom}
        </a>
      )}
    >
      {props.children}
    </ProLayout>
  );
}
