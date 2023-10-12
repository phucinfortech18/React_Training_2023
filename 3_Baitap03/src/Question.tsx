import { useState } from "react";

type Props = {
  question: {
    id: number;
    title: string;
    info: string;
  };
};
const Question = ({ question }: Props) => {
  console.log(question);
  const [showInfo, setShowInfo] = useState(false);
  const handleQuestionClick = () => {
    setShowInfo(!showInfo);
  };
  return (
    <div>
      <article className="question border-green-300 shadow rounded p-5">
        <div className="flex space-x-5 justify-between">
          <h4 className="font-serif font-bold text-lg mb-3">
            {question.title}
          </h4>
          <button className="btn" onClick={handleQuestionClick}>
            {showInfo ? "-" : "+"}
          </button>
        </div>
        {showInfo && <p className="font-serif text-justify">{question.info}</p>}
      </article>
    </div>
  );
};

export default Question;
