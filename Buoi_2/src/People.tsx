import React from "react";

type Props = {
  people: {
    id: number;
    name: string;
    image: string;
    age: number;
  }[];
};
const People = ({ people }: Props) => {
  console.log(people);

  return (
    <div className="space-y-4">
      {people.map((person) => (
        <div key={person.id} className="flex gap-4">
          <img
            src={person.image}
            alt=""
            className="w-[75px] h-[75px] rounded-full"
          />
          <div>
            <h3 className="font-bold text-[17px]">Name: {person.name}</h3>
            <h3>Age: {person.age}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default People;
