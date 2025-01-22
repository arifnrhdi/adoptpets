import { useState } from "react";
// import petsPictures from "../../assets/img/cat1-8ac00215.jpg";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";

function PetsCardTemplateUser() {
  const [adopts, setAdopts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAdopts();
  }, []);

  const getAdopts = async () => {
    const response = await axios.get("http://localhost:5000/adopt/user");
    setAdopts(response.data.response);
  };

  return (
    <>
      {adopts.length === 0 ? (
        <h2 className="text-center text-gray-500 font-Sawa text-2xl mt-10 font-bold">No pet you added.</h2>
      ) : (
        adopts.map((user) => (
          <div key={user.uuid} className="relative">
            <div className="relative group overflow-hidden" id="petlist-img">
              <img src={user.url} alt="cat" className="mx-auto w-full h-96 object-cover rounded-lg transform group-hover:scale-110 transition duration-300 ease-in-out" />
              <div className="absolute w-full h-full bg-gradient-to-b text-center from-white/0 to-black/50 top-0">
                <Link
                  to={`/pets/profile/${user.uuid}`}
                  className="px-14 text-base md:text-xl lg:text-base xl:text-xl lg:px-8 lg:mt-28 xl:mt-40 py-4 mt-44 md:mt-52 mb-20 xs:mb-28 lg:mb-12 xl:mb-24 bg-paleBlue opacity-0 group-hover:opacity-100 font-Sawa text-white rounded inline-block transition duration-300 ease-in-out hover:bg-slate-700 bg-slate-500"
                >
                  Edit Pet
                </Link>
                <h1 className="text-2xl md:text-3xl font-Sawa text-white font-medium lg:text-xl duration-300 ease-in-out text-center">Waiting since {dayjs(user.createdAt).format("DD MMM YYYY")}</h1>
              </div>
            </div>
            <div id="petlist-detail" className="mb-4 bg-white p-4 rounded-lg shadow-lg">
              <h1 className="text-2xl md:text-3xl lg:text-2xl font-Inter mb-2 font-bold text-center text-secondBlack">{user.petname}</h1>
              <p className="text-lg md:text-xl lg:text-lg font-Sawa font-medium text-center text-gray-700">{user.age}</p>
              <p className="text-sm md:text-base lg:text-sm font-Sawa text-center text-gray-500 mt-2">{user.petname} is a friendly and playful animal looking for a loving home. He enjoys cuddles and chasing toys.</p>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default PetsCardTemplateUser;
