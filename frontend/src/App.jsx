import { BrowserRouter, Routes, Route } from "react-router-dom";
import VendorSearchMap from "./pages/map/map";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VendorSearchMap />} />
        <Route path="/map" element={<VendorSearchMap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;