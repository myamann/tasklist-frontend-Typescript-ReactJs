import React, {useState, useEffect} from "react";
import { Table,Badge,Button } from "react-bootstrap";
import api from '../../services/api';

import moment from 'moment'

interface ITask {
    id: number;
    title:string;
    description: string;
    finished: boolean;
    created_at: Date;
    updated_at: Date;
}

const Tasks: React.FC = () => {

    const [tasks, setTasks] = useState<ITask[]>([])

    useEffect(()=>{
        loadTasks()
    },[])

    async function loadTasks() {
        const response = await api.get('/tasks')
        console.log(response)
        setTasks(response.data)
    }

    // Editing our date with moment.js
    function formateDate(date:Date) {
        return moment(date).format("DD/MM/YYYY")
    }

  return (
    <div className="container">
      <br />
      <h1>Tasks Page</h1>
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

    {
        tasks.map(task => (
            <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.title}</td>
            <td>{ formateDate(task.updated_at)}</td>
            <td>
                <Badge variant={task.finished ? "success" : "warning" }>
                    { task.finished ? "Completed" : "Waiting"}
                </Badge>
                </td>
            <td>
                <Button size="sm" className="mr-1" >Edit</Button>
                <Button size="sm" className="mr-1" variant="success">Complete</Button>
                <Button size="sm" className="mr-1" variant="info">Details</Button>
                <Button size="sm" variant="danger">Remove</Button>
            </td>

          </tr>
        ))
    }

         
         
        </tbody>
      </Table>
    </div>
  );
};

export default Tasks;
