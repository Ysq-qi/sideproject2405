import { useNavigate } from 'react-router-dom';

//處理header組件Nav導航邏輯
const useHeaderNavigation = () => {
  const navigate = useNavigate();

  const navItems = [
    { link: '/type1', label: '種類1' },
    { link: '/type2', label: '種類2' },
    { link: '/type3', label: '種類3' },
    { link: '/type4', label: '種類4' },
    { link: '/type5', label: '種類5' },
  ].filter(item => item.link && item.label) || []; //確保navItems數組內都有link與label屬性

  const handleNavItemClick = (link) => {
    if (typeof link === 'string' && link.trim() !== '') {
      navigate(link);
    } else {
      console.error('Invalid link:', link);
    }
  };

  return {
    navItems,
    handleNavItemClick,
  };
}

export default useHeaderNavigation;