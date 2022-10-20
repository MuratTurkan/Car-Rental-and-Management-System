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
    public class EfCardDal : EfEntityRepositoryBase<Card, RentACarProjectContext>, ICardDal
    {
        public List<CardDetailDto> GetCardDetails(Expression<Func<Card, bool>> filter = null)
        {
            using (RentACarProjectContext context = new RentACarProjectContext())
            {
                var result = from c in filter==null? context.Cards : context.Cards.Where(filter)
                             join u in context.Users
                             on c.UserId equals u.UserId
                             select new CardDetailDto { CardId = c.CardId, UserId=u.UserId, NationalityId = u.NationalityId, FullName = c.FullName, CardNo = c.CardNo, ExpiryDate = c.ExpiryDate, Cvv = c.Cvv };
                return result.ToList();
            }
        }
    }
}
