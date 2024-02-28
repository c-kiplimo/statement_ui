// pages/api/getTokens.ts
import { NextApiRequest, NextApiResponse } from 'next';

const getTokens = (req: NextApiRequest, res: NextApiResponse) => {
  const accessToken = req.cookies.accessToken || null;
  const refreshToken = req.cookies.refreshToken || null;

  res.json({ accessToken, refreshToken });
};

export default getTokens;
