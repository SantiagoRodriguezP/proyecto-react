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
    public class RolesController : Controller
    {
        private readonly AplicationDbContext _context;

        public RolesController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: Roles
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var roles = from rol in _context.Roles
                           select rol;
            return Ok(new { roles });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var roles = await _context.Roles
                .FirstOrDefaultAsync(p => p.idRol == id);
            if (roles == null)
            {
                return NotFound();
            }

            return Ok(roles);
        }
        // POST: Usuarios/Create
        [HttpPost]
        public ActionResult Registrar([FromBody] Roles rol)
        {
            try
            {
                _context.Add(rol);
                _context.SaveChanges();

                return Ok(new { rol, message = "Rol registrado existosamente" });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Roles rol)
        {
            try
            {

                if (rol.idRol == id)
                {
                    _context.Entry(rol).State = EntityState.Modified;
                    _context.SaveChanges();
                    return Ok(new { rol, message = "Rol modificado correctamente" });
                }
                else
                {
                    return BadRequest(new { message = "El rol no existe" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        // POST: Usuarios/Delete/5
        [HttpDelete("{id}")]
        public ActionResult DetelePermiso(int id)
        {
            try
            {
                var rol = _context.Roles.FirstOrDefault(u => u.idRol == id);
                if (rol != null)
                {
                    _context.Roles.Remove(rol);
                    _context.SaveChanges();
                    return Ok(new { message = "Permiso eliminado correctamente", id, HoraServidor = DateTime.Now.ToOADate() });
                }
                else
                {
                    return BadRequest(new { message = "El permiso no existe" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
