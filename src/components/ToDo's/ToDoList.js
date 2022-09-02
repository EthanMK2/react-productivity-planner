import React from "react";
import Card from "../UI/Card";
import ToDoItem from "./ToDoItem";
import classes from "./ToDoList.module.css";

const ToDoList = (props) => {
  const noToDoMessage = <p className={classes.noToDo}>No ToDo's Yet. Create One!</p>;

  const removeItemHandler = (titleToRemove) => {
    props.onRemoveItem(titleToRemove);
  };

  const saveEditHandler = (oldTitle, newTitle) => {  // TODO: PASS VALUES HERE FROM CREATING TODO
    props.onSaveEdit(oldTitle, newTitle)
  }

  return (
    <Card className={classes.toDoList}>
      {props.toDoItems.length === 0 && noToDoMessage}
      {props.toDoItems.map((item) => {
        return (
          <ToDoItem
            key={item.id}
            title={item.title}
            priority={item.priority}
            timeRequired={item.timeRequired}
            onSaveEdit={saveEditHandler}
            onRemoveItem={removeItemHandler}
          ></ToDoItem>
        );
      })}
    </Card>
  );
};

export default ToDoList;
