import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots.js";
import { useEffect } from "react";
import SpotCard from "./SpotCard.jsx";
import "./spotShow.css";
import { Link, useLocation } from "react-router-dom";

function SpotsShow() {
  const dispatch = useDispatch();
  const location = useLocation();
  const spotsObj = useSelector((state) => state.spots);
  let spotsArr = spotsObj ? Object.values(spotsObj) : [];
  // if (Object.keys(spotsObj).length > 0) {
  //   spotsArr = Object.values(spotsObj);
  // }

  //   populate the spots store

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch, location]);

  // console.log("SPOTSARR", spotsArr);

  return (
    <div className="below-nav">
      <div className="front-page-container">
        <div className="spots-show-gallery">
          {spotsArr.length > 0 &&
            spotsArr.map((spot) => (
              <Link
                to={`spots/${spot.id}`}
                title={spot.name}
                key={`${spot.id}${spot.name}`}
                className="spot-card-link"
              >
                <SpotCard spot={spot} />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SpotsShow;
