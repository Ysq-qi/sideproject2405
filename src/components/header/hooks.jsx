import { useNavigate } from 'react-router-dom';

//處理header組件Nav導航邏輯
const useHeaderNavigation = () => {
  const navigate = useNavigate();

  const navItems = [
    { link: '/type1', label: '夾克' },
    { link: '/type2', label: '襯衫' },
    { link: '/type3', label: '褲款' },
    { link: '/type4', label: '衣款' },
    { link: '/type5', label: '配件' },
  ].filter(item => item.link && item.label) || []; //確保navItems數組內都有link與label屬性

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