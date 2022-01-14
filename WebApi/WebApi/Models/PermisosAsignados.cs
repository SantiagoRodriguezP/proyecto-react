using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class PermisosAsignados
    {
        [Key]
        public int idPermisoAsignado { get; set; }
        public int IdPermiso { get; set; }
        public int IdRol { get; set; }
    }
}
