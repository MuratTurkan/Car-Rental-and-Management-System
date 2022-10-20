using Core.Entities.Concrete;
using DataAccess.Concrete.EntityFramework;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Business.ValidationRules.FluentValidation
{
    public class UserOperationClaimValidator : AbstractValidator<UserOperationClaim>
    {
        public UserOperationClaimValidator()
        {
            RuleFor(u => u.UserId).NotEmpty();
            RuleFor(u => u.UserId).Must(UniqueUserId).WithMessage("Bu kullanıcının yetkisi daha önce kaydedilmiş.");
            RuleFor(u => u.ClaimId).NotEmpty();
        }

        private bool UniqueUserId(long arg)
        {
            RentACarProjectContext _db = new RentACarProjectContext();
            var userOperationClaim = _db.UserOperationClaims.Where(u => u.UserId == arg).SingleOrDefault();
            if (userOperationClaim == null) return true;
            return false;
        }
    }
}
