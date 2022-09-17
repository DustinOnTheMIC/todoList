import React from "react";
import Layout from "./components/layout/layout";
import ListTodo from "./components/todoList/listTodo/listTodo";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './app.css';
import { RouteConfig } from "./config/routeConfig";
import CreateTodo from "./components/todoList/createTodo/createTodo";
import Alert from "./components/common/alert/alert";

const App = () => {
    return (
        <Layout>
            <BrowserRouter>
                <Routes>
                    <Route path={RouteConfig.list} element={<ListTodo />} />
                    <Route path={RouteConfig.create} element={<CreateTodo />} />
                </Routes>
                <Alert />
            </BrowserRouter>
        </Layout>
    )
};

export default App;
