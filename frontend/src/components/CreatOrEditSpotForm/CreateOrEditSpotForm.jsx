import { useEffect, useState } from "react";

function CreateOrEditSpotForm({ submitToParent, hideImages, currentSpot }) {
  const [address, setAddress] = useState(
    currentSpot ? currentSpot.address : ""
  );
  const [city, setCity] = useState(currentSpot ? currentSpot.city : "");
  const [state, setState] = useState(currentSpot ? currentSpot.state : "");
  const [country, setCountry] = useState(
    currentSpot ? currentSpot.country : ""
  );
  // const [lat, setLat] = useState("");
  // const [lng, setLng] = useState("");
  const [name, setName] = useState(currentSpot ? currentSpot.name : "");
  const [description, setDescription] = useState(
    currentSpot ? currentSpot.description : ""
  );
  const [price, setPrice] = useState(currentSpot ? currentSpot.price : "");
  const [images, setImages] = useState({});
  const [errors, setErrors] = useState({});
  const lat = 0;
  const lng = 0;

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

    if (!hideImages) {
      if (Object.keys(images).length <= 0)
        newErrors.images = "You must submit at least one photo";
      Object.keys(images).forEach((key) => {
        if (
          !images[key].url.endsWith(".png") &&
          !images[key].url.endsWith(".jpg") &&
          !images[key].url.endsWith(".jpeg")
        ) {
          newErrors[key] = "Image URL must end in .png, .jpg, or .jpeg";
        }
      });
    }

    setErrors(newErrors);
  }, [
    address,
    city,
    state,
    country,
    name,
    description,
    price,
    images,
    setErrors,
    hideImages,
  ]);

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
    console.log("payload in child", payload);

    await submitToParent(payload);
  };

  return (
    <>
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
            <div className="errors-and-label-div">
              <label>Country</label>
              {errors.country && (
                <div>
                  <p className="error-p">{errors.country}</p>
                </div>
              )}
            </div>
            <input
              className="country-input"
              placeholder={currentSpot ? currentSpot.country : "Country"}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            ></input>
          </div>

          <div className="address-div">
            <div className="errors-and-label-div">
              <label>Street Address</label>
              {errors.address && (
                <div>
                  <p className="error-p">{errors.address}</p>
                </div>
              )}
            </div>
            <input
              className="address-input"
              placeholder={currentSpot ? currentSpot.address : "Address"}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></input>
          </div>

          <div className="city-state-div">
            <div className="city-div">
              <div className="errors-and-label-div">
                <label>City</label>
                {errors.city && (
                  <div>
                    <p className="error-p">{errors.city}</p>
                  </div>
                )}
              </div>
              <input
                className="city-input"
                placeholder={"City"}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></input>
              <span> ,</span>
            </div>

            <div className="state-div">
              <div className="errors-and-label-div">
                <label>State</label>
                {errors.state && (
                  <div>
                    <p className="error-p">{errors.state}</p>
                  </div>
                )}
              </div>
              <input
                className="state-input"
                placeholder={currentSpot ? currentSpot.state : "STATE"}
                value={state}
                onChange={(e) => setState(e.target.value)}
              ></input>
            </div>
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
              placeholder={"Please write at least 30 characters"}
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            >
              {currentSpot && currentSpot.description}
            </textarea>
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
              <div className="input-div">
                <input
                  placeholder="Price per Night(USD)"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </div>
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
          {!hideImages && (
            <div className="images-div">
              <h2>Liven up your spot with photos</h2>
              <p>Submit a link to at least one photo to publish your spot</p>
              <div className="photo-input-div">
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
                  {errors.images && (
                    <div>
                      <p className="error-p">{errors.images}</p>
                    </div>
                  )}
                  {errors.prev && (
                    <div>
                      <p className="error-p">{errors.prev}</p>
                    </div>
                  )}
                </div>

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
                {errors.other1 && (
                  <div>
                    <p className="error-p">{errors.other1}</p>
                  </div>
                )}
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
                  {errors.other2 && (
                    <div>
                      <p className="error-p">{errors.other2}</p>
                    </div>
                  )}
                </div>
                <div>
                  <input
                    placeholder="Image URL"
                    onChange={(e) =>
                      setImages((images) => ({
                        ...images,
                        other3: { url: e.target.value, preview: false },
                      }))
                    }
                  ></input>
                  {errors.other3 && (
                    <div>
                      <p className="error-p">{errors.other3}</p>
                    </div>
                  )}
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
                  {errors.other4 && (
                    <div>
                      <p className="error-p">{errors.other4}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="button-div">
          <button
            className="submit-button"
            type="submit"
            disabled={Object.keys(errors).length > 0 ? true : false}
          >
            Create Spot
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateOrEditSpotForm;
