import './App.css';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import TaskManagerApp from './Components/TaskManagerApp';

function App() {
  return (
    <div className="App">
      <TaskManagerApp />
      <ToastContainer />
    </div>
  );
}

export default App;
