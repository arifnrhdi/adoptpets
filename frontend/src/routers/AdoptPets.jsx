import { createBrowserRouter } from "react-router-dom";


import HomePage from "../pages/HomePage";
import CreateAccount from "../pages/CreateAccount";
import LoginPage from "../pages/LoginPage";
import ErrorPage from "../pages/ErrorPage";
import FormAddedPets from "../pages/FormAddedPets";
import PetsDetail from "../pages/PetsDetail";
import UserProfile from "../pages/UserProfile";
import TermsAndPrivacy from "../pages/TermsAndPrivacy";
import FeedBackForm from "../pages/FeedBackForm";
import FormEditPets from "../pages/FormEditPets"
import PetsProfileDetail from "../pages/PetsProfileDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/create-account",
        element: <CreateAccount />,
      },
      {
        path: "/register-pets",
        element: <FormAddedPets />,
      },
      {
        path: "/pets/:id",
        element: <PetsDetail />,
      },
      {
        path: "/pets/profile/:id",
        element: <PetsProfileDetail />,
      },
      {
        path: "/pets/edit/:id",
        element: <FormEditPets />,
      },
      {
        path: "/user-profile",
        element: <UserProfile />,
      },
      {
        path: "/terms-and-privacy",
        element: <TermsAndPrivacy />,
      },
      {
        path: "/feedback-form",
        element: <FeedBackForm />,
      },
    ],
  },
]);
