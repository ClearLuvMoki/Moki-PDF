import React from 'react';
import ReactDOM from 'react-dom/client';
import {HashRouter} from 'react-router-dom';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/locale/zh_CN';
import App from "./App"
import "./index.less"


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ConfigProvider
        locale={zhCN}
    >
        <HashRouter>
            <App/>
        </HashRouter>
    </ConfigProvider>
);
