import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
// import { useEffect } from "react";

function Stars({ setStarValue, starValue }) {
  const [hoverValue, setHoverValue] = useState(0);
  return (
    <>
      <div className="stars-and-label">
        <div className="star-buttons-div">
          {" "}
          <button
            type="button"
            className="star1Div"
            onClick={() => setStarValue(1)}
            onMouseEnter={() => setHoverValue(1)}
            onMouseLeave={() => setHoverValue(0)}
          >
            {hoverValue > 0 || (hoverValue === 0 && starValue > 0) ? (
              <FaStar size={30} />
            ) : (
              <FaRegStar size={30} />
            )}
          </button>
          <button
            type="button"
            className="star2Div"
            onClick={() => setStarValue(2)}
            onMouseEnter={() => setHoverValue(2)}
            onMouseLeave={() => setHoverValue(0)}
          >
            {hoverValue > 1 || (hoverValue === 0 && starValue > 1) ? (
              <FaStar size={30} />
            ) : (
              <FaRegStar size={30} />
            )}
          </button>
          <button
            type="button"
            className="star3Div"
            onClick={() => setStarValue(3)}
            onMouseEnter={() => setHoverValue(3)}
            onMouseLeave={() => setHoverValue(0)}
          >
            {hoverValue > 2 || (hoverValue === 0 && starValue > 2) ? (
              <FaStar size={30} />
            ) : (
              <FaRegStar size={30} />
            )}
          </button>
          <button
            type="button"
            className="star4Div"
            onClick={() => setStarValue(4)}
            onMouseEnter={() => setHoverValue(4)}
            onMouseLeave={() => setHoverValue(0)}
          >
            {hoverValue > 3 || (hoverValue === 0 && starValue > 3) ? (
              <FaStar size={30} />
            ) : (
              <FaRegStar size={30} />
            )}
          </button>
          <button
            type="button"
            className="star5Div"
            onClick={() => setStarValue(5)}
            onMouseEnter={() => setHoverValue(5)}
            onMouseLeave={() => setHoverValue(0)}
          >
            {hoverValue > 4 || (hoverValue === 0 && starValue > 4) ? (
              <FaStar size={30} />
            ) : (
              <FaRegStar size={30} />
            )}
          </button>
        </div>
        <h3>Stars</h3>
      </div>
    </>
  );
}

export default Stars;
