import { FaStar } from "react-icons/fa";

function SpotCard({ spot }) {
  console.log("SPOT SINGLE ______", spot);
  if (Object.keys(spot).length > 0) {
    return (
      <div className="spotCardDiv">
        <img className="spotCardImg" alt="spot image" src={spot.previewImage} />
        <div className="underSpotImage">
          <h3 className="spotCardAddress">{`${spot.city}, ${spot.state}`}</h3>
          <div className="ratingAndStar">
            <FaStar />
            <p className="avgRating">{spot.avgRating}</p>
          </div>
          <p className="spotCardPrice">{`$${spot.price} night`}</p>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default SpotCard;
