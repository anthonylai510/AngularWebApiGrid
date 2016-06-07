using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Security.Cryptography.X509Certificates;
using FizzWare.NBuilder;

namespace AngularWebApiGrid.Models
{
    public class DemoInitializer : DropCreateDatabaseIfModelChanges<DemoContext>
    {
        protected override void Seed(DemoContext context)
        {
            var customers = Builder<Customer>.CreateListOfSize(200)
                .All()
                    .With(c => c.FirstName = Faker.Name.First())
                    .With(c => c.LastName = Faker.Name.Last())
                .Build();

            foreach (var customer in customers)
            {
                context.Customers.AddOrUpdate(c => c.Id,
                    customer);
            }
        }
    }
}