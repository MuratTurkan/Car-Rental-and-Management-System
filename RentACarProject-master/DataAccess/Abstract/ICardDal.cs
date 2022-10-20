using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;
using Core.DataAccess;
using Entities.DTOs;
using System.Linq.Expressions;

namespace DataAccess.Abstract
{
    public interface ICardDal : IEntityRepository<Card>
    {
        List<CardDetailDto> GetCardDetails(Expression<Func<Card, bool>> filter = null);
    }
}
