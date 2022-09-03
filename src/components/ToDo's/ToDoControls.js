import React, { Fragment, useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./ToDoControls.module.css";
import ToDoFilters from "./ToDoFilters";

const ToDoControls = (props) => {
  const [titleEntered, setTitleEntered] = useState("");
  // TODO: manage new todo states of priorityEntered and timeEntered

  const [openedCreate, setOpenedCreate] = useState(false);

  const createToDo = () => {
    setOpenedCreate(false);
    props.addToDo({title: titleEntered, priority: "Low", timeRequired: "20min"});
  };

  const onChangeTitle = (event) => {
    setTitleEntered(event.target.value);
  };

  const clickedCreateHandler = () => {
    setOpenedCreate(true);
  };

  const canceledCreate = () => {
    setOpenedCreate(false);
  };

  if (openedCreate) {
    return (
      <Card className={classes.controls}>
        <h1>ToDo</h1>
        <label className={classes.titleLabel}>
          Name:
          <input
            className={classes.titleInput}
            type="text"
            onChange={onChangeTitle}
          />
        </label>
        <br />
        <Button onClick={canceledCreate}>Cancel</Button>
        <Button className={classes.createBtn} onClick={createToDo}>
          Create
        </Button>
      </Card>
    );
  }

  return (
    <Fragment>
      <Card className={classes.controls}>
        <h1>ToDo</h1>
        <Button className={classes.createBtn} onClick={clickedCreateHandler}>
          Create ToDo
        </Button>
        <Button>Completion History</Button>
      </Card>
      <ToDoFilters />
    </Fragment>
  );
};

export default ToDoControls;
