// import React, { useState } from 'react';
// import { Tree } from 'antd';

import request from '@/plugins/request';
import { API } from '@/services/apis';
import { Tree } from 'antd';
import { useEffect, useState } from 'react';
const { DirectoryTree } = Tree;
import { history } from 'umi';

// const treeData = [
//   {
//     title: '0-0',
//     key: '0-0',
//     children: [
//       {
//         title: '0-0-0',
//         key: '0-0-0',
//         children: [
//           { title: '0-0-0-0', key: '0-0-0-0' },
//           { title: '0-0-0-1', key: '0-0-0-1' },
//           { title: '0-0-0-2', key: '0-0-0-2' },
//         ],
//       },
//       {
//         title: '0-0-1',
//         key: '0-0-1',
//         children: [
//           { title: '0-0-1-0', key: '0-0-1-0' },
//           { title: '0-0-1-1', key: '0-0-1-1' },
//           { title: '0-0-1-2', key: '0-0-1-2' },
//         ],
//       },
//       {
//         title: '0-0-2',
//         key: '0-0-2',
//       },
//     ],
//   },
//   {
//     title: '0-1',
//     key: '0-1',
//     children: [
//       { title: '0-1-0-0', key: '0-1-0-0' },
//       { title: '0-1-0-1', key: '0-1-0-1' },
//       { title: '0-1-0-2', key: '0-1-0-2' },
//     ],
//   },
//   {
//     title: '0-2',
//     key: '0-2',
//   },
// ];

const Title = ({ title, subTitle, multi }: any) => {
  const cls = subTitle
    ? multi
      ? 'tree-title-multi'
      : 'tree-title-multi-inline'
    : 'tree-title-single';
  return (
    <div className={cls}>
      <p>{title}</p>
      <p>{subTitle}</p>
    </div>
  );
};

export default function Sidebar(props: any) {
  const [treeData, setTreeData] = useState([]);
  const [selected, setSelected] = useState('');
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const onExpand = (expandedKeys: React.Key[]) => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(true);
  };

const setDefault = (key: string) => {
    console.log(key,'点击skkk测试')
    history.push({
      pathname: '/' + props.type,
      query: {
        selected: key,
      },
    });
    setSelectedKeys([key]);
    onExpand([key]);
  };
  const getLeaf = (data: any[]) => {
    console.log(data,'cxss')
    let key = '';
    for (let i = 0; i < data.length; i++) {
      if (data[i].children) {
        key = getLeaf(data[i].children);
        break;
      } else {
        key = data[i].key;
        break;
      }
    }
    return key;
  };

  const onCheck = (checkedKeys: React.Key[]) => {
    console.log('onCheck', checkedKeys);
    setCheckedKeys(checkedKeys);
  };
  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('onSelect', info);
    if (info.node.isLeaf) setDefault(selectedKeys[0] as string);
  };

  useEffect(() => {
    request.post(API.getMenu, { data: { type: props.type } }).then((res) => {
      setTreeData(res.data);
      if (!history.location.query?.selected) {
        const key = getLeaf(res.data);
        setDefault(key)
        onExpand([key]);
      } else {
        let key = history.location.query
        setDefault(key?.selected as string)
        onExpand([key?.selected as string]);
      }
    });
  }, []);

  return (
    <DirectoryTree
      onExpand={onExpand}
      expandedKeys={expandedKeys}
      autoExpandParent={autoExpandParent}
      onCheck={onCheck}
      checkedKeys={checkedKeys}
      onSelect={onSelect}
      treeData={treeData}
      className="sidebar"
      titleRender={(nodeData) => (
        <Title
          title={nodeData.title}
          subTitle={nodeData.subTitle}
          multi={nodeData?.children}
        />
      )}
      selectedKeys={selectedKeys}
    />
  );
};
