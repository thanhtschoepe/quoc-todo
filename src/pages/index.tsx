import React from "react";

type TodoItem = {
  content: string;
  done: boolean;
};

interface TodoListProps {
  data: Array<TodoItem>;
}

function TodoList({ data = [] }: TodoListProps) {
  const hasItems = data.length > 0;
  const [showAll, setShowAll] = React.useState(true);
  const onClickHandler = () => {
    setShowAll(!showAll);
  };
  return (
    <div>
      <button onClick={onClickHandler}>
        {showAll ? "Show not done" : "Show all"}
      </button>
      {hasItems ? (
        <ul>
          {data
            .filter((element) => {
              if (showAll) return true;
              return !element.done;
            })
            .map((element) => {
              return (
                <li
                  style={{ opacity: element.done ? "10%" : "100%" }}
                  key={element.content}
                >
                  {element.content}
                </li>
              );
            })}
        </ul>
      ) : (
        <p>All done!</p>
      )}
    </div>
  );
}

export default function Home() {
  const contents = [
    { content: "Xay app", done: false },
    { content: "Deploy app", done: true },
    { content: "Chay ad", done: false },
  ];

  const [items, setItems] = React.useState<Array<TodoItem>>(contents);
  const [inputValue, setInputValue] = React.useState("");

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const newItem: TodoItem = {
            content: inputValue,
            done: false,
          };

          setItems([...items, newItem]);
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <TodoList data={items} />
      <button
        onClick={(id) => {
          const newArray = [...items];
          const index = newArray.findIndex((element) => element.content === id);

          if (index > -1) {
            newArray[index].done = !newArray[index].done;
            setItems(newArray);
          }
        }}
      >
        Mark Hello as done
      </button>
      <button
        onClick={(_) => {
          setItems([]);
        }}
      >
        Clear all
      </button>
    </div>
  );
}
