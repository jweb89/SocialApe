import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  MARK_NOTIFICATIONS_READ,
  VERIFY_PHONE,
  RESEND_CODE,
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  isVerified: false,
  credentials: {},
  likes: [],
  notifications: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case VERIFY_PHONE:
      return {
        ...state,
        isVerified: true,
      };
    case RESEND_CODE:
      return { ...state };
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
        isVerified: action.payload.credentials.isVerified,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LIKE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            screamId: action.payload.screamId,
          },
        ],
      };
    case UNLIKE_SCREAM:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.screamId !== action.payload.screamId
        ),
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((notif) => (notif.read = true));
      return {
        ...state,
      };

    default:
      return state;
  }
}
