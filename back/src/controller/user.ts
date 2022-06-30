import bodyParser from "body-parser";
import {Request,Response} from "express";
import {User} from "../models/user";


export const getUsers = async(req:Request ,res:Response) =>{
    const usuarios = await User.findAll();
    res.json({usuarios})

}

export const getUser= async(req:Request ,res:Response) =>{

    const {id} = req.params;
    const usuario = await User.findByPk(id);
    if (usuario){
        res.json(usuario)
    }else{
        
        res.status(404).json({
            msg: 'No se ha encontrado el usuario con ese id'
        })
    }
    
}

export const postUser = async(req:Request ,res:Response) =>{
    const {body} = req;    
    

    try {

        const existEmail =await User.findOne({
            where: {
                correo: body.correo
            }
        
        });

        if (existEmail) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con ese correo: ' + body.correo
            });
        }      
    
        
        console.log(req.body);
        // const usuario = new User(body);
        const usuario = User.build(body);
        await usuario.save();
        
        res.json(body);
    }catch(error){
    
        res.status(500).json({
            msg: 'Hable con el admin'
        })
    }
    
}

export const putUser = async (req:Request ,res:Response) =>{

    const {id} = req.params;
    const {body} = req;

    try {

        const usuario = await User.findByPk(id);
        if (!usuario){
            return res.status(404).json({
                msg: 'no existe un usuario con el id ' + id
            });
        }


        const existEmail =await User.findOne({
            where: {
                correo: body.correo
            }
        
        });

        if (existEmail) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con ese correo: ' + body.correo
            });
        }      
    
        
        console.log(req.body);

        await usuario.update(body);
        
        res.json(body);
    }catch(error){
    
        res.status(500).json({
            msg: 'Hable con el admin'
        })
    }
}

export const deleteUser = async (req:Request ,res:Response) =>{

    const {id} = req.params;

    const usuario = await User.findByPk(id);
        if (!usuario){
            return res.status(404).json({
                msg: 'no existe un usuario con el id ' + id
            });
        }

    await usuario.destroy();
    res.json({
        msg:'el usuario '+ id + ' ha sido eliminado'
    })
}
