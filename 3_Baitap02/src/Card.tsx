type Props = {
  person: {
    id: number;
    image: string;
    name: string;
    job: string;
    description: string;
  };
  onClickNext(): void;
  onClickPrev(): void;
  onClickRandom(): void;
};

const Card = ({ person, onClickNext, onClickPrev, onClickRandom }: Props) => {
  return (
    <div className="p-3 review">
      <div className="text-center img-container">
        <img
          className="mx-auto rounded-full w-[150px] h-[150px] text-center mb-3"
          src={person.image}
          alt=""
        />
      </div>
      <h4 className="m-3 font-serif font-bold name">{person.name}</h4>
      <p className="mb-3 text-blue-500 job">{person.job}</p>
      <p className="info">{person.description}</p>

      <div className="my-2 space-x-2 btn-container">
        <button
          className="px-5 border border-red-300 prev-btn"
          onClick={onClickPrev}
        >
          Prev
        </button>
        <button
          className="px-5 text-white bg-red-500 border next-btn"
          onClick={onClickNext}
        >
          Next
        </button>
      </div>
      <button
        className="px-5 py-1 mb-3 text-black bg-green-400 border btn-hipster"
        onClick={onClickRandom}
      >
        surprise me
      </button>
    </div>
  );
};

export default Card;
