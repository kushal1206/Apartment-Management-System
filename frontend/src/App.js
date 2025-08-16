import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import MaintenanceForm from './pages/MaintenanceForm';
import MaintenanceList from './pages/MaintenanceList';
import FlatForm from './pages/FlatForm';
import FlatsList from './pages/FlatsList';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/" element={<Dashboard />} />
        <Route path="/flats" element={<FlatsList />} />
        <Route path="/flats/add" element={<FlatForm />} />
        <Route path="/flats/edit/:id" element={<FlatForm />} />
        <Route path="/maintenance" element={<MaintenanceList />} />
        <Route path="/maintenance/add" element={<MaintenanceForm />} />
        <Route path="/maintenance/edit/:id" element={<MaintenanceForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </Router>
  );
}

export default App;
