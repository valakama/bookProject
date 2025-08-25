import { useState } from "react";

type ImagePlaceholderProps = {
  src: string;
  alt?: string;
  className?: string;
  fallback?: React.ReactNode;
};

const ImagePlaceholder = ({
  src,
  alt = "Image",
  className = "",
  fallback
}: ImagePlaceholderProps) => {
  const [error, setError] = useState(false);

  return (
    <div
      className={`w-full h-full flex items-center justify-center bg-gray-200 ${className}`}
    >
      {!error ? (
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-full object-contain"
          onError={() => setError(true)}
        />
      ) : (
        fallback ?? (
          <span className="text-gray-500 text-sm">Error Image</span>
        )
      )}
    </div>
  );
};

export default ImagePlaceholder;
