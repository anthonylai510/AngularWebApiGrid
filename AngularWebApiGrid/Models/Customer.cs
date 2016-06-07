using System;
using System.ComponentModel.DataAnnotations;

namespace AngularWebApiGrid.Models
{
    public class Customer
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }
    }
}