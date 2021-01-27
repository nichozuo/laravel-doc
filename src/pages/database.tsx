import Markdown from '@/components/markdown';
import Sidebar from '@/components/sidebar';
import ProCard from '@ant-design/pro-card';
import React from 'react';

export default () => {
  return (
    <ProCard split="vertical" className="body-card">
      <ProCard colSpan="400px">
        <Sidebar type="database" />
      </ProCard>
      <ProCard style={{ padding: '40px' }}>
        <Markdown type="database" />
      </ProCard>
    </ProCard>
  );
};
