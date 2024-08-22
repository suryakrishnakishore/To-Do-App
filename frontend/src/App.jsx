import React from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import axios from "axios";
import { useState, useEffect } from "react";
import Auth from "./components/Auth";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CookiesProvider, Cookies } from "react-cookie";

function App() {
  /*const userEmail = "sskk@tatlas.com";
  const [tasks, setTasks] = useState(null);

  const auth = false;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await axios.get(`http://localhost:3000/todos/${userEmail}`);
        //  const json = await responce.json();
        console.log(responce.data);
        setTasks((prev) => {
          return (
            [...responce.data]
          )
        }
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [])

  // Sort the tasks according to dates...
  console.log(tasks);
  
    let sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));
  console.log(sortedTasks);*/
  return (
    <div className="app">
      {/*
        !auth && <Auth auth={auth}></Auth>
      */}
      {/*auth && 
        <>
        <ListHeader listName={"Hello World"}></ListHeader> 
        {sortedTasks?.map((task) => <ListItem key={task.id} task={task}></ListItem>
          )}
        </>
        */} 
      <Router>
        <Routes>
          <Route exact path="/" Component={Auth}></Route>
          <Route exact path="/todos/:userEmail" Component={ListItem}></Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
