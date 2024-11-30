import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

function Carousel({ imageUrls }) {
  const [imageIndex, setImageIndex] = useState(0);

  const showNextImage = () => {
    setImageIndex((index) => {
      if (index === imageUrls.length - 1) return 0;
      return index + 1;
    });
  };

  const showPreviousImage = () => {
    setImageIndex((index) => {
      if (index === 0) return imageUrls.length - 1;
      return index - 1;
    });
  };

  return (
    <div className="relative max-w-[1200px] max-h-[500px] h-[70vw] mx-auto">
      <div className="w-full h-full flex overflow-hidden">
        {imageUrls && imageUrls.length &&
        imageUrls.map((imageUrl) => (
          <img
            key={imageUrl.url}
            src={imageUrl.url}
            alt=""
            className={`img-slider-img`}
            style={{ translate: `${-100 * imageIndex}%` }}
          />
        ))
        }
      </div>
      <button className="img-slider-btn left-0" onClick={showPreviousImage}>
        <ChevronLeft />
      </button>
      <button className="img-slider-btn right-0" onClick={showNextImage}>
        <ChevronRight />
      </button>
    </div>
  );
}

export default Carousel;
