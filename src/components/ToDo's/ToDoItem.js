import React, { Fragment, useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./ToDoItem.module.css";
import ToDoItemInfo from "./ToDoItemInfo";

const ToDoItem = (props) => {
  const [beingEdited, setBeingEdited] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedPriority, setEditedPriority] = useState(props.priority);
  const [editedTimeRequired, setEditedTime] = useState(props.timeRequired);

  const removeItemHandler = () => {
    props.onRemoveItem(props.title);
  };

  const editItemHandler = () => {
    setBeingEdited(true);
  };

  const editTitleHandler = (event) => {
    setEditedTitle(event.target.value);
  };

  const cancelEditHandler = () => {
    setEditedTitle(props.title);
    setEditedPriority(props.priority);
    setEditedTime(props.timeRequired)
    setBeingEdited(false);
  };

  const saveEditHandler = () => {
    setBeingEdited(false);
    props.onSaveEdit(props.title, editedTitle, editedPriority, editedTimeRequired);
  };

  const priorityChangeHandler = (event) => {
    setEditedPriority(event.target.value);
  }

  const timeRequiredChangeHandler = (event) => {
    setEditedTime(event.target.value)
  }

  return (
    <Fragment>
      {!beingEdited && (
        <Card className={classes.item}>
          <ToDoItemInfo
            priorityType={props.priority}
            timeRequired={props.timeRequired}
          />
          <p>{props.title}</p>

          <Button className={classes.editBtn} onClick={editItemHandler}>
            Edit
          </Button>
          <Button onClick={removeItemHandler} className={classes["done-btn"]}>Done!</Button>
        </Card>
      )}
      {beingEdited && (
        <Card className={classes.item}>
          <Card className={classes["edit-info"]}>
            <label>Priority:</label>
            <select onChange={priorityChangeHandler} value={editedPriority}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
            <label>Time in Minutes:</label>
            <input defaultValue={editedTimeRequired} type="number" onChange={timeRequiredChangeHandler}/>
          </Card>
          <input value={editedTitle} onChange={editTitleHandler}></input>
          <Button className={classes.editBtn} onClick={cancelEditHandler}>
            Cancel
          </Button>
          <Button onClick={saveEditHandler}>Save</Button>
        </Card>
      )}
    </Fragment>
  );
};

export default ToDoItem;
