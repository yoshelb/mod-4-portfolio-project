import { useDispatch } from "react-redux";

import "./createASpot.css";
import { createSpot } from "../../store/spots";
import { useNavigate } from "react-router-dom";
import CreateOrEditSpotForm from "../CreatOrEditSpotForm/CreateOrEditSpotForm";

function CreateASpotForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitToParent = async (payload) => {
    console.log("PAYLOAD IN PARENT", payload);
    const spot = await dispatch(createSpot(payload));
    if (spot.id) {
      navigate(`/spots/${spot.id}`);
    }
  };

  return (
    <div className="below-nav">
      <div className="main-section-containter">
        <h1>Create a New Spot</h1>

        <CreateOrEditSpotForm
          submitToParent={submitToParent}
          hideImages={false}
        />
      </div>
    </div>
  );
}

export default CreateASpotForm;
