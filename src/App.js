import logo from './logo.svg';
import SignUp from './pages/SignUp';
import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom';
import './App.css';
import NewLead from './components/NewLead';

function App() {
  return (
	  <Router>
		  <div className="App">
			  <Routes>
				  <Route exact path="/" element={<h1>Home</h1>} />
				  <Route path="/lead" element={<NewLead />} />
				  <Route path="/cadastro" element={<SignUp />} />
			  </Routes>
		  </div>
	  </Router>
  );
}

export default App;
