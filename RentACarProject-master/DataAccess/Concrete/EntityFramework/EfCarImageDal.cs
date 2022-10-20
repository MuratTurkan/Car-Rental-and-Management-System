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
    public class EfCarImageDal : EfEntityRepositoryBase<CarImage, RentACarProjectContext>, ICarImageDal
    {
        public List<CarImageDetailDto> GetCarImageDetails()
        {
            using (RentACarProjectContext context = new RentACarProjectContext())
            {
                var result = from c in context.CarImages
                             join ca in context.Cars
                             on c.CarId equals ca.CarId
                             select new CarImageDetailDto { ImageId = c.ImageId, CarId = ca.CarId, CarPlate = ca.CarPlate, ImagePath = c.ImagePath };
                return result.ToList();
            }
        }
    }
}
