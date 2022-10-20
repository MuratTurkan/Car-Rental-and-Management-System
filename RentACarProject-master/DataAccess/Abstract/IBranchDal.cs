using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;
using Core.DataAccess;
using Entities.DTOs;
using System.Linq.Expressions;

namespace DataAccess.Abstract
{
    public interface IBranchDal : IEntityRepository<Branch>
    {
        List<BranchDetailDto> GetBranchDetails(Expression<Func<Branch, bool>> filter = null);
        Branch GetByBranchName(string branchName);
    }
}
