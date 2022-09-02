import Card from "../UI/Card";
import classes from "./ToDoFilters.module.css";

const ToDoFilters = () => {
  return (
    <Card className={classes.filters}>
      <label htmlFor="priority-filter">Priority:</label>
      <select className={classes["filter-selection-box"]} id="priority-filter" name="priority-filter">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>
      <label htmlFor="time-filter">Time Required:</label>
      <input type="number" min="5"/>
    </Card>
  );
};

export default ToDoFilters;
