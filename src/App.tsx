import { Provider } from "react-redux";
import "./App.css";
import { authContext } from "./authContext";
// import { getEventsEndpoint } from "./backend";
import { Calendar } from "./components/Calendar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { store } from "./store/tictactoeStore";

function App() {
  // getEventsEndpoint().then((events) => {
  //   for (const event of events) {
  //     console.log(event);
  //   }
  // });

  const user = { name: "nome", email: "email" };

  function onSignOut() {}

  return (
    <Provider store={store}>
      <authContext.Provider value={{ user, onSignOut }}>
        <Router>
          <Routes>
            <Route path="/calendar">
              <Calendar />
            </Route>
          </Routes>
        </Router>
      </authContext.Provider>
    </Provider>
  );
}

export default App;
