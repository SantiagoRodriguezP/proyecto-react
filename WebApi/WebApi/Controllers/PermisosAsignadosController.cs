using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermisosAsignadosController : Controller
    {
        private readonly AplicationDbContext _context;

        public PermisosAsignadosController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: Permisos
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var permisosAsignados = from permisoAsignado in _context.PermisosAsignados
                                    join rol in _context.Roles on permisoAsignado.IdRol equals rol.idRol
                                    join permiso in _context.Permisos on permisoAsignado.IdPermiso equals permiso.idPermiso
                           select new { 
                               idPermisoAsignado = permisoAsignado.idPermisoAsignado,
                               idRol = rol.idRol,
                               rol = rol.Nombre,
                               idPermiso = permiso.idPermiso,
                               permiso=permiso.Permiso
                           };
            return Ok(new { permisosAsignados });
        }
        [HttpGet("{idRol}")]
        public async Task<IActionResult> GetPermiso(int? idRol)
        {
            if (idRol == null)
            {
                return NotFound();
            }

            //var permisos = await _context.PermisosAsignados
            //    .FirstOrDefaultAsync(p => p.IdRol == idRol);
            var permisos = (from permisoAsignado in _context.PermisosAsignados
                                    join rol in _context.Roles on permisoAsignado.IdRol equals rol.idRol
                                    join permiso in _context.Permisos on permisoAsignado.IdPermiso equals permiso.idPermiso
                                    where permisoAsignado.IdRol == idRol
                           select new
                                    {
                                        idPermisoAsignado = permisoAsignado.idPermisoAsignado,
                                        idRol = rol.idRol,
                                        rol = rol.Nombre,
                                        idPermiso = permiso.idPermiso,
                                        permiso = permiso.Permiso
                                    }); 
            if (permisos == null)
            {
                return NotFound();
            }

            return Ok(permisos);
        }
    }
}
