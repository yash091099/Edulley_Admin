import React, { useState, useEffect, useRef } from "react";
import CustomLoader from "./loader";

const UniqueUniversityInfo = ({ onDataChange, initialData, resetVersion }) => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });

  // Refs for file inputs to directly trigger clicks
  const fileInputRefs = Array(4)
    .fill()
    .map(() => React.createRef());

  // Reset images
  useEffect(() => {
    if (resetVersion !== undefined) {
      setImages({
        image1: "",
        image2: "",
        image3: "",
        image4: "",
      });
    }
  }, [resetVersion]);

  // Initialize with existing data
  useEffect(() => {
    if (initialData) {
      setImages(initialData);
    }
  }, [initialData]);

  const handleFileChange = async (event, key) => {
    const file = event.target.files[0];
    if (!file) return; // Exit if no file is selected
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(
        "https://api.mymultimeds.com/api/file/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        setLoading(false);
        throw new Error(`Failed to upload file: ${response.statusText}`);
      }
      const responseData = await response.json();
      const uploadedUrl = responseData.publicUrl;

      setImages((prevImages) => {
        const updatedImages = { ...prevImages, [key]: uploadedUrl };
        onDataChange(updatedImages);
        return updatedImages;
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error uploading file:", error.message);
    }
  };

  return (
    <>
      <div className="overview-container">
        <h3 className="heading">Unique University Info</h3>
        <div className="row image-upload-container">
          {fileInputRefs.map((ref, index) => (
            <div
              key={`image${index + 1}`}
              className="col-md-6 formField image-upload-section"
            >
              <label htmlFor={`image${index + 1}`}>{`Image ${
                index + 1
              }`}</label>
              <input
                id={`image${index + 1}`}
                type="file"
                ref={ref}
                className="file-input"
                onChange={(e) => handleFileChange(e, `image${index + 1}`)}
              />
              <input
                type="button"
                value={`Upload Image ${index + 1}`}
                onClick={() => ref.current.click()}
              />
              {images[`image${index + 1}`] && (
                <div className="image-display">
                  <img
                    src={images[`image${index + 1}`]}
                    alt={`Image ${index + 1}`}
                    style={{ width: "100%", marginTop: "10px" }}
                  />
                </div>
              )}

              {/* {images[key] && (
              <div className="image-display">
                <img src={images[key]} alt={`Upload ${index + 1}`} />
              </div>
            )} */}
            </div>
          ))}
        </div>
      </div>

      {loading && <CustomLoader />}
    </>
  );
};
export default UniqueUniversityInfo;
