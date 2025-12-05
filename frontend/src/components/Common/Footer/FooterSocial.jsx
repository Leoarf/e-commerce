import React from 'react';
import { TbBrandMeta } from 'react-icons/tb';
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterXLine } from 'react-icons/ri';
import { SOCIAL_MEDIA } from './footerConfig';

const FooterSocial = () => {
  const getIcon = (icon) => {
    switch (icon) {
      case 'meta':
        return <TbBrandMeta className="h-4 w-4 sm:h-5 sm:w-5" />;
      case 'instagram':
        return <IoLogoInstagram className="h-4 w-4 sm:h-5 sm:w-5" />;
      case 'twitter':
        return <RiTwitterXLine className="h-4 w-4 sm:h-5 sm:w-5" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
        Follow Us
      </p>
      <div className="flex gap-2 sm:gap-3">
        {SOCIAL_MEDIA.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-800 flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color}`}
            aria-label={social.label}
          >
            {getIcon(social.icon)}
          </a>
        ))}
      </div>
    </div>
  );
};

export default FooterSocial;
