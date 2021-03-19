import React from "react";
import Widget from "./views/Widget";
import useAuth from "./hooks/useAuth";

const App = () => {
  const { isLoggedIn, isLoggingIn, data: authData } = useAuth();

  if (isLoggingIn) {
    return "Loading...";
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="App">
      <Widget authData={authData} />
    </div>
  );
};

export default App;
