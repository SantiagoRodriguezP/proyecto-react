using System.ComponentModel.DataAnnotations;

namespace WebApi.Models
{
    public class Roles
    {
        [Key]
        public int idRol { get; set; }
        public string Nombre { get; set; }
    }
}
