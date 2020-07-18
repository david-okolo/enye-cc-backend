import { v4 as uuidv4 } from 'uuid';

export const createToken = () => {
    return uuidv4();
}

export const delay = async (ms: number) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, ms)
    })
}