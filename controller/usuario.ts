import { Request, Response } from 'express';
import Usuario from '../models/usuario';

export const getUsuarios = async(req: Request, res: Response) => {

    const usuarios = await Usuario.findAll();

    res.json(usuarios);

}
export const getUsuario = async(req: Request, res: Response) => {

    const { id } = req.params;
    const usuario = await Usuario.findByPk( id );

    if (usuario) {
        res.json(usuario)    
    } else {
        res.status(404).json({
            msg: `no existe un usuario con id: ${id}`
        })
    }

}
export const postUsuario = async(req: Request, res: Response) => {

    const { body } = req;

    try {
        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        })

        if ( existeEmail ) {
            return res.status(400).json({
                msg: "ya existe un usuario con el correo actual"
            })
        }

        const usuario = Usuario.build(body);
        await usuario.save();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
    

    res.json({
        msg: 'postUsuario',
        body
    })

}
export const putUsuarios = async(req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {
        
        const usuario = await Usuario.findByPk( id );
        
        if ( !usuario ) {
            return res.status(404).json({
                msg: "no existe un usuario con el id " + id
            })
        }
        
        await usuario.update( body );

        res.json(usuario)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
    

    res.json({
        msg: 'postUsuario',
        body
    })

}
export const deleteUsuario = async(req: Request, res: Response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id)

    if ( !usuario ) {
        return res.status(404).json({
            msg: "no existe un usuario con el id " + id
        })
    }

    await usuario.update({
        estado: false
    });

    res.json(usuario)

}

