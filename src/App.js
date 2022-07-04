import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import './App.css'
// pages of frontend
import Homepage from "./pages/Homepage";
import Post from "./pages/Post";
import SignIn from "./pages/SignIn";

// admin pages
import { AdminPage } from "./Adminpages/AdminPage";
import { PrivateRoute } from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {

  return (
    <BrowserRouter>
      <>
        <div className="App">
          <AuthProvider>
            <Routes>
              {/* public pages */}
              <Route path="/" exact element={
                  <Homepage />} />

              <Route path="/post/:id/" element={
                  <Post />} />

              <Route path="/signin" element={
                <SignIn />} />

              {/* admin pages */}
              <Route path="/admin" element={
                <PrivateRoute >
                  <AdminPage name="admin" />
                </PrivateRoute>} />

              <Route exact path="/admin-profile" element={
                <PrivateRoute >
                  <AdminPage name="profile" />
                </PrivateRoute>} />

              <Route exact path="/admin-about" element={
                <PrivateRoute >
                  <AdminPage name="about" />
                </PrivateRoute>} />

              <Route exact path="/admin-sociallinks" element={
                <PrivateRoute >
                  <AdminPage name="sociallinks" />
                </PrivateRoute>} />

              <Route exact path="/admin-education" element={
                <PrivateRoute >
                  <AdminPage name="education" />
                </PrivateRoute>} />

              <Route exact path="/admin-experiance" element={
                <PrivateRoute >
                  <AdminPage name="experiance" />
                </PrivateRoute>} />

              <Route exact path="/admin-skills" element={
                <PrivateRoute >
                  <AdminPage name="skills" />
                </PrivateRoute>} />

              <Route exact path="/admin-projects" element={
                <PrivateRoute >
                  <AdminPage name="projects" />
                </PrivateRoute>} />

              <Route exact path="/admin-posts" element={
                <PrivateRoute >
                  <AdminPage name="posts" />
                </PrivateRoute>} />

              <Route exact path="/admin-certificates" element={
                <PrivateRoute >
                  <AdminPage name="certificates" />
                </PrivateRoute>} />

            </Routes>
          </AuthProvider>

        </div>

      </>
    </BrowserRouter>
  );
}

export default App;
