import "./App.css";
import Question from "./Question";
import data from "./types/data";

function App() {
  return (
    <div className="w-[600px] bg-green-100 shadow rounded mx-auto">
      <h1 className="text-3xl font-bold underline">Questions</h1>
      {data.map((question) => (
        <Question key={question.id} question={question} />
      ))}
    </div>
  );
}

export default App;
