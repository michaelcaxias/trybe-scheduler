import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { MyContext } from '../context/Provider';
import { useNavigate } from 'react-router';
import Loading from '../components/Loading/Loading';

export default function LoginWrap({ children }) {
  const { setUserInfo, changeSignedInState, loading, setLoading } = useContext(MyContext);
  const navigate = useNavigate();

  const requestUserInfo = async () => {
    const accessToken = localStorage.getItem('accessToken');

    try {
      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setUserInfo(userInfo.data);
      changeSignedInState(true);

    } catch (error) {
      if (error.response.status === 401) {
        changeSignedInState(false);
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestUserInfo();
  }, []);

  if (loading) return <Loading />;

  return (
    <div>{children}</div>
  );
}

LoginWrap.propTypes = {
  children: PropTypes.node.isRequired,
};
