import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LandingPage from './Screens/LandingPage/LandingPage';
import {BrowserRouter as Router, Route} from "react-router-dom";
import MyNotes from './Screens/MyNotes/MyNotes';
import LoginPage from './Screens/LoginPage/LoginPage';
import RegisterPage from './Screens/RegisterPage/RegisterPage';
import CreateNote from './Screens/CreateNote/CreateNote';

function App() {
  return (
       <Router>
         <Header />
         <main>
          <Route  path="/"   component={LandingPage} exact/>
          <Route path="/login"  component={LoginPage}/>
          <Route path="/register"  component={RegisterPage}/>
          <Route path="/mynotes"  component={MyNotes}/>
          <Route path="/createnote"  component={CreateNote}  />
         </main>

         <Footer />
      </Router>
  );
}

export default App;
