import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import 'github-markdown-css/github-markdown.css';
import { history } from 'umi';
import request from '@/plugins/request';
import { API } from '@/services/apis';

export default function Markdown(props: any) {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    console.log('markdown.tsx:::history', history.location.query);
    if (history.location.query?.selected != undefined) {
      request
        .post(API.getContent, {
          data: { type: props.type, key: history.location.query.selected },
        })
        .then((res) => {
          setMarkdown(res.data.content);
        });
    }
  }, [history.location.query]);

  return (
    <ReactMarkdown plugins={[gfm]} className="markdown-body">
      {markdown}
    </ReactMarkdown>
  );
}
