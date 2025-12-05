import React from 'react';
import { FiPhoneCall, FiMail, FiMapPin } from 'react-icons/fi';
import { CONTACT_INFO } from './footerConfig';

const FooterContact = () => {
  const getIcon = (icon) => {
    switch (icon) {
      case 'phone':
        return <FiPhoneCall className="h-4 w-4 flex-shrink-0" />;
      case 'mail':
        return <FiMail className="h-4 w-4 flex-shrink-0" />;
      case 'map':
        return <FiMapPin className="h-4 w-4 flex-shrink-0" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {CONTACT_INFO.map((contact, index) => (
        <div
          key={index}
          className="flex items-center gap-3 text-gray-400 text-sm sm:text-base"
        >
          {getIcon(contact.icon)}
          <span>{contact.text}</span>
        </div>
      ))}
    </div>
  );
};

export default FooterContact;
