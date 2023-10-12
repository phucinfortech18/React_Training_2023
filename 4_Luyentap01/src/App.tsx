import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

type TUser = {
  id: number;
  name: string;
  username: string;
  email: string;
};

const URL = "https://jsonplaceholder.typicode.com/users";
function App() {
  const [users, setUsers] = useState<TUser[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  async function fetchUsers() {
    try {
      const response = await axios.get(URL);
      setUsers(response.data);
    } catch (error) {
      setErrorMessage("Something went wrong!!!!");
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log(users);

  return (
    <>
      <p>{errorMessage}</p>
      {users.map((user) => (
        <div key={user.id}>
          <p>Name: {user.name}</p>
          <p>Name: {user.email}</p>
        </div>
      ))}
    </>
  );
}

export default App;
