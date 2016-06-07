using System.Data.Entity;

namespace AngularWebApiGrid.Models
{
    public class DemoContext : DbContext
    {
        public DbSet<Customer> Customers { get; set; }

        public DemoContext()
            : base("DemoContext")
        {
        }
    }
}