import { useState } from "react";
import "./App.css";
import Card from "./Card";
import { dataPeople } from "./types/data";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClickNext = () => {
    const nextIndex =
      currentIndex < dataPeople.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(nextIndex);
  };

  const handleClcikPrev = () => {
    const prevIndex =
      currentIndex > 0 ? currentIndex - 1 : dataPeople.length - 1;
    setCurrentIndex(prevIndex);
  };

  const handleRandomPerson = () => {
    let randomNumber = Math.floor(Math.random() * dataPeople.length);
    setCurrentIndex(randomNumber);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl w-[500px] h-[500px] overflow-hidden mx-auto wrapper p-5">
      <h1 className="text-3xl font-bold underline">Bai tap 02 Slideshow</h1>

      {/* {dataPeople.map((person) => (
        <div key={person.id}> */}
      <Card
        person={dataPeople[currentIndex]}
        onClickNext={handleClickNext}
        onClickPrev={handleClcikPrev}
        onClickRandom={handleRandomPerson}
      />
      {/* </div>
      ))} */}
    </div>
  );
}

export default App;
