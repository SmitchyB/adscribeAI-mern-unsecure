import HomePage from './pages/HomePage';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* The H1 and P tags have been replaced with the logo image */}
        <img src="/AdscribeLogo.jpg" className="App-logo" alt="AdScribe AI Logo" />
      </header>
      <main>
        <HomePage />
      </main>
    </div>
  );
}

export default App;

