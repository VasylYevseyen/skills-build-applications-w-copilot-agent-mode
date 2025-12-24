import './App.css';

import { NavLink, Route, Routes } from 'react-router-dom';

import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function Home() {
  return (
    <div className="container py-4">
      <div className="card">
        <div className="card-body">
          <h1 className="h3 mb-2">Octofit Tracker</h1>
          <p className="text-muted mb-0">
            Use the navigation to view teams, users, activities, workouts, and the leaderboard.
          </p>
        </div>
      </div>
    </div>
  );
}

function App() {
  const navLinkClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;
  const brandClass = ({ isActive }) => `navbar-brand${isActive ? ' active' : ''}`;

  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand navbar-dark app-navbar">
        <div className="container-fluid">
          <NavLink className={brandClass} to="/">
            <span className="d-inline-flex align-items-center gap-2">
              <img
                src={`${process.env.PUBLIC_URL}/octofitapp-small.png`}
                className="app-logo"
                alt="Octofit"
              />
              <span>Octofit Tracker</span>
            </span>
          </NavLink>
          <div className="navbar-nav">
            <NavLink className={navLinkClass} to="/activities">
              Activities
            </NavLink>
            <NavLink className={navLinkClass} to="/leaderboard">
              Leaderboard
            </NavLink>
            <NavLink className={navLinkClass} to="/teams">
              Teams
            </NavLink>
            <NavLink className={navLinkClass} to="/users">
              Users
            </NavLink>
            <NavLink className={navLinkClass} to="/workouts">
              Workouts
            </NavLink>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
