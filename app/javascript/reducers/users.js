// import {
//   REGISTER_USER_REQUEST,
//   REGISTER_USER_SUCCESS,
//   REGISTER_USER_FAILURE,
// } from '../actionTypes/users';

// const initialState = {
//   loading: false,
//   user: null,
//   error: null,
// };

// export const userRegisterReducer = (state = initialState, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case REGISTER_USER_REQUEST:
//       return { ...state, loading: true, error: null };
//     case REGISTER_USER_SUCCESS:
//       return { ...state, loading: false, user: payload };
//     case REGISTER_USER_FAILURE:
//       return { ...state, loading: false, error: payload };
//     default:
//       return state;
//   }
// }
