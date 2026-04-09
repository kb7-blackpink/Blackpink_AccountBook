import axios from '@/services/api/axios';
import { v4 as uuidv4 } from 'uuid';

// 로그인 api
export const loginApi = async ({ email, password }) => {
  const response = await axios.get('/users', {
    params: {
      email,
      password,
    },
  });

  const users = response.data;

  if (!users.length) {
    throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
  }

  return users[0];
};

// 회원가입 api
export const signupApi = async ({ name, email, password }) => {
  const existResponse = await axios.get('/users', {
    params: {
      email,
    },
  });

  const existUsers = existResponse.data;

  if (existUsers.length > 0) {
    throw new Error('이미 사용 중인 이메일입니다.');
  }

  const newUser = {
    id: `u-${uuidv4()}`,
    name,
    email,
    password,
    currentMode: 'lucky',
    monthlyBudget: 0,
    currencyUnit: '원',
  };

  const response = await axios.post('/users', newUser);

  return response.data;
};

// 닉네임 변경 api
export const updateUserApi = async (id, data) => {
  const res = await axios.patch(`/users/${id}`, data);
  return res.data;
};
