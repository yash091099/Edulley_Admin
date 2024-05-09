import React from "react";

function FileUploadField({ name, label, setFieldValue, value }) {
  const handleFileChange = async (file) => {
    try {
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
        throw new Error(`Failed to upload file: ${response.statusText}`);
      }
      const responseData = await response.json();
      const uploadedUrl = responseData.publicUrl;
      setFieldValue(name, uploadedUrl);
    } catch (error) {
      console.error("Error uploading file:", error.message);
    }
  };

  const renderPreview = () => {
    if (!value) return null;

    return (
      <div className="preview-container">
        {value.endsWith(".pdf") ? (
          <embed src={value} type="application/pdf" width="200" height="200" />
        ) : (
          <img src={value} alt={label} className="preview-image" />
        )}
      </div>
    );
  };

  return (
    <div className="col-md-6 formField">
      <label>{label}</label>
      <input
        type="file"
        name={name}
        onChange={(event) => handleFileChange(event.target.files[0])}
        className="input"
      />
      {renderPreview()}
    </div>
  );
}

export default FileUploadField;
