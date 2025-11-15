import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import { Link } from "react-router";
function App() {
  return (
    <>
      {/* <Tasks /> */}
      {/* <Dashboard /> */}
      <Link to="login">Login</Link>
      <h1>Welcome to SPDA</h1>
    </>
  );
}

export default App;
