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
    public class EfRentalDetailDal : EfEntityRepositoryBase<RentalDetail, RentACarProjectContext>, IRentalDetailDal
    {
        public List<RentalDetailDto> GetRentalDetails(Expression<Func<RentalDetail, bool>> filter = null)
        {
            using (RentACarProjectContext context = new RentACarProjectContext())
            {
                var result = from r in filter == null ? context.RentalDetails : context.RentalDetails.Where(filter)
                             join u in context.Users
                             on r.UserId equals u.UserId
                             join c in context.Cars
                             on r.CarId equals c.CarId
                             join b in context.Branchs
                             on r.BranchId equals b.BranchId
                             select new RentalDetailDto
                             {
                                 RentalId = r.RentalId,
                                 UserId = u.UserId,
                                 CarId = c.CarId,
                                 BranchId = b.BranchId,
                                 CarPlate = c.CarPlate,
                                 BranchName = b.BranchName,
                                 NationalityId = u.NationalityId,
                                 RentDate = r.RentDate,
                                 ReturnDate = r.ReturnDate,
                                 RentalPrice = r.RentalPrice,
                             };
                return result.ToList();
            }
        }
    }
}
