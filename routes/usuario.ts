import { Router } from 'express';
import { deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuarios } from '../controller/usuario';

const router = Router();

router.get('/', getUsuarios)
router.get('/:id', getUsuario)
router.post('/', postUsuario)
router.put('/:id', putUsuarios)
router.delete('/:id', deleteUsuario)



export default router;