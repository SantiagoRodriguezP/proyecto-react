using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class Permisos
    {
        [Key]
        public int idPermiso { get; set; }
        public string Permiso { get; set; }
    }
}
