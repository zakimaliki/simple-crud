import Container from "./Container";
import { DarkModeProvider } from "./context/DarkModeContext";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ProfileDetailPage } from "./components/ProfileDetailPage";
import { FeedPage } from "./components/FeedPage";
import "./App.css";
function App() {
  return (
    <div className="App">
      <DarkModeProvider>
        <Router>
          <ul>
            <li>
              <Link to="/">To Home</Link>
            </li>
            <li>
              <Link to="/profile/Zaki" exact>
                To Zaki's Profile
              </Link>
            </li>
            <li>
              <Link to="/feed">To Feed</Link>
            </li>
          </ul>
          <Routes>
            <Route path="/" element={<Container />} />
            <Route path="/profile/:username" element={<ProfileDetailPage />} />
            <Route path="/feed" element={<FeedPage />} />
          </Routes>
        </Router>
      </DarkModeProvider>
    </div>
  );
}

export default App;
