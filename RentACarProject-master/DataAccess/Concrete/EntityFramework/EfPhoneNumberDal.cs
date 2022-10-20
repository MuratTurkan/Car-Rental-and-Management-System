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
    public class EfPhoneNumberDal : EfEntityRepositoryBase<PhoneNumber, RentACarProjectContext>, IPhoneNumberDal
    {
        public List<PhoneNumberDetailDto> GetPhoneNumberDetails()
        {
            using (RentACarProjectContext context=new RentACarProjectContext())
            {
                var result = from p in context.PhoneNumbers
                             join u in context.Users
                             on p.UserId equals u.UserId
                             select new PhoneNumberDetailDto { PhoneId = p.PhoneId,UserId=u.UserId, NationalityId = u.NationalityId, PhoneNo = p.PhoneNo };
                return result.ToList();
            }
        }
    }
}
