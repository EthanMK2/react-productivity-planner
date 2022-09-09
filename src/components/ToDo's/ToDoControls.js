import React, { Fragment, useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./ToDoControls.module.css";
import ToDoFilters from "./ToDoFilters";

const ToDoControls = (props) => {
  const [titleEntered, setTitleEntered] = useState("");
  const [priorityEntered, setPriorityEntered] = useState("Low");
  const [timeEntered, setTimeEntered] = useState("1");

  const [openedCreate, setOpenedCreate] = useState(false);

  const createToDo = () => {
    setOpenedCreate(false);
    props.addToDo({
      title: titleEntered,
      priority: priorityEntered,
      timeRequired: timeEntered,
    });
  };

  const onChangeTitle = (event) => {
    setTitleEntered(event.target.value);
  };

  const changePriorityHandler = (event) => {
    setPriorityEntered(event.target.value);
  };

  const changeTimeHandler = (event) => {
    setTimeEntered(event.target.value);
  };

  const clickedCreateHandler = () => {
    setPriorityEntered("Low");
    setOpenedCreate(true);
  };

  const canceledCreate = () => {
    setOpenedCreate(false);
  };

  const filterChangeHandler = (filteredItems) => {
    props.onFilterItems(filteredItems);
  };

  if (openedCreate) {
    return (
      <Card className={classes.controls}>
        <h1>Productivity Planner</h1>
        <div className={classes.inputDiv}>
          <label className={classes.titleLabel}>
            Name:
            <input
              className={classes.titleInput}
              type="text"
              onChange={onChangeTitle}
            />
          </label>
          <label>
            Priority:
            <select
              onChange={changePriorityHandler}
              className={classes.priorityInput}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </label>
          <label>
            Time in minutes:
            <input
              onChange={changeTimeHandler}
              type="number"
              className={classes.timeInput}
            />
          </label>
        </div>
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
        <h1>Productivity Planner</h1>
        <Button className={classes.createBtn} onClick={clickedCreateHandler}>
          Create Task
        </Button>
      </Card>
      {/* BUG. Because this re-renders with create task button, the filter settings are changed, but not the actual list state, so the list is still filtered, but the filter says its not. */}
      <ToDoFilters onFilterChange={filterChangeHandler} items={props.items} />
    </Fragment>
  );
};

export default ToDoControls;
