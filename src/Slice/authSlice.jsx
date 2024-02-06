import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CryptoJS from 'crypto-js';


function generateUniqueTabId() {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

let tabId = sessionStorage.getItem('tabId');
if (!tabId) {
  tabId = generateUniqueTabId();
  sessionStorage.setItem('tabId', tabId);
}



const key =
  'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4Mzk2MzQwNSwiaWF0IjoxNjgzOTYzNDA1fQ.eHXysz4LDwqHLjsVUr5RwnYdSIw72Wf7Mv7JlDJh2AI';

const user = JSON.parse(sessionStorage.getItem(`user${tabId}`))
  ? JSON.parse(
      CryptoJS.AES.decrypt(JSON.parse(sessionStorage.getItem(`user${tabId}`)), key).toString(
        CryptoJS.enc.Utf8,
      ),
    )
  : null;
        
const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: '' };

export const login = createAsyncThunk('user/login', async (data) => {
  const rowData = {
    username: data.username,
    password:  data.password,
  }
  const response = await fetch(`https://dummyjson.com/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body : JSON.stringify(rowData)
  });
  const UserData = await response.json();
  if (UserData) {
    const Login = CryptoJS.AES.encrypt(JSON.stringify(UserData), key).toString();
    sessionStorage.setItem(`user${tabId}`, JSON.stringify(Login));
    return UserData;
  }
  return UserData
});

export const logout = () => {
  sessionStorage.removeItem(`user${tabId}`);
  sessionStorage.removeItem(`token${tabId}`);
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      return { ...state, user: action.payload };
    },
    loginFailed(state, action) {
      return { ...state, loginResponse: { status: true, msg: action.payload } };
    },
    setLoginStatesFalse(state) {
      return { ...state, fetchError: false };
    },
  },
});
export const { loginSuccess, loginFailed } = authSlice.actions;
export default authSlice.reducer;
