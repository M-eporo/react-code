import React from 'react'

const DynamicImage: React.FC = () => {
    const imgSrc = "https://placehold.co/150";
    const altText = "サンプル画像";
    const baseWidth = 150;
    const isLarge = true;
    
  return (
    <div>
        <img
            src={imgSrc}
            alt={altText}
            width={isLarge ? baseWidth * 2 : baseWidth}
            data-size={isLarge ? "large" : "small"}
        />
    </div>
  )
}

export default DynamicImage