import { useState, useContext } from 'react';
import Context from '../context/AppContext';
import { S3 } from '@aws-sdk/client-s3';

const useS3 = () => {
  const { setDone } = useContext(Context);

  const uploadImageOnS3 = async ({ file, title, type }) => {
    // Make sure these credentials are securely handled and not exposed in your client-side code
    const accessKeyId = 'AKIAWSKF3C7JUCLE5EGM';
    const secretAccessKey = 'uXyIMCj9oNV3ai04U91WjSODYeWf9GsrMKhE8YN5'
    const MUNROE_BUCKET_NAME = 'multimeds';
    const region = 'ap-south-1'; // Correct region

    const s3 = new S3({
      region, // Include the region
      accessKeyId,
      secretAccessKey,
      signatureVersion: 'v4',
    });

    const keyName = `${type}/${title.replace(/ /g, '-')}/${file.name.replace(/ /g, '-')}`;
    const params = {
      Bucket: MUNROE_BUCKET_NAME,
      Key: keyName,
      Body: file,
    };

    try {
      const { Location } = await s3.upload(params).promise();
        
      setDone(true); // Assuming you're using this to track upload completion

      return Location; // The URL of the uploaded file
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  };

  return { uploadImageOnS3 };
};

export default useS3;
