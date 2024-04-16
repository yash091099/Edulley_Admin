const handleFileUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('https://api.mymultimeds.com/api/file/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`⁠Failed to upload file: ${response.statusText}`);
      }
      const responseData = await response.json();
      const uploadedUrl = responseData.publicUrl;
      return uploadedUrl;
    } catch (error) {
      console.error('Error uploading file:', error.message);
    }
  };

  export default handleFileUpload