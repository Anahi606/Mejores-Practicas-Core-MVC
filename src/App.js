import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Login from './components/crud/Login';
import Game from './components/crud/Game';
import NotAuthorized from './components/NotAuthorized';
import GameDetails from './components/GameDetails';
import { useAuthService } from './hooks/useAuthService';

function AppWrapper() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [isGameLoading, setIsGameLoading] = useState(true);

  //Auth service - DIP
  const { getCurrentUser, getUserRole } = useAuthService();

  useEffect(() => {
    const validateSession = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) {
          if (location.pathname !== '/') navigate('/');
          setLoading(false);
          setIsGameLoading(false);
          return;
        }
        const role = await getUserRole(user.id);
        setUserRole(role);
        if (role === 'user' && location.pathname === '/') {
          navigate('/userPage');
        }
        if (role === 'admin' && location.pathname === '/') {
          navigate('/game');
        }
        setLoading(false);
        setIsGameLoading(false);
      } catch (error) {
        if (location.pathname !== '/') navigate('/');
        setLoading(false);
        setIsGameLoading(false);
      }
    };
    validateSession();
  }, [navigate, location.pathname]);

  if (loading) return null;

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route 
          path="/game" 
          element={
            isGameLoading ? (
              <div className="loading-container">
                <div className="loading-spinner">Cargando...</div>
              </div>
            ) : (
              <Game />
            )
          } 
        />
        <Route path="/userPage" element={<NotAuthorized />} />
        <Route path="/game/:id" element={<GameDetails />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
