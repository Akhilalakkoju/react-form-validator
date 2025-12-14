import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';

function DisplayPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  // Redirect to form if no data
  useEffect(() => {
    if (!data) navigate("/");
  }, [data, navigate]);

  if (!data) return null;

  const formatKey = (k) => {
    // convert camelCase or PascalCase to lowercase concatenated form: firstName -> firstname
    return k.replace(/([A-Z])/g, ' $1').replace(/\s+/g, '').toLowerCase();
  };

  return (
    <div className="App display-page">
      <h2>Entered Information</h2>
      <div className="display-list">
        {Object.keys(data).map((key) => (
          <div className="display-row" key={key}>
            <span className="label">{formatKey(key)}</span>
            <span className="sep"> : </span>
            <span className="value">{data[key]}</span>
          </div>
        ))}
      </div>
      <button onClick={() => navigate("/")}>Back to Form</button>
    </div>
  );
}

export default DisplayPage;
