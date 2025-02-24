import React, { useContext, useEffect, useState } from 'react'

const ContextApi = createContext();

export const ContextProivider = ({children}) => {
  //로컬 토큰 들고오기
  const getToken = localStorage.getItem("JWT_TOKEN")?JSON.stringify(localStorage.getItem("JWT_TOKEN")) : null;

  const [token, setToken] = useState(getToken)

  // 현재 로그인 유저 관리
  const [currentUser, setCurrentUser] = userState(null);

  const fetchUser = async () => {
    const user = JSON.parse(localStorage.getItem("USER"));

    if(user?.username) {
      try {
      const {data} = await api.get(`/user`);

      setCurrentUser(data)
    }catch (error) {
      console.error("Error fetching current user", error)
    }
    }
  };

  // 처음 시작시 혹은 토큰이 바뀔때마다 유저정보 가져오기
  useEffect(() => {
    if(token) {
      fetchUser();
    }
  }, [token]);

  return (
    <ContextApi.provider 
    value={{
      token, setToken, currentUser, setCurrentUser
    }}>
    {children}
    </ContextApi.provider>
  )
};

// useMyContext() 컨텍스트 사용
export const useMyContext = () => {
  const context = useContext(ContextApi);

  return context;
}


