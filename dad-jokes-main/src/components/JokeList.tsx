import { TJoke } from "../types/joke";
import {
  getColorByVotes,
  getEmojiByVotes,
  sortJokesByVote,
} from "../utils/jokes";

type Props = {
  jokes: TJoke[];
  onVoteUp: (joke: TJoke) => void;
  onVoteDown: (joke: TJoke) => void;
};

function JokeList({ jokes, onVoteUp, onVoteDown }: Props) {
  const handleVoteUp = (joke: TJoke) => {
    onVoteUp(joke);
  };

  const handleVoteDown = (joke: TJoke) => {
    onVoteDown(joke);
  };

  const sortedJokes = sortJokesByVote(jokes);

  return (
    <div className="JokeList-jokes">
      {sortedJokes?.length > 0 &&
        sortedJokes.map((item) => (
          <div className="Joke" key={item.id}>
            <div className="Joke-buttons">
              <i
                className="fas fa-arrow-up"
                onClick={() => handleVoteUp(item)}
              />
              <span
                className="Joke-votes"
                style={{ borderColor: getColorByVotes(item.votes) }}
              >
                {item.votes}
              </span>
              <i
                className="fas fa-arrow-down"
                onClick={() => handleVoteDown(item)}
              />
            </div>
            <div className="Joke-text">{item.joke}</div>
            <div className="Joke-smiley">
              <i className={getEmojiByVotes(item.votes)} />
            </div>
          </div>
        ))}
    </div>
  );
}

export default JokeList;
