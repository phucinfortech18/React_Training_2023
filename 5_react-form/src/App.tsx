import { useRef, useState } from "react";
import "./App.css";

function App() {
  // const [name, setName] = useState("");
  // const [gender, setGender] = useState("");

  const [form, setForm] = useState({
    name: "",
    gender: "male",
  });
  const [users, setUsers] = useState<any[]>([]);

  // const handleChangeName = (e: any) => {
  //   // setName(e.target.value);
  //   setForm({ ...form, name: e.target.value });
  // };

  // const handleChangeGender = (e: any) => {
  //   // setGender(e.target.value);
  //   setForm({ ...form, gender: e.target.value });
  // };

  const handleChangeFormData = (e: any, field: string) => {
    setForm({
      ...form,
      [field]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setUsers([
      ...users,
      {
        name: form.name,
        gender: form.gender,
      },
    ]);

    setForm({
      name: "",
      gender: "male",
    });
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <label>Name: </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => {
            handleChangeFormData(e, "name");
          }}
        />
        <br />
        <select
          value={form.gender}
          onChange={(e) => {
            handleChangeFormData(e, "gender");
          }}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>{" "}
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <p>Name: {user.name}</p>
            <p>Gender: {user.gender}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
