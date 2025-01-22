import NavList from "../utils/NavList";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../redux/slices/AuthSlice";
import { useEffect } from "react";

function NavbarNavigasi() {
  const dispatch = useDispatch();
  const { isSuccess } = useSelector((state) => state.auth);
  
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <ul className="hidden lg:flex gap-10 xl:gap-12 lg:mt-[2px]">
        
      <NavList title="Home" link="#sec-home" />
      <NavList title="Community" link="#sec-community" />
      <NavList title="Choose Pets" link="#sec-choosepets" />
      <NavList title="FAQ" link="#sec-faq" />
      <NavList title="Support Us!" link="#sec-support" />
      {isSuccess && (<NavList title="Add Your Pet" link="/register-pets" />)}
      {isSuccess && (<NavList title="Profile" link="/user-profile" />)}
      
    </ul>
  );
}

export default NavbarNavigasi;
