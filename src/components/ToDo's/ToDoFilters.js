import Card from "../UI/Card";
import classes from "./ToDoFilters.module.css";

const ToDoFilters = () => {
  return (
    <Card className={classes.filters}>
      <h2>Filter</h2>
      <div>
        <label htmlFor="priority-filter">By Priority:</label>
        <select
          className={classes["filter-selection-box"]}
          id="priority-filter"
          name="priority-filter"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
        <label htmlFor="time-filter">By Time:</label>
        <input className={classes["filter-number-box"]} type="number" min="5" />
      </div>
    </Card>
  );
};

export default ToDoFilters;
