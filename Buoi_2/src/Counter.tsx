import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount(count + 1);
  };
  const handleDecrease = () => {
    setCount(count - 1);
  };
  return (
    <div>
      <h1 className="m-2">Hello Counter</h1>
      <h1 className="m-20 text-3xl font-bold underline">Counter: {count}</h1>
      <button
        className="mr-2 text-white bg-black border-2 rounded-full"
        onClick={handleIncrease}
      >
        Increase
      </button>
      <button
        className="text-white bg-red-600 border-2 rounded-full"
        onClick={handleDecrease}
      >
        Decrease
      </button>
    </div>
  );
};

export default Counter;
