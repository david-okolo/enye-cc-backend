import { Router } from "express";
import { getDistance } from "./distance.service";

const router = Router();

router.post('/between', async (req, res) => {
    const { body } = req;

    res.json(await getDistance(body))
})

export default router;