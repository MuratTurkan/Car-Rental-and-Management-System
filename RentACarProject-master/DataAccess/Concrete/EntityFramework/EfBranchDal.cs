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
    public class EfBranchDal : EfEntityRepositoryBase<Branch, RentACarProjectContext>, IBranchDal
    {
        public List<BranchDetailDto> GetBranchDetails(Expression<Func<Branch, bool>> filter = null)
        {
            using (RentACarProjectContext context = new RentACarProjectContext())
            {
                var result = from b in filter == null ? context.Branchs : context.Branchs.Where(filter)
                             join c in context.Cities
                             on b.CityId equals c.CityId
                             select new BranchDetailDto { BranchId = b.BranchId, BranchName = b.BranchName, CityName = c.CityName };
                return result.ToList();
            }
        }

        public Branch GetByBranchName(string branchName)
        {
            using (RentACarProjectContext context = new RentACarProjectContext())
            {
                var result = from b in context.Branchs
                             where b.BranchName == branchName
                             select new Branch { BranchId = b.BranchId, BranchName = b.BranchName, CityId = b.CityId };
                return result.FirstOrDefault();
            }
        }
    }
}
