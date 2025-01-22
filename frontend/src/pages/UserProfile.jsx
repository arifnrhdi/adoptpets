import HeaderUserDetail from "../components/userdetail/HeaderUserDetail";
import UserDetail from "../components/userdetail/UserDetail";
import Footer from "../components/utils/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../redux/slices/AuthSlice";

function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, user, navigate]);

  return (
    <>
      <HeaderUserDetail />
      <UserDetail />
      <Footer />
    </>
  );
}

export default UserProfile;
