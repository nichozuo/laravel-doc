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
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(false);
  const [selectedDefaultKeys,setSelectedDefaultKeys] = useState<React.Key[]>([]);
  let defaultKeys = []

  const onExpand = (expandedKeys: React.Key[]) => {
    console.log('onExpand', expandedKeys);
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
  const getLeafArr = (data: any[]) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].children) {
        defaultKeys.push(data[i].key)
        getLeafArr(data[i].children)
        break;
      } else {
        defaultKeys.push(data[i].key);
        break;
      }
    }
    // setExpandedKeys(defaultKeys)
    console.log(defaultKeys,'s3')
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
        // getLeafArr(res.data)
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
    <div>{autoExpandParent?
      <DirectoryTree
        onExpand={onExpand}
        defaultExpandedKeys={expandedKeys}
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
    :''}</div>
  );
};
