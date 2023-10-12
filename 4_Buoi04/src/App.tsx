import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
type TUser = {
  id: number;
  name: string;
  username: string;
  email: string;
};
function App() {
  const [users, setUsers] = useState<TUser[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  // function fetchUser() {
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //     .then((response) => response.json())
  //     .then((json) => setUsers(json));
  // }
  async function fetchUser() {
    // axios
    //   .get("https://jsonplaceholder.typicode.com/users")
    //   .then((response) => setUsers(response.data));
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
    } catch (error) {
      setErrorMessage("Something went wrong!!");
    }
  }
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <p>{errorMessage}</p>

      {users.map((user) => (
        <div key={user.id}>
          <p>Name: {user.name}</p>
        </div>
      ))}
    </>
  );
}

export default App;
