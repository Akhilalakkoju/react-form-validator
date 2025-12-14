import { Routes, Route } from 'react-router-dom';
import FormPage from './FormPage';
import DisplayPage from './DisplayPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<FormPage />} />
      <Route path="/display" element={<DisplayPage />} />
    </Routes>
  );
}

export default App;

