import React, { Fragment, useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./ToDoItem.module.css";
import ToDoItemInfo from "./ToDoItemInfo";

const ToDoItem = (props) => {
  const [beingEdited, setBeingEdited] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);

  const [itemPriority, setItemPriority] = useState();
  const [itemTimeRequired, setTimeRequired] = useState();

  const removeItemHandler = () => {
    props.onRemoveItem(props.title);
  };

  const editItemHandler = () => {
    setBeingEdited(true);
  };

  const editTitleHandler = (event) => {
    setEditedTitle(event.target.value)
  }

  const cancelEditHandler = () => {
    setEditedTitle(props.title)
    setBeingEdited(false)
  }

  const saveEditHandler = () => {
    setBeingEdited(false)
    props.onSaveEdit(props.title, editedTitle)
  }

  return (
    <Fragment>
      {!beingEdited && (
        <Card className={classes.item}>
          <ToDoItemInfo priorityType={props.priority} timeRequired={props.timeRequired}/>
          <p>{props.title}</p>
          
          <Button className={classes.editBtn} onClick={editItemHandler}>
            Edit
          </Button>
          <Button onClick={removeItemHandler}>Done!</Button>
        </Card>
      )}
      {beingEdited && (
        <Card className={classes.item}>
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
