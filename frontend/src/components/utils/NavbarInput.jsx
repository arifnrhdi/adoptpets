// src/components/utils/NavbarInput.jsx
// import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../../redux/slices/AuthSlice';
import { useEffect } from 'react';
import { Logout, reset } from '../../redux/slices/AuthSlice';


function NavbarInput({ isMobileMenuOpen, toggleMobileMenu, toggleSearchModal }) {
    // Optional: Handle search input visibility
    // const [isSearchOpen, setIsSearchOpen] = useState(false);
    const dispatch = useDispatch();
    const { isSuccess } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    const LogOut = () => {
        dispatch(Logout());
        dispatch(reset());
      };

    const handleSearchToggle = () => {
        toggleSearchModal();
    }

    return (
      <div className="relative z-50 flex items-center">
        <ul className="lg:flex hidden mt-[2px] items-center gap-7 xl:gap-9">
          <li className="relative">
            <div className="cursor-pointer active:scale-[.90] transition duration-300 ease-in-out" id="search-button" onClick={handleSearchToggle}>
              <i className="ri-search-line text-2xl"></i>
            </div>
          </li>
          {isSuccess === false && (
            <li className="active:scale-[.90] transition duration-300 ease-in-out">
              <a href="/login" className="font-medium block font-Sawa text-center text-paleBlue hover:text-slate-700">
                Sign in
              </a>
            </li>
          )}
          {isSuccess === false && (
            <li>
              <a href="/create-account" className="px-7 py-2 rounded-md bg-slate-700 font-medium text-white active:scale-[.90] transition duration-300 ease-in-out hover:bg-slate-800 hover:text-slate-100">
                Sign up
              </a>
            </li>
          )}
          {isSuccess && (
            <li>
              <button onClick={LogOut} className="px-8 py-3 rounded-md bg-slate-600 font-medium text-white hover:bg-red-600">
                Log Out
              </button>
            </li>
          )}
        </ul>

        {/* Tombol Hamburger / Close */}
        <button className="block lg:hidden focus:outline-none ml-4" onClick={toggleMobileMenu} aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}>
          {isMobileMenuOpen ? <i className="ri-close-line text-3xl"></i> : <i className="ri-menu-line text-3xl"></i>}
        </button>
      </div>
    );
}

NavbarInput.propTypes = {
    isMobileMenuOpen: PropTypes.bool.isRequired,
    toggleMobileMenu: PropTypes.func.isRequired,
    toggleSearchModal: PropTypes.func.isRequired,
};

export default NavbarInput;
