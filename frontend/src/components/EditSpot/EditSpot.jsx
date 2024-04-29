import CreateOrEditSpotForm from "../CreatOrEditSpotForm/CreateOrEditSpotForm";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSpotById } from "../../store/currentSpot";
import { useEffect, useState } from "react";
import { updateSpot } from "../../store/currentSpot";
// import "..CreateASpot/";
function EditSpot() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loadForm, setLoadForm] = useState(false);
  const spotId = useParams().spotId;

  const currentSpot = useSelector((state) => state.currentSpot);
  console.log("CURRENT SPOT IN EDIT SPOT", currentSpot);

  useEffect(() => {
    dispatch(getSpotById(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    if (
      currentSpot &&
      Object.keys(currentSpot).length > 0 &&
      currentSpot.id == spotId
    ) {
      setLoadForm(true);
    }
  }, [setLoadForm, spotId, currentSpot]);

  const submitToParent = async (payload) => {
    console.log("PAYLOAD IN PARENT", payload);
    const updatedSpot = await dispatch(updateSpot({ payload, spotId }));

    if (updatedSpot && updatedSpot.id) {
      navigate(`/spots/${updatedSpot.id}`);
    }
  };

  return (
    <>
      {loadForm && (
        <div className="below-nav">
          <h1>Update your Spot</h1>
          {Object.keys(currentSpot).length > 0 && (
            <CreateOrEditSpotForm
              submitToParent={submitToParent}
              currentSpot={currentSpot}
              hideImages={true}
            />
          )}
        </div>
      )}
    </>
  );
}

export default EditSpot;
