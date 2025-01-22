import { useEffect, useState } from "react";
// import googleLogoIcon from '../../assets/img/7123025_logo_google_g_icon.png';
// import HomeLogoIcon from '../../assets/img/pets.png';
import SponsorHighlightMoving from "../utils/SponsorHighlightMoving";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

function PetsProfileForm() {
  // const [adopt, setAdopt] = useState([]);
  const [name, setName] = useState("");
  const [petName, setpetName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [url, setUrl] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  function handleBackToHome() {
    navigate("/"); // This will navigate to the home page
  }

  function handleToFeedbackForm() {
    navigate("/feedback-form");
  }

  // const [petData, setPetData] = useState(null);
  // const [loading, setLoading] = useState(true);

  const getAdoptById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/adopt/${id}`);
      const { name, petname, age, gender, location, contact, url } = response.data;
      setName(name);
      setpetName(petname);
      setAge(age);
      setGender(gender);
      setLocation(location);
      setContact(contact);
      setUrl(url);
    } catch (error) {
      if (!id) {
        console.error("UUID is undefined");
        return;
      }

      console.log(error);
    }
  };

  useEffect(() => {
    getAdoptById();
  }, [id]);

  return (
    <>
      {/* Pet Profile Section */}
      <section id="sec-pet-profile" className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-slate-100 p-6">
        {/* Pet Details */}
        <div className="bg-white p-10 md:p-14 rounded-2xl shadow-2xl w-full md:w-2/3 transform transition duration-100 hover:scale-105">
          <button onClick={handleBackToHome} className="text-lg font-semibold text-black hover:text-red-500 mb-8  px-6 py-3 rounded-lg hover:bg-slate-800">
            ❌ Close Tab
          </button>
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Pet Image */}
            <div className="w-full lg:w-1/3">
              <img src={url} alt={name} className="w-full h-auto rounded-lg shadow-md hover:shadow-lg transition duration-300" />
            </div>

            {/* Pet Details */}
            <div className="w-full lg:w-2/3 justify-center">
              <h2 className="text-4xl font-extrabold text-gray-800 mb-6">{petName}</h2>
              <p className="text-gray-600 mb-3 text-lg">
                <strong>Animal Type:</strong> {name}
              </p>
              <p className="text-gray-600 mb-3 text-lg">
                <strong>Pets Age:</strong> {age}
              </p>
              <p className="text-gray-600 mb-3 text-lg">
                <strong>Gender:</strong> {gender}
              </p>
              <p className="text-gray-600 mb-3 text-lg">
                <strong>Location:</strong> {location}
              </p>
              <p className="text-gray-600 mb-3 text-lg">
                <strong>Contact:</strong> {contact}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link to={handleBackToHome} className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-transform transform hover:scale-105">
              🐾 Adopt Pet
            </Link>
            <Link to={`http://wa.me/${contact}`} className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-transform transform hover:scale-105">
              📱 Contact
            </Link>
            <Link to={handleToFeedbackForm} className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-transform transform hover:scale-105">
              ⚠️ Report This Page
            </Link>
          </div>
        </div>
      </section>

      <SponsorHighlightMoving />
    </>
  );
}

export default PetsProfileForm;
