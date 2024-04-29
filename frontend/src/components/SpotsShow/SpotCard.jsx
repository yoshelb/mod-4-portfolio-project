// import { FaStar } from "react-icons/fa";
import "./spotShow.css";
function SpotCard({ spot }) {
  // console.log("SPOT SINGLE ______", spot);
  if (Object.keys(spot).length > 0) {
    return (
      <div className="spot-card-div" title={spot.name}>
        <div
          className="spot-card-img"
          style={{ backgroundImage: `url('${spot.previewImage}')` }}
        ></div>

        <div className="underSpotImg">
          <div className="underSpotImg-top">
            <h3 className="spot-card-address">{`${spot.city}, ${spot.state}`}</h3>
            <div className="ratingAndStar">
              <p>·</p>
              <p className="avgRating"> {spot.avgRating}</p>
            </div>
          </div>
          <p className="spot-card-price">{`$${spot.price} night`}</p>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default SpotCard;
