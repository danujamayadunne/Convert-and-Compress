'use client'
import { useState } from 'react';

const ImageConverter = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [convertedImage, setConvertedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Remove data:image/png;base64, prefix from base64 string
        const base64String = reader.result.split(',')[1];
        setSelectedImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertImage = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://z9zi7gqwtb.execute-api.us-east-1.amazonaws.com/Danuja/danuja', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: selectedImage
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setConvertedImage(data.jpgImage);
    } catch (err) {
      setError('Failed to convert image: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Image Converter (PNG to JPG)</h1>
        
        {/* Upload Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Select PNG Image:
          </label>
          <input
            type="file"
            accept="image/png"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        {/* Convert Button */}
        <button
          onClick={convertImage}
          disabled={!selectedImage || loading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium
            ${!selectedImage || loading 
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          {loading ? 'Converting...' : 'Convert to JPG'}
        </button>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Preview Section */}
        <div className="space-y-4">
          {selectedImage && (
            <div>
              <h2 className="text-lg font-medium mb-2">Original Image:</h2>
              <img 
                src={`data:image/png;base64,${selectedImage}`}
                alt="Original"
                className="max-w-full h-auto rounded-lg shadow-md"
              />
            </div>
          )}

          {convertedImage && (
            <div>
              <h2 className="text-lg font-medium mb-2">Converted Image:</h2>
              <img 
                src={`data:image/jpeg;base64,${convertedImage}`}
                alt="Converted"
                className="max-w-full h-auto rounded-lg shadow-md"
              />
              {/* Download Button */}
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = `data:image/jpeg;base64,${convertedImage}`;
                  link.download = 'converted-image.jpg';
                  link.click();
                }}
                className="mt-2 py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Download JPG
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageConverter;