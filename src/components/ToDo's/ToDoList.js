import React from "react";
import Card from "../UI/Card";
import ToDoItem from "./ToDoItem";
import classes from "./ToDoList.module.css";

const ToDoList = (props) => {
  const noToDoMessage = (
    <p className={classes.noToDo}>No ToDo's Yet. Create One!</p>
  );

  const removeItemHandler = (titleToRemove) => {
    props.onRemoveItem(titleToRemove);
  };

  const saveEditHandler = (oldTitle, newTitle, priority, timeRequired) => {
    props.onSaveEdit(oldTitle, newTitle, priority, timeRequired);
  };

  let displayedItems = props.toDoItems;

  console.log(
    `PriorityFilter: ${props.priorityFilter}.\n TimeFilter: ${props.timeFilter}.`
  );

  if (props.priorityFilter !== "none" || props.timeFilter) {
    // doesn't run when both are none/null (displays normal list)
    console.log("AT LEAST ONE FILTER IS SET");

    if (props.priorityFilter !== "none" && !props.timeFilter) {
      // priority something, time null
      console.log("Priority is Something, time is NULL");
      displayedItems = props.toDoItems.filter((item) => {
        if (item.priority === props.priorityFilter) {
          return true;
        }
        return false;
      });
    }
    if (props.priorityFilter === "none" && props.timeFilter) {
      // priority none, time something
      console.log("Priority is NONE, time is Something");
      displayedItems = props.toDoItems.filter((item) => {
        if (+item.timeRequired <= +props.timeFilter) {
          return true;
        }
        return false;
      });

      // sorts according to closest time to filter times
      displayedItems.sort((a, b) => {
        if (+a.timeRequired < +b.timeRequired) {
          return 1;
        }
        if (+a.timeRequired > +b.timeRequired) {
          return -1;
        }
        return 0;
      });
    }

    if (props.priorityFilter !== "none" && props.timeFilter) {
      // priority something, time something
      console.log("Priority is Something, time is Something");
      displayedItems = props.toDoItems.filter((item) => {
        if (
          item.priority === props.priorityFilter &&
          +item.timeRequired <= +props.timeFilter
        ) {
          return true;
        }
        return false
      });
      displayedItems.sort((a, b) => {
        if (+a.timeRequired < +b.timeRequired) {
          return 1;
        }
        if (+a.timeRequired > +b.timeRequired) {
          return -1;
        }
        return 0;
      });
    }
  }

  return (
    <Card className={classes.toDoList}>
      {displayedItems.length === 0 && noToDoMessage}
      {displayedItems.map((item) => {
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
