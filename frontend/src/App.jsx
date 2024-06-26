import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
// import LoginFormPage from './components/LoginFormPage';
// import SignupFormPage from './components/SignupFormPage';
import Navigation from "./components/Navigation/Navigation-bonus";
import * as sessionActions from "./store/session";
import { Modal } from "./context/Modal";
import SpotsShow from "./components/SpotsShow";
import SpotDetails from "./components/SpotDetails/SpotDetails";
import CreateASpotForm from "./components/CreateASpot/CreateASpotForm";
import ManageSpots from "./components/ManageSpots/ManageSpots";
import EditSpot from "./components/EditSpot";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Modal />
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <main>
              <SpotsShow />
            </main>
          </>
        ),
      },
      {
        path: "/spots/:spotId",
        element: <SpotDetails />,
      },
      {
        path: "/spots/new",
        element: <CreateASpotForm />,
      },
      {
        path: "spots/current",
        element: <ManageSpots />,
      },
      {
        path: "spots/:spotId/edit",
        element: <EditSpot />,
      },
      // {
      //   path: 'login',
      //   element: <LoginFormPage />
      // },
      // {
      //   path: 'signup',
      //   element: <SignupFormPage />
      // }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
