import { deleteSpot } from "../../store/UserSpots";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

function DeleteSpotModal({ spotId }) {
  console.log("SPOTID inside DELETe modal", spotId);
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const handleYesClick = (e) => {
    e.preventDefault();

    return dispatch(deleteSpot(spotId))
      .then(() => {
        console.log("Delete successful, closing modal");
        closeModal();
      })
      .catch(async (res) => {
        console.log("catching and error", res);
        const data = await res.json();
        if (data && data.errors) {
          //   setBackendError(data.errors);
        }
      });
  };

  const handleNoClick = (e) => {
    e.preventDefault;
    closeModal();
  };

  return (
    <div>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this spot from the listings?</p>
      <button className="yes-delete" onClick={(e) => handleYesClick(e)}>
        Yes(Delete Spot)
      </button>
      <button className="no-delete" onClick={(e) => handleNoClick(e)}>
        No(Keep Spot)
      </button>
    </div>
  );
}

export default DeleteSpotModal;
