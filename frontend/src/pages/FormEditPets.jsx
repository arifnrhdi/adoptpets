import HeaderRegistrationEdit from "../components/formregistrationedit/HeaderRegistrationEdit";
import FormRegistrationEdit from "../components/formregistrationedit/FormRegistrationEdit";
import Footer from "../components/utils/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { getMe } from "../redux/slices/AuthSlice";

function FormAddedPets() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);

    useEffect(() => {
      dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
      if (isError) {
        navigate("/login");
      }
    }, [isError, user, navigate]);

    return (
        <>
            <HeaderRegistrationEdit/>
            <FormRegistrationEdit />
            <Footer />
        </>
    );
}

export default FormAddedPets;