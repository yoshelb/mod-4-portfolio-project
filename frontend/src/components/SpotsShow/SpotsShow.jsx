import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots.js";
import { useEffect } from "react";
import SpotCard from "./SpotCard.jsx";
import "./spotShow.css";
import { Link } from "react-router-dom";

function SpotsShow() {
  const dispatch = useDispatch();
  const spotsObj = useSelector((state) => state.spots);
  let spotsArr;
  if (Object.keys(spotsObj).length > 0) {
    spotsArr = Object.values(spotsObj);
  }

  //   populate the spots store

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  // console.log("SPOTSARR", spotsArr);

  return (
    <div className="below-nav">
      <div className="spots-show-gallery">
        {Object.keys(spotsArr[0]).length > 0 &&
          spotsArr.map((spot) => (
            <Link
              to={`spots/${spot.id}`}
              key={`${spot.id}${spot.name}`}
              className="spot-card-link"
            >
              <SpotCard spot={spot} />
            </Link>
          ))}
      </div>
    </div>
  );
}

export default SpotsShow;
