using Core.Entities.Concrete;
using Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Concrete.EntityFramework
{
    // Context : DB tabloları ile proje classlarını bağlamak
    public class RentACarProjectContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseMySQL(@"Server=localhost;Database=RentACar;User=root;Password=12345;");
            //optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=CarDb;Trusted_Connection=true");

            optionsBuilder.UseNpgsql(@"Host=localhost;Database=RentACar;Username=postgres;Password=12345");
        }

        public DbSet<Branch> Branchs { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<Card> Cards { get; set; }
        public DbSet<CarImage> CarImages { get; set; }       
        public DbSet<CaseType> CaseTypes { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Class> Classes { get; set; }
        public DbSet<Color> Colors { get; set; }
        public DbSet<DrivingInformation> DrivingInformations { get; set; }
        public DbSet<Fuel> Fuels { get; set; }
        public DbSet<Gear> Gears { get; set; }
        public DbSet<IdentityInformation> IdentityInformations { get; set; }
        public DbSet<PhoneNumber> PhoneNumbers { get; set; }
        public DbSet<RentalDetail> RentalDetails { get; set; }
        public DbSet<OperationClaim> OperationClaims { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserOperationClaim> UserOperationClaims { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CarImage>().HasKey(c => c.ImageId);
            modelBuilder.Entity<CaseType>().HasKey(c => c.CaseId);
            modelBuilder.Entity<DrivingInformation>().HasKey(d => d.DrivingId);
            modelBuilder.Entity<IdentityInformation>().HasKey(ı => ı.IdentityId);
            modelBuilder.Entity<PhoneNumber>().HasKey(p => p.PhoneId);
            modelBuilder.Entity<RentalDetail>().HasKey(r => r.RentalId);
            modelBuilder.Entity<OperationClaim>().HasKey(o => o.ClaimId);
            modelBuilder.Entity<UserOperationClaim>().HasKey(u => u.DetailId);
        }
    }
}