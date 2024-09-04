import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../config/firebaseConfig';
import { setUser, clearUser } from '../../pages/user/login/loginSlice';

const AuthListener = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // 全局 loading 狀態

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser({ uid: user.uid, email: user.email }));
      } else {
        dispatch(clearUser());
      }
      setLoading(false); // 認證狀態檢查完成，結束 loading
    });

    return () => unsubscribe();
  }, [dispatch]);

  return loading ? <div>Loading...</div> : null; // 如果還在 loading 中，顯示 loading 指示器
};

export default AuthListener;