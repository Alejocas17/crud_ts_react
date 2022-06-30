// import { clickOptions } from "@testing-library/user-event/dist/click";
import { count } from "console";
import { ChangeEvent, useState } from "react"

import crudUSers from "../services/service";

interface DataFormat {
    id: number,
    nombre: string,
    apellido: string,
    correo: string,
    telefono: number,
    celular: number,
    direccion: string

}

// var contador=1;
// for(contador==1;contador<=2;contador++){
//     listUser(true);
//     }
export const Formulario =() => {

    const [formulario,setFormulario] = useState({
        id:"",
        nombre: "",
        apellido: "",
        correo: "",
        telefono: "",
        celular: "",
        direccion: ""
    });

    
    const addUser = async(ev:any,formulario:any) =>{    
        await crudUSers.create(formulario);
        listUser(true);
        // console.log(JSON.stringify(usuario));

    }
    const defaultList ={"data":
    {"usuarios":
    [{"id": 0,
    "nombre": " ",
    "apellido":" ",
    "correo":" ",
    "telefono":0,
    "celular":0,
    "direccion":" ",
    }]}}
    const [lista=defaultList,setLista]=useState<any>();

    // const listaPrevia:Array<DataFormat> =
    //     [{
    //     "nombre":"david",
    //     "apellido":"Franco",
    //     "correo":"d.f@hotmail.com",
    //     "telefono":312198371,
    //     "celular":1231233451,
    //     "direccion":"asdas"}]

    
     const listUser = async(ev:any) =>{  
        
        const lista = (await crudUSers.getAll());
        
        setLista(lista);   
        // console.log(JSON.stringify(usuario));
    }

    const editUser = async(ev:any,formulario:any) =>{
        await crudUSers.update(formulario, formulario.id);
        listUser(true);
    }
    
    const deleteUser =async(ev:any,formulario:any)=>{

        await crudUSers.delete(formulario.id);
        listUser(true);

    }


    const handleChange = ({target}:ChangeEvent<HTMLInputElement>) => {

        const {name, value} = target;
        
        setFormulario({
            ...formulario,
            [name] :value
        })

    }

    return(
        <form autoComplete="off">
            <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input type="text" 
                       className="form-control" 
                       name="nombre"
                       title="Nombre"
                       onChange={handleChange}
                    />
            </div>

            <div className="mb-3">
                <label className="form-label">Apellido</label>
                <input type="text" 
                       className="form-control" 
                       name="apellido"
                       title="Apellido"
                       onChange={handleChange}
                    />
            </div>


            <div className="mb-3">
                <label className="form-label">Correo</label>
                <input type="email" 
                       className="form-control" 
                       name="correo"
                       title="Correo"
                       onChange={handleChange}
                    />
            </div>

            <div className="mb-3">
                <label className="form-label">Telefono</label>
                <input type="number" 
                       className="form-control" 
                       name="telefono"
                       title="Telefono"
                       onChange={handleChange}
                    />
            </div>

            <div className="mb-3">
                <label className="form-label">Celular</label>
                <input type="number" 
                       className="form-control" 
                       name="celular"
                       title="Celular"
                       onChange={handleChange}
                    />
            </div>

            <div className="mb-3">
                <label className="form-label">Dirección</label>
                <input type="text" 
                       className="form-control" 
                       name="Direccion"
                       title="direccion"
                       onChange={handleChange}
                    />
            </div>
        <div className="container center">
            <button className="btn btn-success m-4"
            onClick={(ev)=>addUser(ev.preventDefault(),formulario)}>
                Añadir
            </button>

            <button className="btn btn-light m-4"
            onClick={(ev)=>listUser(ev.preventDefault())}>
                Listar
            </button>
        </div>
        <div>
            <div className="mb-3">
                <label className="form-label">Id a editar o eliminar</label>
                <input type="number" 
                       className="form-control" 
                       name="id"
                       title="Id"
                       onChange={handleChange}
                    />
            </div>
            <button className="btn btn-warning m-4"
            onClick={(ev)=>editUser(ev.preventDefault(),formulario)}>
                Editar
            </button>

            <button className="btn btn-danger m-4"
            onClick={(ev)=>deleteUser(ev.preventDefault(),formulario)}>
                Eliminar
            </button>

        </div>
           
        <div>
        {/* <h3>{JSON.stringify(lista)}</h3> */}
        <h3>{JSON.stringify(lista.data.usuarios.map(function(x:DataFormat){
            return {
                id: x.id,
                nombre: x.nombre,
                apellido: x.apellido,
                correo: x.correo,
                celular: x.celular
            }
        }))}</h3>
            </div>
        

        
            
        
        </form>
    )

}
