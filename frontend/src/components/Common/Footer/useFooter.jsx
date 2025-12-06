import { useNavigate } from 'react-router-dom';

export const useFooter = () => {
  const navigate = useNavigate();

  const handleCollectionClick = (e, href) => {
    e.preventDefault();
    navigate(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { handleCollectionClick };
};
