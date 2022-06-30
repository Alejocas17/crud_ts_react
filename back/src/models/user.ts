import {DataTypes} from "sequelize";
import db from "../db/connection";

export const User = db.define('User',{
    nombre:{
        type: DataTypes.STRING
    },
    apellido:{
        type: DataTypes.STRING
    },
    correo:{
        type: DataTypes.STRING
    },
    telefono:{
        type: DataTypes.DOUBLE
    },
    celular:{
        type: DataTypes.DOUBLE
    },
    direccion:{
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.BOOLEAN
    }

})

// export default User;