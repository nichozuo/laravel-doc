import request from '@/plugins/request';
import { API } from '@/services/apis';
import { Tree } from 'antd';
import { useEffect, useState } from 'react';
const { DirectoryTree } = Tree;
import { history } from 'umi';

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
  const [expandedKeys, setExpandedKeys] = useState('');

  const setDefault = (key: string) => {
    setSelected(key);
    setExpandedKeys(key);
    history.push({
      pathname: '/' + props.type,
      query: {
        selected: key,
      },
    });
  };
  const onSelect = (keys: React.Key[], info: any) => {
    if (info.node.isLeaf) setDefault(keys[0] as string);
  };
  const onExpand = (keys: React.Key[], info: any) => {};

  const getLeaf = (data: any[]) => {
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

  useEffect(() => {
    if (history.location.query?.selected) {
      setSelected(history.location.query?.selected as string);
    }

    request.post(API.getMenu, { data: { type: props.type } }).then((res) => {
      setTreeData(res.data);
      if (!history.location.query?.selected) {
        const key = getLeaf(res.data);
        setDefault(key);
      }
    });
  }, []);

  return (
    <DirectoryTree
      onSelect={onSelect}
      onExpand={onExpand}
      treeData={treeData}
      className="sidebar"
      titleRender={(nodeData) => (
        <Title
          title={nodeData.title}
          subTitle={nodeData.subTitle}
          multi={nodeData?.children}
        />
      )}
      selectedKeys={[selected]}
    />
  );
}
