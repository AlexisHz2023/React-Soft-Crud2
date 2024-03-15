import React from 'react';
import { useState } from "react";
import Axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { RiAdminFill } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineInfo } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { BsChevronDoubleDown } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { Link } from 'react-router-dom';

const Alerta = withReactContent(Swal)


const Admin = () => {

    const [Nombre,setNombre] = useState("");
    const [Correo,setCorreo] = useState("");
    const [Usuario,setUsuario] = useState("");
    const [Clave,setClave] = useState("");
    const [Rol,setRol] = useState("");
    const [id,setId] = useState("0");

    const [Editar,setEditar] = useState(false);

    const [usuariosList,setUsuarios] = useState([]);

    const add = ()=>{
        Axios.post("http://localhost:3001/create",{
            Nombre:Nombre,
            Correo:Correo,
            Usuario:Usuario,
            Clave:Clave,
            Rol:Rol
        }).then(()=>{
          getUsuarios();
            LimpiarCampos();
            Alerta.fire({
              title: <strong>Creado Correctamente</strong>,
              html: <i>El usuario {Nombre} fue registrado con éxito</i>,
              icon: "success",
              timer:3000
            })
            }).catch(function(error){
              Swal.fire({
                icon: "error",
                title: "Oops...",
                footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"intente mas tarde":JSON.parse(JSON.stringify(error)).message
              });
        });
    }


    const update = ()=>{
      Axios.put("http://localhost:3001/update",{
          id:id,
          Nombre:Nombre,
          Correo:Correo,
          Usuario:Usuario,
          Rol:Rol
      }).then(()=>{
        getUsuarios();
        LimpiarCampos();


        Alerta.fire({
          title: <strong>Actualizado Correctamente</strong>,
          html: <i>El usuario {Nombre} fue actualizado con éxito</i>,
          icon: "info",
          timer:3000
        }).catch(function(error){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"intente mas tarde":JSON.parse(JSON.stringify(error)).message
          });
        });
        
      });
  }


  const deleteUsuario = (val)=>{

    Swal.fire({
      title: "Confirmar eliminacion?",
      html: "<i>Esta Seguro de eliminar a <strong>"+val.Nombre+"</strong></i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Elimarlo"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`).then(()=>{
          getUsuarios();
          LimpiarCampos();
          Alerta.fire({
            icon: "success",
            title: val.Nombre+" Fue Eliminado.",
            showConfirmButton: false,
            timer: 2000
          });
        }).catch(function(error){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se pudo Eliminar!",
            footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"intente mas tarde":JSON.parse(JSON.stringify(error)).message
          });
        });
       
      }
    });

   
}

        const LimpiarCampos = ()=> {
          setNombre("");
          setCorreo("");
          setUsuario("");
          setClave("");
          setRol("");
          setEditar(false)
        }
       
       const EditarUsuario = (val)=>{
        setEditar(true);

        setNombre(val.Nombre);
        setCorreo(val.Correo);
        setUsuario(val.Usuario);
        setRol(val.Rol);
        setId(val.id)
       }


    const getUsuarios = ()=>{
        Axios.get("http://localhost:3001/usuarios").then((response)=>{
           setUsuarios(response.data);
        });
    }
    
    getUsuarios();




  return (
    <div className='absolute bg-white py-4 top-3 w-[79%] left-[20%] h-[45%] rounded-lg '>
         <div className='sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-auto text-center bg-gray-900 z-20'>
        <div className='text-gray-100 text-xl'>
           <div className='p-2.5 mt-1 flex items-center'>
           <div className='bg-blue-500 w-[30px] h-[30px] text-center relative content-center place-content-center rounded-lg'>
            <RiAdminFill className='w-[30px] place-content-center relative top-1' />
              </div>  <h1 className='font-bold text-gray-200 text-[20px] ml-3'>Administrador 
           </h1>
        </div>
        <hr className='p-2.5'/>
        </div>
        <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white'>
        <IoHomeOutline />
        <span className='text-[15px] ml-4 text-gray-200'>Home</span>
        </div>

        <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white'>
        <MdOutlineInfo />

        <span className='text-[15px] ml-4 text-gray-200'>Informacion</span>
        </div>
        <hr className='p-2.5'/>

        <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white' onClick="dropdown">
        <MdOutlineSettings />
        <div className='flex justify-between w-full items-center'>
          <span className='text-[15px] ml-4 text-gray-200'>Ajustes </span>
          <span className='text-sm rotate-180' id="ajustes">
          <BsChevronDoubleDown />
          </span>
        </div>
        </div>
        <div className='text-left text-sm font-thin mt-2 w-4/5 mx-auto text-gray-200' id='submenu'>
          <h1 className='cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1'>Perfil</h1>
          <h1 className='cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1'>Perfil</h1>
          <h1 className='cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1'>Perfil</h1>
        </div>
        <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white'>
        <Link
        to="/"
        >
          <div className='bg-blue-500 top-2  rounded-md w-[80%] h-[25px] relative'>
          <ImExit className='w-[30px] py-0 place-content-center relative top-1' />
          </div>
        <p className='relative left-9 -top-4'>Salir</p>
        </Link>
        
        </div>
       </div>
       
           <h1 className='text-center text-3xl'>Registro</h1>
       <div className='mb-4'>
       <label className=' text-white text-center left-[20%] absolute'><input
       className='rounded-md w-[90%]'
       placeholder='Nombre Completo' 
       value={Nombre}
       type="text"
       onChange={(event)=> {
        setNombre(event.target.value);
       }}
       />
       
       </label> <br />
      <label className='bg-gray-500 absolute text-white left-[60%] z-10'>Correo: <input 
      className=''
      value={Correo}
      type="email"
       onChange={(event)=> {
        setCorreo(event.target.value);
       }}
      /></label>  <br />
      <label className='bg-gray-500 absolute text-white left-14'>Usuario: <input 
      value={Usuario}
      type="text"
      onChange={(event)=> {
        setUsuario(event.target.value);
       }}
      /></label> <br />
      <label className='bg-gray-500 absolute text-white left-[60%] z-10'>Clave: <input 
      type="password"
      onChange={(event)=> {
        setClave(event.target.value);
       }}
      /></label>  <br />
      <label>Rol: <input 
      type="text"
      value={Rol}
      onChange={(event)=> {
        setRol(event.target.value);
       }}
      /></label>
      <br />

      <div className='text-center -left-[5%] text-white relative'>
        {
          Editar?
          <div>
          <button onClick={update}  className='bg-blue-500 rounded-lg w-24 h-14 hover:bg-blue-600 z-10 absolute left-[45%]'>Actualizar</button> 
          <button onClick={LimpiarCampos}  className='bg-blue-500 rounded-lg w-24 h-14 hover:bg-blue-600 z-10  absolute left-[55%]'>Cancelar</button>
          </div>
          :<button onClick={add} className='bg-blue-500 top-24 rounded-lg w-24 h-14 hover:bg-blue-600 z-10  absolute'>Registrar</button>
        }
  
      </div>
       </div>

   <div  className='bg-blue-200 w-[100%] absolute h-[110%] z-20  top-[105%] rounded-lg'>
   </div>

<div>
  <table className='w-full relative z-20 border-collapse rounded-lg border-gray-300   top-[15rem]  '>
  <thead className='bg-primary border-b-2 border-gray-200 '>
    <tr className='relative h-[50px] text-white'>
      <th className='w-20 p-3 text-sm font-semibold  tracking-wide text-left'>#</th>
      <th className='w-20 p-3 text-sm font-semibold  tracking-wide text-left'>Nombre</th>
      <th className='w-20 p-3 text-sm font-semibold  tracking-wide text-left'>Correo</th>
      <th className='w-20 p-3 text-sm font-semibold  tracking-wide text-left'>Usuario</th>
      <th className='w-20 p-3 text-sm font-semibold  tracking-wide text-center'>Rol</th>
      <th className='w-20 p-3 tracking-wide text-center bg-primary  text-sm font-semibold  '>Acciones</th>
    </tr>
  </thead>
  <tbody className='bg-gray-200'>
  {usuariosList.map((val, key) => {
    return (
      <tr key={val.id} className='bg-white'>
        <td className='p-3 text-sm whitespace-nowrap font-bold text-blue-500 hover:underline'>{val.id}</td>
        <td className='p-3 text-sm whitespace-nowrap font-bold  hover:underline'>{val.Nombre}</td>
        <td className='p-3 text-sm whitespace-nowrap font-bold  hover:underline'>{val.Correo}</td>
        <td className='p-3 text-sm whitespace-nowrap font-bold  hover:underline'>{val.Usuario}</td>
        <td className='p-3 text-sm whitespace-nowrap font-bold text-blue-500 hover:underline'><h1 className='bg-primary rounded text-white text-center'>{val.Rol}</h1></td>
        <td className=''>
          <div className='flex' role="group" aria-label="Basic example">
            <button
              type='button'
              onClick={() => {
                EditarUsuario(val);
              }}
              className='focus:outline-none focus:shadow-outline bg-emerald-500	 hover:bg-emerald-600 text-white font-bold py-4 px-4 left-10 relative rounded mr-2'
            >
              Editar
            </button>
            <button
              type='button'
              onClick={() => {
                deleteUsuario(val);
              }}
              className='focus:outline-none focus:shadow-outline bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 left-14  relative rounded'
            >
              Eliminar
            </button>
          </div>
        </td>
      </tr>
    );
  })}
</tbody>
</table>
</div>
    </div>
  )
}

export default Admin
