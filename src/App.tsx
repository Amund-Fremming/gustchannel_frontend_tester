import './App.css';
import Client from './components/Client';

function App() {
  return (
    <div className="App">
      {
        [1, 2, 3, 4, 5, 6].map(n => {
          if (n < 4) {
            return (
              <Client name={`Client ${n}`} hub='one' />
            );
          }

          return (
            <Client name={`Client ${n}`} hub='two' />
          )
        }
        )}
    </div>
  );
}

export default App;
