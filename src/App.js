import ToDoList from "./components/ToDo's/ToDoList";
import ToDoControls from "./components/ToDo's/ToDoControls";
import { Fragment, useEffect, useState } from "react";

function App() {
  let toDoListItems = []

  if (localStorage.getItem("items")) {
    console.log("GETTING ITEMS")
    toDoListItems = JSON.parse(localStorage.getItem("items"))
  }

  console.log("rendered App")

  const [items, setItems] = useState(toDoListItems);

  useEffect(() => {
    console.log("SETTING EFFECT")
    localStorage.setItem("items", JSON.stringify(items))
  }, [items])

  const addToDoHandler = (item) => {
    setItems((prevItems) => {
      return [...prevItems, { title: item, id: `${Math.random().toString()}` }];
    });
  };

  const removeItemHandler = (titleToRemove) => {
    const newItems = items.filter((item) => {
      return titleToRemove !== item.title;
    });
    setItems(newItems);
  };

  const saveEditHandler = (oldTitle, newTitle) => {
    const editedItem = items.find((item) => {
      return item.title === oldTitle;
    });
    editedItem.title = newTitle;

    const indexOfOldItem = items.findIndex((object) => {
      return object.title === oldTitle;
    });

    setItems((prevItemArr) => {
      const newItems = [...prevItemArr];
      newItems[indexOfOldItem] = editedItem;
      return newItems;
    });
  };

  return (
    <Fragment>
      <ToDoControls addToDo={addToDoHandler} />
      <ToDoList
        toDoItems={items}
        onRemoveItem={removeItemHandler}
        onSaveEdit={saveEditHandler}
      />
    </Fragment>
  );
}

export default App;
