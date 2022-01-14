using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : Controller
    {
        private readonly AplicationDbContext _context;

        public UsuariosController(AplicationDbContext context)
        {
            _context = context;
        }
        // GET: Usuarios
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
        
            var usuario = from usu in _context.Usuarios
                          join rol in _context.Roles on usu.idRol equals rol.idRol
                          select new {
                             idUsuario=usu.idUsuario,
                             nombre=usu.Nombre,
                             apellidos=usu.Apellidos,
                             direccion=usu.Direccion,
                             telefono=usu.Telefono,
                             email=usu.Email,
                             edad=usu.Edad,
                             idRol=usu.idRol,
                             rol=rol.Nombre,
                             idPermiso=usu.idRol,
                             nombreUsuario=usu.NombreUsuario,
                             clave=usu.Clave
                          };
            return Ok(new { usuario, HoraServidor = DateTime.Now.ToOADate() });
        }
        //GET: usuarios/admin/123
        [HttpGet("{user}/{clave}")]
        public async Task<IActionResult> GetUser(string user, string Clave)
        {
            var usuario = (from u in _context.Usuarios
                           join rol in _context.Roles on u.idRol equals rol.idRol
                           where u.NombreUsuario == user && u.Clave == Clave
                              select new
                              {
                                  u.idUsuario,
                                  u.NombreUsuario,
                                  u.Clave,
                                  u.Nombre,
                                  u.Apellidos,
                                  u.Direccion,
                                  u.Telefono,
                                  u.Email,
                                  u.Edad,
                                  u.idRol,
                                  rol=rol.Nombre 
                              }).FirstOrDefault();
            return Ok(usuario);
        }

        // GET: Usuarios/5
        [HttpGet("{id}", Name="GetUsuario")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var usuarios = await _context.Usuarios
                .FirstOrDefaultAsync(m => m.idUsuario == id);
            if (usuarios == null)
            {
                return NotFound();
            }

            return Ok(usuarios);
        }

        // POST: Usuarios/Create
        [HttpPost]
        public ActionResult Registrar([FromBody]Usuarios usuario)
        {
            try
            {
                _context.Add(usuario);
                _context.SaveChanges();
                //  return CreatedAtRoute("GetUsuario", new { id = usuarios.idUsuario }, usuarios);

                return Ok(new {usuario, message= "Usuario registrado existosamente"});

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Usuarios usuario)
        {
            try
            {

                if (usuario.idUsuario == id)
                {
                    //var usuarioActualizado = from usu in _context.Usuarios
                    //              join permiso in _context.Permisos on usu.idPermiso equals permiso.idPermiso
                    //              join rol in _context.Roles on usu.idRol equals rol.idRol
                    //                         where usu.idUsuario == id
                    //                         select new
                    //              {
                    //                  idUsuario = usu.idUsuario,
                    //                  nombre = usu.Nombre,
                    //                  apellidos = usu.Apellidos,
                    //                  direccion = usu.Direccion,
                    //                  telefono = usu.Telefono,
                    //                  email = usu.Email,
                    //                  edad = usu.Edad,
                    //                  idRol = usu.idRol,
                    //                  rol = rol.Nombre,
                    //                  idPermiso = usu.idRol,
                    //                  permiso = permiso.Permiso,
                    //                  nombreUsuario = usu.NombreUsuario,
                    //                  clave = usu.Clave,
                    //                  message = "Usuario modificado correctamente"
                    //                         };
                    //return Ok(new { usuarioActualizado });
                    _context.Entry(usuario).State = EntityState.Modified;
                    _context.SaveChanges();
                    return Ok(new { usuario, message = "Usuario modificado correctamente" });
                }
                else
                {
                    return BadRequest(new { message = "El usuario no existe" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        // POST: Usuarios/Delete/5
        [HttpDelete("{id}")]
        public ActionResult DeteleUser(int id)
        {
            try
            {
                var usuario = _context.Usuarios.FirstOrDefault(u => u.idUsuario == id);
                if (usuario != null)
                {
                    _context.Usuarios.Remove(usuario);
                    _context.SaveChanges();
                    return Ok(new { message = "Usuario eliminado correctamente", id, HoraServidor = DateTime.Now.ToOADate() });
                }
                else
                {
                    return BadRequest(new { message = "El usuario no existe" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

    }
}
