export function getUserInformation(
  postAuthenticated: any,
  URL: any,
  values: any,
  handleLogin: any
) {
  const jwt = postAuthenticated(URL, values)
    .then((res: any) => {
      return res.json();
    })
    .then((data: any) => {
      const { PAYLOAD } = data;
      console.log("PAYLOAD", data, PAYLOAD);
      if (!PAYLOAD.errorCode) {
        const tokenData = {
          accessToken: PAYLOAD.access_token,
          expiryDate: PAYLOAD.expires_in,
          refreshToken: PAYLOAD.refresh_token,
        };
        handleLogin(tokenData);
      }
      throw new Error(PAYLOAD.message);
    })
    .catch((err: any) => {
      console.log(err);
    });
  return jwt;
}
