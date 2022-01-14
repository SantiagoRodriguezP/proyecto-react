using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class Usuarios
    {
        [Key]
        public int idUsuario { get; set; }
        public string Nombre { get; set; }
        public string Apellidos { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }

        public string Email { get; set; }
        public int Edad { get; set; }
      
        public int idRol { get; set; }
        public string NombreUsuario { get; set; }
        public string Clave { get; set; }

    }
}
