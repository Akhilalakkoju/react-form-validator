import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function FormPage() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    countryCode: "",
    country: "",
    city: "",
    pan: "",
    aadhaar: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!form.email.endsWith("@gmail.com")) newErrors.email = "Email must end with @gmail.com";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d+$/.test(form.phone)) newErrors.phone = "Phone must contain only numbers";
    else if (!/^\d{10}$/.test(form.phone)) newErrors.phone = "Phone must be 10 digits";

    if (!form.countryCode.trim()) newErrors.countryCode = "Country code is required";
    if (!form.country.trim()) newErrors.country = "Country is required";
    if (!form.city.trim()) newErrors.city = "City is required";

    if (!form.pan.trim()) newErrors.pan = "PAN is required";
    else if (form.pan.length !== 10) newErrors.pan = "PAN must be 10 chars";

    if (!form.aadhaar.trim()) newErrors.aadhaar = "Aadhaar is required";
    else if (!/^\d{12}$/.test(form.aadhaar)) newErrors.aadhaar = "Aadhaar must be 12 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      // Navigate to DisplayPage and pass form data
      navigate("/display", { state: form });
    }
  };

  return (
    <div className="App">
      <h2>Registration Form</h2>

      {Object.keys(form).map((key) => (
        <div key={key} className="field">
          <h3>{key}</h3>
          {key === "password" ? (
            <div className="password-row">
              <input
                className="password-input"
                name={key}
                type={show ? "text" : "password"}
                value={form[key]}
                onChange={handleChange}
                maxLength={key === "phone" ? 10 : key === "aadhaar" ? 12 : undefined}
                inputMode={key === "phone" || key === "aadhaar" ? "numeric" : undefined}
              />
              <button className="show-btn" type="button" onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </button>
            </div>
          ) : (
            <input
              name={key}
              type="text"
              value={form[key]}
              onChange={handleChange}
              maxLength={key === "phone" ? 10 : key === "aadhaar" ? 12 : undefined}
              inputMode={key === "phone" || key === "aadhaar" ? "numeric" : undefined}
            />
          )}
          <p className="error">{errors[key]}</p>
        </div>
      ))}

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default FormPage;
