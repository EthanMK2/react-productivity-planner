import { useState } from "react";
import Card from "../UI/Card";
import classes from "./ToDoFilters.module.css";

const ToDoFilters = (props) => {
  const [priorityFilter, setPriorityFilter] = useState("none");
  const [timeFilter, setTimeFilter] = useState(null);

  const filterItems = (priorityFilter, timeFilter) => {
    let displayedItems = props.items;

    if (props.priorityFilter !== "none" || props.timeFilter) {
      // doesn't run when both are none/null (displays normal list)
      console.log("AT LEAST ONE FILTER IS SET");

      if (priorityFilter !== "none" && !timeFilter) {
        // priority something, time null
        console.log("Priority is Something, time is NULL");
        displayedItems = props.items.filter((item) => {
          if (item.priority === priorityFilter) {
            return true;
          }
          return false;
        });
      }
      if (priorityFilter === "none" && timeFilter) {
        // priority none, time something
        console.log("Priority is NONE, time is Something");
        displayedItems = props.items.filter((item) => {
          if (+item.timeRequired <= +timeFilter) {
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

      if (priorityFilter !== "none" && timeFilter) {
        // priority something, time something
        console.log("Priority is Something, time is Something");
        displayedItems = props.items.filter((item) => {
          if (
            item.priority === priorityFilter &&
            +item.timeRequired <= +timeFilter
          ) {
            return true;
          }
          return false;
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
    return displayedItems;
  };

  const prFilterChangeHandler = (event) => {
    setPriorityFilter(event.target.value);
    props.onFilterChange(filterItems(event.target.value, timeFilter));  // should get latest states this way
  };

  const timeFilterChangeHandler = (event) => {
    setTimeFilter(event.target.value);
    props.onFilterChange(filterItems(priorityFilter, event.target.value));
  };

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
        <input
          className={classes["filter-number-box"]}
          type="number"
          min="1"
          onChange={timeFilterChangeHandler}
        />
      </div>
    </Card>
  );
};

export default ToDoFilters;
