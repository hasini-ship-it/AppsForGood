import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <div className="floatRight padding1"> 
          <h3 className="settingsButton">Profile</h3>
          <h3 className="settingsButton">Settings</h3>
        </div>

        <button className="butt" type="button" onclick="alert('Button clicked!')">Lesson 1</button>
      </header>
    </div>
  );
}

export default App;
