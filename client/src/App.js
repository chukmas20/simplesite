import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LandingPage from './Screens/LandingPage/LandingPage';
import {BrowserRouter as Router, Route} from "react-router-dom";
import MyNotes from './Screens/MyNotes/MyNotes';
import LoginPage from './Screens/LoginPage/LoginPage';
import RegisterPage from './Screens/RegisterPage/RegisterPage';
import CreateNote from './Screens/CreateNote/CreateNote';
import SingleNote from './Screens/SingleNote/SingleNote';
import {useState} from "react";
import ProfileScreen from './Screens/PofileScreen/ProfileScreen';

function App() {
  const [search, setSearch] = useState("");
  console.log(setSearch);
  return (
       <Router>
         <Header  setSearch = {setSearch}/>
         <main>
          <Route  path="/"   component={LandingPage} exact/>
          <Route path="/login"  component={LoginPage}/>
          <Route path="/profile"  component={ProfileScreen}/>
          <Route path="/register"  component={RegisterPage}/>
          <Route path="/createnote"  component={CreateNote} />
          <Route path="/note/:id"  component={SingleNote}/>
          <Route path="/mynotes"  component={ ()=> <MyNotes search={search} /> } />
         </main>

         <Footer />
      </Router>
  );
}

export default App;
