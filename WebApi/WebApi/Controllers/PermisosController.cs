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
    public class PermisosController : Controller
    {
        private readonly AplicationDbContext _context;

        public PermisosController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: Permisos
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var permisos = from permiso in _context.Permisos
                           select permiso;
            return Ok(new { permisos });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var permisos = await _context.Permisos
                .FirstOrDefaultAsync(p => p.idPermiso == id);
            if (permisos == null)
            {
                return NotFound();
            }

            return Ok(permisos);
        }
        // POST: Usuarios/Create
        [HttpPost]
        public ActionResult Registrar([FromBody] Permisos permiso)
        {
            try
            {
                _context.Add(permiso);
                _context.SaveChanges();

                return Ok(new { permiso, message = "Permiso registrado existosamente" });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Permisos permiso)
        {
            try
            {

                if (permiso.idPermiso == id)
                {
                    _context.Entry(permiso).State = EntityState.Modified;
                    _context.SaveChanges();
                    return Ok(new { permiso, message = "Permiso modificado correctamente" });
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

        // POST: Usuarios/Delete/5
        [HttpDelete("{id}")]
        public ActionResult DetelePermiso(int id)
        {
            try
            {
                var permiso = _context.Permisos.FirstOrDefault(u => u.idPermiso == id);
                if (permiso != null)
                {
                    _context.Permisos.Remove(permiso);
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
