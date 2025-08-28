import './App.css';
import Client from './components/Client';

function App() {
  return (
    <div className="App">
      {
        [1, 2, 3, 4, 5, 6].map(n => (<Client name={`Client ${n}`} />))
      }
    </div>
  );
}

export default App;
