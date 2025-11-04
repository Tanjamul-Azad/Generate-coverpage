
import React from 'react';

// The URL provided by the user for the monogram logo.
const uiuMonogramUrl = "https://i.postimg.cc/Y9wNJz76/312308865-507861781367882-3667233183680698455-n-removebg-preview.png";

export const UiuMonogramLogo: React.FC<{ className?: string }> = ({ className }) => (
    <img 
        src={uiuMonogramUrl} 
        alt="United International University Monogram" 
        className={className} 
    />
);
