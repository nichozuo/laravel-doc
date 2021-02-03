import Markdown from '@/components/markdown';
import Sidebar from '@/components/sidebar';
import ProCard from '@ant-design/pro-card';
import React from 'react';

export default () => {
  return (
    <ProCard split="vertical" className="body-card">
      <ProCard colSpan="400px" className="menu-cont">
        <Sidebar type="modules" />
      </ProCard>
      <ProCard className="my-content">
        <Markdown type="modules" />
      </ProCard>
    </ProCard>
  );
};
