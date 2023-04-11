import './App.css';
import CrewForm from './components/CrewForm';
import CrewList from './pages/CrewList';
import { Link } from 'wouter';

function App() {
  return (
    <div className="App text-white text-center">
      <h1 className="text-4xl">Create Your Crewmate</h1>
      <img className="w-5/12 mx-auto" src="./sussy.png" alt="Sussy Baka" />
      <br />
      <CrewForm />
      <br />
      <Link to="/crews">
        <span className="hover:text-cyan-300 cursor-pointer">
          Already Joined? Check your sussy here!
        </span>
      </Link>
    </div>
  );
}

export default App;
