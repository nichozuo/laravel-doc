import React from 'react';
import ProLayout, { ProSettings } from '@ant-design/pro-layout';
import {
  ReadOutlined,
  ApiOutlined,
  DatabaseOutlined,
  CloudServerOutlined,
  CodeOutlined,
} from '@ant-design/icons';
import { history } from 'umi';

export default function Layout(props: { children: any }) {
  const layoutPros = {
    navTheme: 'dark',
    layout: 'top',
    contentWidth: 'Fixed',
    fixedHeader: true,
    title: '项目文档系统',
    route: {
      routes: [
        {
          path: '/readme',
          name: '说明',
          icon: <ReadOutlined />,
        },
        {
          path: '/modules',
          name: 'Api文档',
          icon: <ApiOutlined />,
        },
        {
          path: '/database',
          name: '数据字典',
          icon: <DatabaseOutlined />,
        },
        {
          path: '/php',
          name: '后端代码生成',
          icon: <CloudServerOutlined />,
        },
        {
          path: '/js',
          name: '前端代码生成',
          icon: <CodeOutlined />,
        },
      ],
    },
  } as ProSettings;

  return (
    <ProLayout
      {...layoutPros}
      menuItemRender={(item, dom) => (
        <a
          onClick={() => {
            console.log(item);
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
