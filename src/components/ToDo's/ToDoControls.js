import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./ToDoControls.module.css";

const ToDoControls = (props) => {
  const [titleEntered, setTitleEntered] = useState("")
  const [openedCreate, setOpenedCreate] = useState(false);

  const createToDo = () => {
    setOpenedCreate(false)
    props.addToDo(titleEntered)
  }

  const onChangeTitle = (event) => {
    setTitleEntered(event.target.value)
  }

  const clickedCreateHandler = () => {
    setOpenedCreate(true)
  }

  const canceledCreate = () => {
    setOpenedCreate(false)
  }

  if (openedCreate) {
    return (
      <Card className={classes.controls}>
        <h1>ToDo</h1>
        <label className={classes.titleLabel}>
          Name:
          <input className={classes.titleInput} type="text" onChange={onChangeTitle}/>
        </label>
        <br/>
        <Button onClick={canceledCreate}>Cancel</Button>
        <Button className={classes.createBtn} onClick={createToDo}>Create</Button>
      </Card>
    );
  }

  return (
    <Card className={classes.controls}>
      <h1>ToDo</h1>
      <Button className={classes.createBtn} onClick={clickedCreateHandler}>Create ToDo</Button>
    </Card>
  );
};

export default ToDoControls;