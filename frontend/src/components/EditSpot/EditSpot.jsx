import CreateOrEditSpotForm from "../CreatOrEditSpotForm/CreateOrEditSpotForm";
import { useNavigate } from "react-router-dom";
// import "..CreateASpot/";
function EditSpot() {
  const submitToParent = async (payload) => {
    console.log("PAYLOAD IN PARENT", payload);
    const spot = await dispatch(editSpot(payload));
    if (spot.id) {
      navigate(`/spots/${spot.id}`);
    }
  };

  return (
    <>
      <h1>Update your Spot</h1>
      <CreateOrEditSpotForm submitToParent={submitToParent} />
    </>
  );
}
