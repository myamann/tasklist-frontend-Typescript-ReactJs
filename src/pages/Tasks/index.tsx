import React, { useState, useEffect } from "react";
import { Table, Badge, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import api from "../../services/api";

import moment from "moment";

import "./index.css";

interface ITask {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  created_at: Date;
  updated_at: Date;
}

const Tasks: React.FC = () => {
  const [search, setSearch] = useState('');
  const [tasks, setTasks] = useState<ITask[]>([]);
  const history = useHistory();

  const filteredTasks = tasks.filter(task => {
    return task.title.toLowerCase().includes( search.toLowerCase())
  })

  // load tasks on the page with first render
  useEffect(() => {
    loadTasks();
  }, []);


  // load all tasks from api and send to state
  async function loadTasks() {
    const response = await api.get("/tasks");
    
    setTasks(response.data);
  }

  // change status on task with id
  async function finishedTask(id: number) {
    await api.patch(`/tasks/${id}`);
    loadTasks();
  }

  // delete a task on list with id
  async function deleteTask(id: number) {
    await api.delete(`tasks/${id}`);
    loadTasks();
  }

  // Editing our date with moment.js
  function formateDate(date: Date) {
    return moment(date).format("DD/MM/YYYY");
  }

  // Link to add new form page
  function newTask() {
    history.push("tasks_form");
  }

  // Link to edit form page
  function editTask(id: number) {
    history.push(`/tasks_form/${id}`);
  }

  // Link to task detail page
  function viewTask(id: number) {
    history.push(`/tasks/${id}`);
  }

  return (
    <div className="container">
      <br />
      <div className="task-header">
        <h1>Tasks Page</h1>
        <Button variant="dark" size="sm" onClick={newTask}>
          Add Task
        </Button>
      </div>
      <br/>
      <div className="searchbar">
      <input type="text" className="searchinput" placeholder="Search your tasks..." onChange={(e)=> setSearch(e.target.value)}/>

      </div>
      
      <br/>
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Updated At</th>
            <th>Status</th>
            <th>...</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{formateDate(task.updated_at)}</td>
              <td>
                <Badge variant={task.finished ? "success" : "warning"}>
                  {task.finished ? "Completed" : "Waiting"}
                </Badge>
              </td>
              <td>
                <Button
                  size="sm"
                  className="mr-1"
                  disabled={task.finished}
                  onClick={() => editTask(task.id)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  className="mr-1"
                  disabled={task.finished}
                  variant="success"
                  onClick={() => finishedTask(task.id)}
                >
                  Complete
                </Button>
                <Button
                  size="sm"
                  className="mr-1"
                  variant="info"
                  onClick={() => viewTask(task.id)}
                >
                  Details
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => deleteTask(task.id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Tasks;
