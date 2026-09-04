export interface RegisterUserResponse {
  message: string;
  user: {
    _id: string;
    email: string;
  };
}


export interface AuthResponse {
 userData:{
   token: {
    accessToken: string;
    refreshToken: string;
  };
  user: {
    _id: string;
    email: string;
    name: string;
  };
  isLoggedIn: boolean;
 }
}