import React from 'react'
import { Link } from "react-router-dom";

const Problemas = () => {
  return (

    <div className='overflow-hidden'>
      <div className='absolute w-[30rem] h-[90%] rounded-lg bg-blue-600 left-[35%] top-[5%]'>

        <div className='-top-2 relative left-[170%] z-20 w-[20%] h-[3rem] text-white bg-blue-500 text-center rounded-lg hover:bg-blue-700'>
          <Link
          to="/"
          ><p className='top-[15%] text-lg relative'>Volver</p></Link>
        </div>

      <div className='bg-white w-[60rem] h-[35rem] rounded-lg -left-[50%] top-1 relative'>
          <h1 className='text-3xl text-blue-500 top-[5%] text-center relative'>
            ¿Tienes Problemas Para Ingresar?
          </h1>
          <p className='text-center text-xl top-20 relative'>
          Si presentas problemas para ingresar al sistema debes comunicarte con el administrador, <br></br> Ten en cuenta tu correo y una descripcion de tu problema, es necesaria para poder ayudarte!.
          </p>
          <div className='text-center top-28 relative'>
          <form action="https://formsubmit.co/alexisdurango721@gmail.com" method="POST">
            <input className='bg-slate-50 w-[35%] h-[50px] shadow-lg border-2 shadow-blue-500/40 rounded-lg relative top-4' type="email" placeholder="Ingrese su correo" name="Correo" required />
            <br />
            <textarea placeholder="Explique aqui el problema que presenta" class="Opinion"      
             name="Problema" className='resize-none relative w-[50%] h-[10rem] top-10 shadow-lg left-16 border-2 shadow-blue-500/40 rounded-lg relative text-center ' rows="10" cols="20"></textarea>

            <input type="submit" class="Enviar" value="Enviar" className='bg-blue-500 z-30 relative text-white w-[15%] h-[3rem] rounded-lg hover:bg-blue-700 top-24 -left-[25%]' />
            <input type="hidden" name="_captcha" value="false" />
            </form>
          </div>
      </div>

      </div>
      
    </div>
  )
}

export default Problemas
