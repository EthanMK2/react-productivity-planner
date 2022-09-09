import ToDoList from "./components/ToDo's/ToDoList";
import ToDoControls from "./components/ToDo's/ToDoControls";
import { Fragment, useEffect, useState } from "react";

function App() {

  let toDoListItems = [];

  if (localStorage.getItem("items")) {
    toDoListItems = JSON.parse(localStorage.getItem("items"));
  }

  const [items, setItems] = useState(toDoListItems);
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const addToDoHandler = (item) => {
    setItems((prevItems) => {
      return [
        {
          id: `${Math.random().toString()}`,
          title: item.title,
          priority: item.priority,
          timeRequired: item.timeRequired,
        },
        ...prevItems,
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

  const filterItemsHandler = (filteredItemList) => {
    setFilteredItems(filteredItemList);
  }

  return (
    <Fragment>
      <ToDoControls
        addToDo={addToDoHandler}
        onFilterItems={filterItemsHandler}
        items={items}
      />
      <ToDoList
        items={filteredItems}
        onRemoveItem={removeItemHandler}
        onSaveEdit={saveEditHandler}
      />
    </Fragment>
  );
}

export default App;
