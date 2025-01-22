
import HeaderPetDetails from '../components/petsdetail/HeaderPetDetails';
import UserRegisteredPets from '../components/userdetail/UserRegisteredPets';
import Footer from '../components/utils/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { getMe } from '../redux/slices/AuthSlice';

function PetsProfileDetail() {
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
        <div>
            <HeaderPetDetails />
            <UserRegisteredPets />
            <Footer />
        </div>
    );
}

export default PetsProfileDetail