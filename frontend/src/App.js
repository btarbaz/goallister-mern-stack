import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Fragment } from 'react';
import Header from './components/header/header.component';
import Dashboard from './routes/dashboard/dashboard.route';
import Register from './routes/register/register.route';
import Login from './routes/login/login.route';

function App() {
  return (
    <Fragment>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
