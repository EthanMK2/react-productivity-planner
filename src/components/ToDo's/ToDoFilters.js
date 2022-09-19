import { useState } from "react";
import Card from "../UI/Card";
import classes from "./ToDoFilters.module.css";

const ToDoFilters = (props) => {
  const [priorityFilter, setPriorityFilter] = useState("none");
  const [timeFilter, setTimeFilter] = useState(null);

  const filterChangeHandler = (priorityFilter, timeFilter) => {
    props.onFilterChange(priorityFilter, timeFilter);
  }

  const prFilterChangeHandler = (event) => {
    setPriorityFilter(event.target.value);
    filterChangeHandler(event.target.value, timeFilter)
    console.log("Priority Filter change.")
  }

  const timeFilterChangeHandler = (event) => {
    setTimeFilter(event.target.value);
    filterChangeHandler(priorityFilter, event.target.value)
    console.log("Time Filter Change")
  }

  return (
    <Card className={classes.filters}>
      <h2>Filter</h2>
      <div>
        <label htmlFor="priority-filter">By Priority:</label>
        <select
          className={classes["filter-selection-box"]}
          id="priority-filter"
          name="priority-filter"
          onChange={prFilterChangeHandler}
        >
          <option value="none">None</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="CRITICAL">Critical</option>
        </select>
        <label htmlFor="time-filter">By Time:</label>
        <input className={classes["filter-number-box"]} type="number" min="1" onChange={timeFilterChangeHandler} />
      </div>
    </Card>
  );
};

export default ToDoFilters;
