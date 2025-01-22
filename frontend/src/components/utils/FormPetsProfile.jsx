import { useState, useEffect } from "react";
import petsPictures from "../../assets/img/cat1-8ac00215.jpg";
import { Link } from "react-router-dom";

function FormPetsProfile() {
  // Data dummy untuk menggantikan fetch dari backend
  const [adopts, setAdopts] = useState([
    {
      uuid: "1",
      url: petsPictures,
      petname: "Whiskers",
      age: "2 years",
      description: "Whiskers is a friendly and playful cat looking for a loving home. He enjoys cuddles and chasing toys."
    },
    {
      uuid: "2",
      url: petsPictures,
      petname: "Fluffy",
      age: "3 years",
      description: "Fluffy loves to nap in the sun and is great with kids. She is looking for her forever home."
    },
    {
      uuid: "3",
      url: petsPictures,
      petname: "Shadow",
      age: "1 year",
      description: "Shadow is a curious and adventurous cat who loves to explore. He is very affectionate."
    }
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {adopts.map((user) => (
        <div
          key={user.uuid}
          className="relative w-80 h-[500px] mx-auto flex flex-col justify-between bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="relative group overflow-hidden h-3/5">
            <img
              src={user.url}
              alt="cat"
              className="w-full h-full object-cover transform group-hover:scale-110 transition duration-300 ease-in-out"
            />
            <div className="absolute w-full h-full bg-gradient-to-b text-center from-white/0 to-black/50 top-0">
              <Link
                to={`/pets/${user.uuid}`}
                className="px-14 text-base md:text-xl lg:text-base xl:text-xl lg:px-8 lg:mt-20 py-4 mt-32 bg-paleBlue opacity-0 group-hover:opacity-100 font-Sawa text-white rounded inline-block transition duration-300 ease-in-out hover:bg-slate-700 bg-slate-500"
              >
                Adopt now
              </Link>
              <h1 className="text-2xl md:text-3xl font-Sawa text-white font-medium lg:text-xl duration-300 ease-in-out text-center">
                666 Days Waiting
              </h1>
            </div>
          </div>
          <div id="petlist-detail" className="p-4">
            <h1 className="text-xl md:text-2xl font-Inter mb-2 font-bold text-center text-secondBlack">
              {user.petname}
            </h1>
            <p className="text-lg md:text-lg font-Sawa font-medium text-center text-gray-700">
              {user.age}
            </p>
            <p className="text-sm md:text-base font-Sawa text-center text-gray-500 mt-2">
              {user.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FormPetsProfile;