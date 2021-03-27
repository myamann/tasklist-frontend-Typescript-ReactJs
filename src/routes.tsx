import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import TasksForm from "./pages/Tasks/Form";
import TasksDetail from './pages/Tasks/Detail';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/tasks" exact component={Tasks} />
      <Route path="/tasks_form" exact component={TasksForm} />
      <Route path="/tasks_form/:id" exact component={TasksForm} />
      <Route path="/tasks/:id" exact component={TasksDetail} />


    </Switch>
  );
};

export default Routes;
