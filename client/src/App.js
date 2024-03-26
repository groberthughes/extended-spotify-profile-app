import { Fragment, useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
  } from 'react-router-dom';
import { accessToken, logout, getCurrentUserProfile } from './spotify';
import { catchErrors } from './utils';
import { GlobalStyle } from './styles';
import { Login, Profile, TopArtists, TopTracks, Playlists, Playlist } from './pages';
import styled from 'styled-components';

const StyledLogoutButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0,0,0,.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 768px) {
    right: var(--spacing-lg);
  }
`;

// Scroll to top of page when changing routes
function ScrollToTop() {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  }

function App() {
    const [token, setToken] = useState(null);
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        setToken(accessToken);
        const fetchData = async() => {
            const { data } = await getCurrentUserProfile();
            setProfile(data);
        }
        catchErrors(fetchData());
    }, []);

    return (
        <div className="App">
            <GlobalStyle/>
            <header className="App-header">
                {!token ? (
                <Login />
                ) : (
                    <>
                        <StyledLogoutButton onClick={logout}>Log Out</StyledLogoutButton>
                        <Router>
                            <ScrollToTop />
                            <Routes>
                                <Route path="/top-artists" element={<TopArtists />} />
                                <Route path="/top-tracks" element={<TopTracks />} />
                                <Route path="/playlists" element={<Playlists />} />
                                <Route path="/playlists/:id" element={<Playlist />} />
                                <Route path="/" element={<Profile />} />
                            </Routes>
                        </Router>
                    </>
                )}
            </header>
        </div>
    );
}

export default App;
