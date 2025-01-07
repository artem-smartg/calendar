
import './App.css';
import Calendar from './components/Calendar';
import Navbar from './components/Navbar';
import Toolbar from "@mui/material/Toolbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Toolbar />
      <Calendar />
    </div>
  );
}

export default App;
