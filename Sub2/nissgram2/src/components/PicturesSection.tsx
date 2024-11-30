import React from 'react';

interface PicturesSectionProps {
  pictures: string[];
}

const PicturesSection: React.FC<PicturesSectionProps> = ({ pictures }) => {
  return (
    <div>
      <h3>Pictures</h3>
      {pictures.length > 0 ? (
        <div className="row">
          {pictures.map((picture, index) => (
            <div key={index} className="col-md-4 mb-3">
              <img
                src={picture}
                alt={`Picture ${index + 1}`}
                className="img-fluid rounded"
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No pictures available!</p>
      )}
    </div>
  );
};

export default PicturesSection;
