import React, { Fragment, useReducer, useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./ToDoItem.module.css";
import ToDoItemInfo from "./ToDoItemInfo";

const ToDoItem = (props) => {
  const itemReducer = (state, action) => {
    switch (action.type) {
      case "SET_BEING_EDITED":
        return {
          ...state,
          beingEdited: action.payload
        };
      case "SET_EDITED_TITLE":
        return {
          ...state,
          editedTitle: action.payload
        };
      case "SET_EDITED_PRIORITY":
        return {
          ...state,
          editedPriority: action.payload
        };
      case "SET_EDITED_TIME":
        return {
          ...state,
          editedTimeRequired: action.payload
        };
      default:
        throw new Error("No action");
    }
  };

  const [state, dispatch] = useReducer(itemReducer, {
    beingEdited: false,
    editedTitle: props.title,
    editedPriority: props.priority,
    editedTimeRequired: props.timeRequired
  })

  const removeItemHandler = () => {
    props.onRemoveItem(props.title);
  };

  const editItemHandler = () => {
    dispatch({
      type: "SET_BEING_EDITED",
      payload: true,
    })
  };

  const editTitleHandler = (event) => {
    dispatch({
      type: "SET_EDITED_TITLE",
      payload: event.target.value,
    })
  };

  const cancelEditHandler = () => {
    dispatch({
      type: "SET_EDITED_TITLE",
      payload: props.title,
    })
    dispatch({
      type: "SET_EDITED_PRIORITY",
      payload: props.priority,
    })
    dispatch({
      type: "SET_EDITED_TIME",
      payload: props.timeRequired,
    })
    dispatch({
      type: "SET_BEING_EDITED",
      payload: false,
    })
  };

  const saveEditHandler = () => {
    dispatch({
      type: "SET_BEING_EDITED",
      payload: false,
    })
    props.onSaveEdit(
      props.title,
      state.editedTitle,
      state.editedPriority,
      state.editedTimeRequired
    );
  };

  const priorityChangeHandler = (event) => {
    dispatch({
      type: "SET_EDITED_PRIORITY",
      payload: event.target.value,
    })
  };

  const timeRequiredChangeHandler = (event) => {
    dispatch({
      type: "SET_EDITED_TIME",
      payload: event.target.value,
    })
  };

  return (
    <Fragment>
      {!state.beingEdited && (
        <Card className={classes.item}>
          <ToDoItemInfo
            priorityType={props.priority}
            timeRequired={props.timeRequired}
          />
          <p>{props.title}</p>

          <Button className={classes.editBtn} onClick={editItemHandler}>
            Edit
          </Button>
          <Button onClick={removeItemHandler} className={classes["done-btn"]}>
            Done!
          </Button>
        </Card>
      )}
      {state.beingEdited && (
        <Card className={classes.item}>
          <Card className={classes["edit-info"]}>
            <label>Priority:</label>
            <select onChange={priorityChangeHandler} value={state.editedPriority}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
            <label>Time in Minutes:</label>
            <input
              defaultValue={state.editedTimeRequired}
              type="number"
              onChange={timeRequiredChangeHandler}
            />
          </Card>
          <input value={state.editedTitle} onChange={editTitleHandler}></input>
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
