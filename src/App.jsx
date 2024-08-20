import { dogsData } from "./data";
import { useState } from "react";
import DogDetails from "./dogDetails";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [dogs, setDogs] = useState(dogsData);
  const [showNewDogFrom, setshowNewDogForm] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectOption, setSelectOption] = useState("");
  const [newDog, setNewDog] = useState({
    id:uuidv4() ,
    name: "",
    age: 0,
    contact:"",
      present: false,
      grade: "100",
      notes: "The goodest new dog",
  })
  
  const toggleNewDogForm = () => {
    setshowNewDogForm(!showNewDogFrom);
  }
  const handleCheckboxChange = () => {
    setChecked(!checked);
  }

  const handleSelectChange = (e) => {
    console.log(e.target.value)
    setSelectOption(e.target.value)
  }

  const handleTextChange = (e) => {
  //  if (e.target.id === "name"){
  //   setNewDog({...newDog, name: e.target.value})
  //  } else if (e.target.id === "age"){
  //   setNewDog({...newDog, age: e.target.value})
  //  } else if(e.target.id === "contact"){
  //   setNewDog({...newDog, contact: e.target.value})
  //  }
  setNewDog({...newDog, [e.target.id] : e.target.value})
  }
  const handleSubmit = () => {
    epreventDefault
  }
  const addDog = () => {
    console.log("adding dog");
    const newDog = {
      id: dogs.length + 50,
      name: "Rover",
      present: false,
      grade: "100",
      notes: "The goodest new dog",
    };
    setDogs([...dogs, newDog]);
    //we are using our set function to update statw
    // we are creating a new array so react knows that it must rerender the webpage
    // we are copying the contnent of the current state with the spread opeator and adding the new dog
  };
  const removeDog = (dogId) => {
    console.log("removing dog");
    //our new state will be all the dogs that do not match the id that was passed to the functions
    const filteredDogs = dogs.filter((dog) => dog.id !== dogId);
    setDogs(filteredDogs);
  };
  const updateDogAttendance = () => {
    console.log("update dog attendance for", dogId);
    //copying the dogs arrays so we can update our copy
    const dogsArr = [...dogs];
    // find the dog with the matching id number's array position
    const index = dogArr.findIndex((dog) => dog.id === dogId);
    // access the dogs present property and toggle with the bang operator
    dogsArr(index).present = !dogsArr[index].present;

    setDogs(dogsArr);
  };
  console.log(newDog)
  return (
    <div className="App">
      <header>
        <h1> Bark and Bowl Doggy Day Care</h1>
        <h2>{new Date().toDateString()}</h2>
      </header>
      <aside>
        <button onClick={toggleNewDogForm}>
          {!showNewDogFrom ? "Add a new dog" : "Hide Form"}
        </button>
        {showNewDogFrom && (
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:
            </label>
            <input type="text" id="name" value={newDog.name} onChange={handleTextChange} />
            <label htmlFor="age">Age:
            </label>
            <input type="number"  min="0" id="age" value={newDog.age} onChange={handleTextChange}  />
            <label htmlFor="contact">Contact:
            </label>
            <input type="email" id="contact" value={newDog.contact} onChange={handleTextChange}  />
            <label htmlFor="favFlavor">Favorite flavor:</label>
            <select id="favFlavor" onChange={handleSelectChange}>
            <option value=""></option>
            <option value="beed">Beef</option>
            <option value="chicken">Chicken</option>
            <option value="bacon">Bacon</option>
            </select>
            <label>
              Like swimming
            </label>
            <input type="checkbox" checked={checked} onChange={handleCheckboxChange} />
            <input type="submit" />
          </form>
        )}
      </aside>
      <main>
        {/* <button onClick={addDog}>Add a new dog</button> */}
        <ul>
          {dogs.map((dog) => {
            return (
              <li key={dog.id}>
                <span
                  onClick={() => {
                    updateDogAttendance(dog.id);
                  }}
                  style={
                    dog.present
                      ? { textDecoration: "none" }
                      : { textDecoration: "line-through" }
                  }
                >
                  {dog.name}
                </span>
                <button
                  onClick={() => {
                    removeDog(dog.id);
                  }}
                >
                  Remove
                </button>
                <DogDetails dog={dog} />
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export default App;
