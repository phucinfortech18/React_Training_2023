import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import JokeList from "./components/JokeList";
import { TJoke } from "./types/joke";
// type TJoke = {
//   id: string;
//   joke: string;
//   status: number;
// };

const URL = "https://icanhazdadjoke.com";
function App() {
  const [jokes, setJokes] = useState<TJoke[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchJoke = async (quantity: number) => {
    // try {
    //   const result = [];
    //   for (let i = 0; i < 9; i++) {
    //     const response = await axios.get("https://icanhazdadjoke.com/", {
    //       headers: {
    //         Accept: "application/json",
    //       },
    //     });
    //     result.push(response.data);
    //   }
    //   setJokeList(result);
    // } catch (error) {
    //   setErrorMessage("Something went wrong!!");
    // }

    const jokesPromise = Array.from({ length: quantity }).map(() =>
      axios.get(URL, { headers: { Accept: "application/json" } })
    );
    const responses = await Promise.all(jokesPromise);
    const mapResponse = responses.map((response) => response.data);

    const responseWithVote = mapResponse.map((response) => ({
      ...response,
      votes: 0,
    }));
    setJokes(responseWithVote);
  };

  const handleFetchJokes = () => {
    fetchJoke(5);
  };

  useEffect(() => {
    fetchJoke(5);
  }, []);

  const handleVoteUp = (joke: TJoke) => {
    let newJokes = [...jokes];
    newJokes = newJokes.map((jokeItem) => {
      if (jokeItem.id === joke.id) {
        return { ...jokeItem, votes: jokeItem.votes + 1 };
      }
      return jokeItem;
    });
    setJokes(newJokes);
  };

  const handleVoteDown = (joke: TJoke) => {
    let newJokes2 = [...jokes];
    newJokes2 = newJokes2.map((jokeItem) => {
      if (jokeItem.id === joke.id) {
        return { ...jokeItem, votes: jokeItem.votes - 1 };
      }
      return jokeItem;
    });
    setJokes(newJokes2);
    console.log(newJokes2);
  };

  return (
    <div className="App">
      <p>{errorMessage}</p>
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Dad</span> Jokes
          </h1>
          <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" />
          <button className="JokeList-getmore" onClick={handleFetchJokes}>
            Fetch Jokes
          </button>
        </div>
        <JokeList
          jokes={jokes}
          onVoteUp={handleVoteUp}
          onVoteDown={handleVoteDown}
        />
      </div>
    </div>
  );
}

export default App;
