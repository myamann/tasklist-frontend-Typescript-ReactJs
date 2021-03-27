import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Badge, Button, Card } from "react-bootstrap";
import api from "../../../services/api";
import moment from "moment";

interface ITask {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  created_at: Date;
  updadet_at: Date;
}

interface IParams {
  id: string;
}

const Detail: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<IParams>();
  const [task, setTask] = useState<ITask>();

  useEffect(() => {
    findTask();
  }, [id]);

  function back() {
    history.goBack();
  }

  async function findTask() {
    const response = await api.get<ITask>(`/tasks/${id}`);
    
    setTask(response.data);
  }

  function formateDate(date: Date | undefined ) {
      return moment(date).format("DD/MM/YYYY")
  }

  return (
    <div className="container">
      <br />
      <div className="task-header">
        <h1>Tasks Detail</h1>
        <Button variant="dark" size="sm" onClick={back}>
          Back
        </Button>
      </div>
      <br />

      <Card>
        <Card.Body>
          <Card.Title>{task?.title}</Card.Title>

          <Card.Text>
            {task?.description}
            <br />
            <Badge variant={task?.finished ? "success": "warning"}>
               {task?.finished ? "Completed": "Waiting"}
            </Badge>
            <br/>
            <strong>Created at: </strong>
            <Badge variant="info">
               {formateDate(task?.created_at)}
            </Badge>
            <br/>
            <strong>Updated at: </strong>
            <Badge variant="info">
               {formateDate(task?.updadet_at)}
            </Badge>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Detail;
