import { Router, Request, Response } from 'express';
import { IPlacesAutoCompleteParams } from './places.interface';
import { autoComplete, getHospitals } from './places.service';

const router = Router();

router.get('/autoComplete', async (req: Request, res: Response) => {
    const { 
        body
    }: {
        body: IPlacesAutoCompleteParams
    } = req;

    res.json(await autoComplete(body));
    
})

router.post('/hospitals', async (req: Request, res: Response) => {
    const { body } = req;
    const hospitals = await getHospitals(body);
    console.log(hospitals.len);
    res.json(hospitals)
})

export default router;