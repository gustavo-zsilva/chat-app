import { Router } from 'express';
const routes = Router();

routes.get('/', (req, res) => {
    res.send('Server is up and running')
})

export default routes;