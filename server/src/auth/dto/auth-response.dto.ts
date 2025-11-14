export class AuthResponseDto {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
  };
}

export class RefreshResponseDto {
  accessToken: string;
}
