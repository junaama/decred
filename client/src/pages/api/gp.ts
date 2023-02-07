// import axios from 'axios';
// import { Router, Request, Response } from 'express';
// import { promisify } from 'util';
// // import redis from 'redis';

// // const redisClient = redis.createClient();
// // const setAsync = promisify(redisClient.set).bind(redisClient);

// const router = Router();

// router.get('/api/gitpoaps/:address', async (req: Request, res: Response) => {
//   const { address } = req.params;
//   try {
//     const { data } = await axios.get(
//       `https://public-api.gitpoap.io/v1/address/${address}/gitpoaps`
//     );
//     await setAsync(address, JSON.stringify(data));
//     res.send({ success: true, data });
//   } catch (error) {
//     res.status(500).send({ success: false, error: error.message });
//   }
// });

// export default router;

import axios from 'axios';

async function getGitpoapsData(address: string) {
  const response = await axios.get(`https://public-api.gitpoap.io/v1/address/${address}/gitpoaps`);
  return response.data;
}
