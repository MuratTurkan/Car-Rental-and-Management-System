using Core.DataAccess.EntityFramework;
using Core.Entities.Concrete;
using DataAccess.Abstract;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Entities.DTOs;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfUserDal : EfEntityRepositoryBase<User, RentACarProjectContext>, IUserDal
    {
        public List<UserDetailDto> GetByCustomers()
        {
            using (var context = new RentACarProjectContext())
            {
                var result = from u in context.Users
                             join uo in context.UserOperationClaims
                                 on u.UserId equals uo.UserId
                             join o in context.OperationClaims
                                on uo.ClaimId equals o.ClaimId
                             where o.ClaimName == "Müşteri"
                             select new UserDetailDto
                             {
                                 UserId = u.UserId,
                                 FirstName = u.FirstName,
                                 LastName = u.LastName,
                                 NationalityId = u.NationalityId,
                                 Email = u.Email,
                                 Status = u.Status,
                                 BirthYear = u.BirthYear,
                                 PasswordHash=u.PasswordHash,
                                 PasswordSalt=u.PasswordSalt,
                                 ClaimName = "Müşteri"
                             };
                return result.ToList();
            }
        }

        public List<User> GetByRoles(string claimName)
        {
            using (var context = new RentACarProjectContext())
            {
                var result = from user in context.Users
                             join userOperationClaim in context.UserOperationClaims
                                 on user.UserId equals userOperationClaim.UserId
                             join operationClaim in context.OperationClaims
                                on userOperationClaim.ClaimId equals operationClaim.ClaimId
                             where operationClaim.ClaimName == claimName
                             select new User { UserId = user.UserId, FirstName = user.FirstName, LastName = user.LastName, NationalityId = user.NationalityId, Email = user.Email, PasswordSalt = user.PasswordSalt, PasswordHash = user.PasswordHash, Status = user.Status, BirthYear = user.BirthYear };
                return result.ToList();
            }
        }

        public OperationClaim GetByUserClaim(long userId)
        {
            using (var context = new RentACarProjectContext())
            {
                var result = from o in context.OperationClaims
                             join uo in context.UserOperationClaims
                                 on o.ClaimId equals uo.ClaimId
                             where uo.UserId == userId
                             select new OperationClaim { ClaimId = o.ClaimId, ClaimName = o.ClaimName };
                return result.FirstOrDefault();
            }
        }

        public List<OperationClaim> GetClaims(User user)
        {
            using (var context = new RentACarProjectContext())
            {
                var result = from operationClaim in context.OperationClaims
                             join userOperationClaim in context.UserOperationClaims
                                 on operationClaim.ClaimId equals userOperationClaim.ClaimId
                             where userOperationClaim.UserId == user.UserId
                             select new OperationClaim { ClaimId = operationClaim.ClaimId, ClaimName = operationClaim.ClaimName };
                return result.ToList();

            }
        }
    }
}
