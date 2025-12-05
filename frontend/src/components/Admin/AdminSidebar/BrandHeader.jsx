import React from 'react';
import { Link } from 'react-router-dom';

const BrandHeader = ({ name, subtitle }) => {
  return (
    <div className="mb-6 md:mb-8">
      <Link
        to="/admin"
        className="text-xl md:text-2xl font-bold bg-gradient-to-r from-azurio to-blue-400 bg-clip-text text-transparent inline-block"
      >
        {name}
      </Link>
      <p className="text-gray-400 text-xs md:text-sm mt-1">{subtitle}</p>
    </div>
  );
};

export default BrandHeader;
