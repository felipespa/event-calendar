import "./App.css";
// import { getEventsEndpoint } from "./backend";
import Calendar from "./components/Calendar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  // getEventsEndpoint().then((events) => {
  //   for (const event of events) {
  //     console.log(event);
  //   }
  // });

  return (
    <Router>
      <Routes>
        <Route path="/calendar">
          <Calendar />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
