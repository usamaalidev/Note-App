import { RouterProvider, createHashRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./components/Home/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import UserProvider from "./Context/UserContext.jsx";
import Overlay from "./components/Overlay/Overlay.jsx";
import NoteProvider from "./Context/NoteContext.jsx";

let routes = createHashRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "note", element: <Overlay /> },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "signup", element: <Register /> },
]);

function App() {
  return (
    <UserProvider>
      <NoteProvider>
        <RouterProvider router={routes}></RouterProvider>
      </NoteProvider>
    </UserProvider>
  );
}

export default App;