import { Routes, Route } from "react-router-dom";
import Navigation from "./Routes/navigation/navigation.compnent";
import Home from "./Routes/home/home.component";
import Authentication from "./Routes/Authentication/authentication.component";

const App = () => {
  const Shop = () => {
    return <h1>This is Shop page</h1>;
  };

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="Shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
