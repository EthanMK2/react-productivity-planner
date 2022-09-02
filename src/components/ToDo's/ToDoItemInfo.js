import Card from "../UI/Card";
import classes from "./ToDoItemInfo.module.css";

const ToDoItemInfo = (props) => {
  let priorityDecal;

  switch (props.priorityType) {
    case "Low":
      priorityDecal = `${classes["low-priority"]}`;
      break;
    case "Medium":
      priorityDecal = `${classes["med-priority"]}`;
      break;
    case "High":
      priorityDecal = `${classes["high-priority"]}`;
      break;
    case "CRITICAL":
      priorityDecal = `${classes["critical-priority"]}`;
      break;
  }

  return (
    <Card className={classes['info-card']}>
      <p className={priorityDecal}>{props.priorityType}</p>
      <p>{props.timeRequired}</p>
    </Card>
  );
};

export default ToDoItemInfo;
