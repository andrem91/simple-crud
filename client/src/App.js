import './App.css';
import { useState } from 'react';
import Axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [newWage, setNewWage] = useState(wage);

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage
    }).then(() => {
      console.log('success!')
    });
  }

  Axios.get('http://localhost:3001/employees').then((response) => {
    setEmployeeList(response.data);
  });

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then((response) => {
      setEmployeeList(employeeList.map((val) => {
        return val.id === id ? { id: val.id, name: val.name, age: val.age, country: val.country, position: val.position, wage: newWage } : val
      }))
    });
  }

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(employeeList.filter((val) => {
        return val.id !== id
      }))
    })
  }

  return (
    <div className="App">
      <div className="information">
        <h1>Employee System</h1>
        <label>Name: </label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value)
          }}
        />
        <label htmlFor="age">Age: </label>
        <input
          type="number"
          name="age"
          onChange={(event) => {
            setAge(event.target.value)
          }}
        />
        <label htmlFor="country">Country: </label>
        <input
          type="text"
          name="country"
          onChange={(event) => {
            setCountry(event.target.value)
          }}
        />
        <label htmlFor="position">Position: </label>
        <input
          type="text"
          name="position"
          onChange={(event) => {
            setPosition(event.target.value)
          }}
        />
        <label htmlFor="wage">Wage (year): </label>
        <input
          type="number"
          name="wage"
          onChange={(event) => {
            setWage(event.target.value)
          }}
        />
        <button onClick={addEmployee}>Add Employee</button>
      </div>
      <div className="employees">

        {employeeList.map((val, key) => {
          return (
            <div className="employee" key={val.id}>
              <p>Name: {val.name}</p>
              <p>Age: {val.age}</p>
              <p> Country: {val.country}</p>
              <p>Position: {val.position}</p>
              <p>Wage: {val.wage}</p>
              <input
                type="text"
                placeholder='2000'
                onChange={(event) => {
                  setNewWage(event.target.value)
                }}
              />
              <button onClick={() => { updateEmployeeWage(val.id) }}>
                Update
              </button>
              <button onClick={() => { deleteEmployee(val.id) }}>
                Delete
              </button>
            </div>
          )
        })}
      </div>
      <footer>
        <h4>Emplooyee System 2020 &copy;</h4>
      </footer>
    </div>
  );
}

export default App;
