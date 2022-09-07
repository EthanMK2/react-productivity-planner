import ToDoList from "./components/ToDo's/ToDoList";
import ToDoControls from "./components/ToDo's/ToDoControls";
import { Fragment, useEffect, useState } from "react";

function App() {

  const [priorityFilter, setPriorityFilter] = useState("none")
  const [timeFilter, setTimeFilter] = useState(null)

  let toDoListItems = [];

  if (localStorage.getItem("items")) {
    toDoListItems = JSON.parse(localStorage.getItem("items"));
  }

  const [items, setItems] = useState(toDoListItems);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const addToDoHandler = (item) => {
    setItems((prevItems) => {
      return [
        ...prevItems,
        {
          id: `${Math.random().toString()}`,
          title: item.title,
          priority: item.priority,
          timeRequired: item.timeRequired,
        },
      ];
    });
  };

  const removeItemHandler = (titleToRemove) => {
    const newItems = items.filter((item) => {
      return titleToRemove !== item.title;
    });
    setItems(newItems);
  };

  const saveEditHandler = (oldTitle, newTitle, priority, timeRequired) => {
    const editedItem = items.find((item) => {
      return item.title === oldTitle;
    });
    editedItem.title = newTitle;

    editedItem.priority = priority;

    editedItem.timeRequired = timeRequired;

    const indexOfOldItem = items.findIndex((object) => {
      return object.title === oldTitle;
    });

    setItems((prevItemArr) => {
      const newItems = [...prevItemArr];
      newItems[indexOfOldItem] = editedItem;
      return newItems;
    });
  };

  const changeFilterHandler = (priorityFilter, timeFilter) => {
    setPriorityFilter(priorityFilter);
    setTimeFilter(timeFilter);
    console.log("APP has the new filter values!")
  }

  return (
    <Fragment>
      <ToDoControls addToDo={addToDoHandler} onFilterChange={changeFilterHandler} />
      <ToDoList
        toDoItems={items}
        onRemoveItem={removeItemHandler}
        onSaveEdit={saveEditHandler}
        priorityFilter={priorityFilter}
        timeFilter={timeFilter}
      />
    </Fragment>
  );
}

export default App;
