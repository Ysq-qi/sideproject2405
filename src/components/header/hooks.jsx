import { useNavigate } from 'react-router-dom';

//處理header組件Nav導航邏輯
const useHeaderNavigation = () => {
  const navigate = useNavigate();

  const navItems = [
    { link: '/jackets', label: '夾克' },
    { link: '/shirts', label: '襯衫' },
    { link: '/pants', label: '褲款' },
    { link: '/tops', label: '衣款' },
    { link: '/accessories', label: '配件' },
  ].filter(item => item.link && item.label) || [];

  const handleNavItemClick = (link) => {
    //檢查link是否為字串與是否有空格
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