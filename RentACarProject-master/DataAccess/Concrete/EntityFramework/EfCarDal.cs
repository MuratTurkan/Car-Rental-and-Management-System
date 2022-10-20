using Core.DataAccess.EntityFramework;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfCarDal : EfEntityRepositoryBase<Car, RentACarProjectContext>, ICarDal
    {
        public List<CarDetailDto> GetByUsable(long branchId)
        {
            using (RentACarProjectContext context = new RentACarProjectContext())
            {
                var result = from c in context.Cars
                             join b in context.Brands
                             on c.BrandId equals b.BrandId
                             join co in context.Colors
                             on c.ColorId equals co.ColorId
                             join br in context.Branchs
                             on c.BranchId equals br.BranchId
                             join g in context.Gears
                             on c.GearId equals g.GearId
                             join f in context.Fuels
                             on c.FuelId equals f.FuelId
                             join cl in context.Classes
                             on c.ClassId equals cl.ClassId
                             join ca in context.CaseTypes
                             on c.CaseId equals ca.CaseId
                             where c.CarUsable == "Kullanılabilir" && c.BranchId == branchId
                             select new CarDetailDto
                             {
                                 CarId = c.CarId,
                                 BranchId = br.BranchId,
                                 BrandName = b.BrandName,
                                 ColorName = co.ColorName,
                                 BranchName = br.BranchName,
                                 GearName = g.GearName,
                                 FuelName = f.FuelName,
                                 ClassName = cl.ClassName,
                                 CaseName = ca.CaseName,
                                 CarPlate = c.CarPlate,
                                 CarStar = c.CarStar,
                                 ModelYear = c.ModelYear,
                                 DailyPrice = c.DailyPrice,
                                 Description = c.Description,
                                 CarUsable = c.CarUsable,
                                 CarLocation = c.CarLocation
                             };
                return result.ToList();
            }
        }

        public List<CarDetailDto> GetCarDetails()
        {
            using (RentACarProjectContext context = new RentACarProjectContext())
            {
                var result = from c in context.Cars
                             join b in context.Brands
                             on c.BrandId equals b.BrandId
                             join co in context.Colors
                             on c.ColorId equals co.ColorId
                             join br in context.Branchs
                             on c.BranchId equals br.BranchId
                             join g in context.Gears
                             on c.GearId equals g.GearId
                             join f in context.Fuels
                             on c.FuelId equals f.FuelId
                             join cl in context.Classes
                             on c.ClassId equals cl.ClassId
                             join ca in context.CaseTypes
                             on c.CaseId equals ca.CaseId
                             select new CarDetailDto
                             {
                                 CarId = c.CarId,
                                 BranchId = br.BranchId,
                                 BrandName = b.BrandName,
                                 ColorName = co.ColorName,
                                 BranchName = br.BranchName,
                                 GearName = g.GearName,
                                 FuelName = f.FuelName,
                                 ClassName = cl.ClassName,
                                 CaseName = ca.CaseName,
                                 CarPlate = c.CarPlate,
                                 CarStar = c.CarStar,
                                 ModelYear = c.ModelYear,
                                 DailyPrice = c.DailyPrice,
                                 Description = c.Description,
                                 CarUsable = c.CarUsable,
                                 CarLocation = c.CarLocation
                             };
                return result.ToList();
            }

        }
    }
}
