using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;
using Core.DataAccess;
using Entities.DTOs;
using System.Linq.Expressions;

namespace DataAccess.Abstract
{
    public interface IRentalDetailDal : IEntityRepository<RentalDetail>
    {
        List<RentalDetailDto> GetRentalDetails(Expression<Func<RentalDetail, bool>> filter = null);
    }
}
