import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import "./createASpot.css";
import { createSpot } from "../../store/spots";
import { useNavigate } from "react-router-dom";

function CreateASpotForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  // const [lat, setLat] = useState("");
  // const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState({});
  const [errors, setErrors] = useState({});
  const lat = 0;
  const lng = 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newSpot = {
      address,
      city,
      state,
      lat,
      lng,
      country,
      name,
      description,
      price,
    };
    // let spotImages = {};
    const payload = { newSpot, images };
    const spot = await dispatch(createSpot(payload));
    if (spot.id) {
      navigate(`/spots/${spot.id}`);
    }
  };

  useEffect(() => {
    const newErrors = {};
    // address validations:
    if (!address) newErrors.address = "Street address is required";
    if (!city) newErrors.city = "City is required";
    if (!state) newErrors.state = "State is required";
    if (!country) newErrors.country = "Country is required";
    // if (lat > 90 || lat < -90) newErrors.lat = "Latitude is not valid";
    // if (lng > 180 || lat < -180) newErrors.lng = "Longitude is not valid";
    if (!name) newErrors.name = "Name is required";
    if (name.length > 50)
      newErrors.name = "Name must be less than 50 characters";
    if (!description) newErrors.description = "Description is required";
    if (description.length < 30 && description.length > 0)
      newErrors.description = "Description must be longer than 30 characters";
    if (!price) newErrors.price = "Price per day is required";
    if (price < 0) newErrors.price = "Price per day must be a positive number";
    if (Object.keys(images).length <= 0)
      newErrors.images = "You must submit at least one photo";
    setErrors(newErrors);
  }, [address, city, state, country, name, description, price, images]);

  return (
    <div className="below-nav">
      <div className="main-section-containter">
        <h1>Create a new Spot</h1>
        <form
          className="create-spot-form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="top-form-div">
            {/*LOCATION ----------------*/}
            <h3>Where&apos;s your place located?</h3>
            <p>
              Guests will only get your exact address once they booked a
              reservation.
            </p>
            <div className="country-div">
              <label>Country</label>
              <input
                className="country-input"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              ></input>
              {errors.country && (
                <div>
                  <p className="error-p">{errors.country}</p>
                </div>
              )}
            </div>
            <div className="address-div">
              <label>Street Address</label>
              <input
                className="address-input"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></input>
            </div>
            {errors.address && (
              <div>
                <p className="error-p">{errors.address}</p>
              </div>
            )}
            <div className="city-state-div">
              <div className="city-div">
                <label>City</label>
                <input
                  className="city-input"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                ></input>
                <span> ,</span>
                {errors.city && (
                  <div>
                    <p className="error-p">{errors.city}</p>
                  </div>
                )}
              </div>
              <div className="state-div">
                <label>State</label>
                <input
                  className="state-input"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                ></input>
              </div>
              {errors.state && (
                <div>
                  <p className="error-p">{errors.state}</p>
                </div>
              )}
            </div>
            {/* <div className="lat-lng">
              <div className="lat-div">
                <p>Latitude</p>
                <input
                  placeholder="Latitude"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                ></input>
              </div>
              <div className="lng-div">
                <p>Longitude</p>
                <input
                  placeholder="Longitude"
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                ></input>
              </div> */}
            {/* </div> */}
          </div>
          <div className="middle-form-div">
            {/* DESCRIPTION ----------------*/}
            <div className="description-div">
              <h2>Describe your place to guests</h2>
              <p>
                Mention the best features of your space, any special amentities
                like fast wifi or parking, and what you love about the
                neighborhood.
              </p>
              <textarea
                rows="5"
                cols="50"
                placeholder="Please write at least 30 characters"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              {errors.description && (
                <div>
                  <p className="error-p">{errors.description}</p>
                </div>
              )}
            </div>
            {/* TITLE ----------------*/}
            <div className="title-div">
              <h2>Create a title for your spot</h2>
              <p>
                Catch guests&apos; attention with a spot title that highlights
                what makes your place special.
              </p>
              <input
                placeholder="Name of your spot"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
              {errors.name && (
                <div>
                  <p className="error-p">{errors.name}</p>
                </div>
              )}
            </div>
            {/* PRICE------------------- */}
            <div className="price-div">
              <h2>Set a base price for your spot</h2>
              <p>
                Competitive pricing can help your listing stand out and rank
                higher in search results.
              </p>
              <div className="price-input-label-div">
                <h2>$</h2>
                <input
                  placeholder="Price per Night"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </div>
              {errors.price && (
                <div>
                  <p className="error-p">{errors.price}</p>
                </div>
              )}
            </div>
          </div>
          {/* PHOTOS ---------------------- */}
          <div className="bottom-form">
            <h2>Liven up your spot with photos</h2>
            <p>Submit a link to at least one photo to publish your spot</p>
            <div>
              <input
                placeholder="Preview Image URL"
                onChange={(e) =>
                  setImages((images) => ({
                    ...images,
                    prev: { url: e.target.value, preview: true },
                  }))
                }
              ></input>
            </div>
            {errors.images && (
              <div>
                <p className="error-p">{errors.images}</p>
              </div>
            )}
            <div>
              <input
                placeholder="Image URL"
                onChange={(e) =>
                  setImages((images) => ({
                    ...images,
                    other1: { url: e.target.value, preview: false },
                  }))
                }
              ></input>
            </div>
            <div>
              <input
                placeholder="Image URL"
                onChange={(e) =>
                  setImages((images) => ({
                    ...images,
                    other2: { url: e.target.value, preview: false },
                  }))
                }
              ></input>
            </div>
            <div>
              <input
                placeholder="Image URL"
                onChange={(e) =>
                  setImages((images) => ({
                    ...images,
                    othe3: { url: e.target.value, preview: false },
                  }))
                }
              ></input>
            </div>
            <div>
              <input
                placeholder="Image URL"
                onChange={(e) =>
                  setImages((images) => ({
                    ...images,
                    other4: { url: e.target.value, preview: false },
                  }))
                }
              ></input>
            </div>
          </div>
          <button
            type="submit"
            disabled={Object.keys(errors).length > 0 ? true : false}
          >
            Create a Spot
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateASpotForm;
