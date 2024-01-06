import './App.css';
import TaskList from "./components/TaskList.js";

function App() {
    return(
        <div className="App">
            <h1 className="App-header">My Cozy To Do</h1>
            <TaskList />
        </div>
    );
}

export default App;
