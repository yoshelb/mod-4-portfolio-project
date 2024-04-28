import "./ManageSpots.css";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserSpots } from "../../store/UserSpots";
import { useEffect } from "react";
import SpotCard from "../SpotsShow/SpotCard";
import OpenModalButton from "../OpenModalButton";
import DeleteSpotModal from "./DeleteSpotModal";

function ManageSpots() {
  const dispatch = useDispatch();
  const location = useLocation();
  const spotsObj = useSelector((state) => state.userSpots);
  console.log("SPOTSOBJ", spotsObj);
  let spotsArr = spotsObj ? Object.values(spotsObj) : [];

  // populate user spots store
  useEffect(() => {
    dispatch(getUserSpots());
  }, [dispatch, location]);

  return (
    <>
      <div className="below-nav">
        <h1>Manage Your Spots</h1>
        <NavLink to="/spots/new">
          <button className="CreateSpotbutton">create new spot</button>{" "}
        </NavLink>
        <div className="main-section-containter">
          <div className="spots-show-gallery">
            {spotsArr.length > 0 &&
              spotsArr.map((spot) => (
                <div key={`${spot.id}${spot.name}`}>
                  <Link
                    to={`/spots/${spot.id}`}
                    title={spot.name}
                    className="spot-card-link"
                  >
                    <SpotCard spot={spot} />
                  </Link>
                  <div className="spot-card-buttons">
                    <Link to={`/spots/${spot.id}/edit`}>
                      <button>Update</button>
                    </Link>
                    <OpenModalButton
                      buttonText="Delete"
                      modalComponent={<DeleteSpotModal spotId={spot.id} />}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageSpots;
