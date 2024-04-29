import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReview } from "../../store/currentSpot";

function DeleteReviewModal({ reviewId, currentSpot }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const handleYesClick = (e) => {
    e.preventDefault();
    console.log("CURRENT SPOT IN modal", currentSpot);
    return dispatch(deleteReview({ reviewId, currentSpot }))
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
    <div className="delete-review">
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to delete this review?</p>
      <button className="yes-delete" onClick={(e) => handleYesClick(e)}>
        Yes (Delete Review)
      </button>
      <button className="no-delete" onClick={(e) => handleNoClick(e)}>
        No (Keep Review)
      </button>
    </div>
  );
}

export default DeleteReviewModal;
