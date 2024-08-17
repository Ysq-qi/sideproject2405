import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../config/firebaseConfig';
import { setUser, clearUser } from '../../pages/user/login/loginSlice';

const AuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser({ uid: user.uid, email: user.email }));
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
};

export default AuthListener;