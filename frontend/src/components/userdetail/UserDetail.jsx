import { useEffect, useState } from "react";
import HomeLogoIcon from "../../assets/img/pets.png";
import SponsorHighlightMoving from "../utils/SponsorHighlightMoving";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import FormPetsProfile from "../utils/FormPetsProfile";
import PetsCardTemplateUser from "../utils/PetsCardTemplateUser";
import axios from "axios";

function UserDetail() {
  const navigate = useNavigate();

  // Function to navigate back to home
  function handleBackToHome() {
    navigate("/");
  }

  // Retrieve user data from Redux store
  const { user } = useSelector((state) => state.auth);
  const [totalPets, setTotalPets] = useState(0);
  const [userData, setUserData] = useState(null); // State for user data
  const [loading, setLoading] = useState(true); // Loading state

  // Dummy data as fallback
  const mockData = {
    name: "Lucky Welthmon",
    email: "lucky@example.com",
    birthDate: "1990-01-01",
    gender: "Male",
    photo: HomeLogoIcon,
  };

  const getAdopts = async () => {
    const response = await axios.get("http://localhost:5000/adopt/user");
    setTotalPets(response.data.totalPets);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Simulate a backend fetch
        throw new Error("Backend unavailable, using mock data.");
      } catch (err) {
        console.warn(err.message);
        setUserData(mockData); // Use mock data if fetch fails
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };
    getAdopts();
    fetchUserData();
  }, []);

  // Show loading indicator while data is being fetched
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 text-lg font-semibold">Loading...</div>;
  }

  return (
    <>
      {/* User Profile Section */}
      <section id="sec-user-profile" className="flex flex-col md:flex-row items-center justify-center py-12 bg-slate-100 p-6">
        {/* User Details */}
        <div className="bg-white p-10 md:p-14 rounded-2xl shadow-md w-full md:w-2/3">
          <button onClick={handleBackToHome} className="text-lg font-semibold text-black hover:text-red-500 mb-8 px-6 py-3 rounded-lg hover:bg-slate-800">
            ❌ Close Tab
          </button>
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* User Image */}
            <div className="w-full lg:w-1/3">
              <img src={userData.photo} alt={userData.name} className="w-full h-auto rounded-lg shadow-md hover:shadow-lg transition duration-300" />
            </div>

            {/* User Info */}
            <div className="w-full lg:w-2/3 justify-center">
              <h2 className="text-4xl font-extrabold text-gray-800 mb-6">{user?.name || userData.name}</h2>
              <p className="text-gray-600 mb-3 text-lg">
                <strong>Email:</strong> {user?.email || userData.email}
              </p>
              <p className="text-gray-600 mb-3 text-lg">
                <strong>Member sejak:</strong> {user?.createdAt || userData.birthDate}
              </p>
              <p className="text-gray-600 mb-3 text-lg">
                <strong>Pets Added:</strong> {totalPets}
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="container-full mx-auto px-5 lg:px-8 pb-20 bg-slate-100">
        <h1 className="text-4xl font-bold text-center mb-8 p-8">Your Registered Pets</h1>
        {/* Form and Sponsors Section */}
        <div className="grid grid-cols-1 px-10 md:grid-cols-2 lg:grid-cols-4 gap-10 items-center">
          <PetsCardTemplateUser />
        </div>
      </div>

      {/* Sponsor Section */}
      <SponsorHighlightMoving />
    </>
  );
}

export default UserDetail;
