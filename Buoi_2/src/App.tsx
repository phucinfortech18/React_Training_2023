import { useState } from "react";
import "./App.css";
import Counter from "./Counter";
import People from "./People";
import Titile from "./Titile";

function App() {
  const data = [
    {
      id: 1,
      name: "Bertie Yates",
      image: "https://www.course-api.com/images/people/person-1.jpeg",
      age: 20,
    },
    {
      id: 2,
      name: "Hester Hogan",
      image: "https://www.course-api.com/images/people/person-2.jpeg",
      age: 21,
    },
    {
      id: 3,
      name: "Sean Walsh",
      image: "https://www.course-api.com/images/people/person-4.jpeg",
      age: 22,
    },
  ];

  const [people, setPeople] = useState(data);
  const handleClear = () => {
    setPeople([]);
  };

  return (
    <div className="w-screen h-screen">
      <div className="container w-1/3 p-8 mx-auto mt-10 bg-red-100 border">
        {/* <Counter /> */}
        <Titile />
        <People people={people} />
        <button
          className="w-full mt-8 text-white bg-red-400 border"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default App;
