using Core.Entities.Concrete;
using DataAccess.Concrete.EntityFramework;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Business.ValidationRules.FluentValidation
{
    public class OperationClaimValidator : AbstractValidator<OperationClaim>
    {
        public OperationClaimValidator()
        {
            RuleFor(o => o.ClaimName).NotEmpty();
            RuleFor(o => o.ClaimName).Must(UniqueName).WithMessage("Bu yetki daha önce kaydedilmiş.");
        }

        private bool UniqueName(string arg)
        {
            RentACarProjectContext _db = new RentACarProjectContext();
            var operationClaim = _db.OperationClaims.Where(o => o.ClaimName.ToLower() == arg.ToLower()).SingleOrDefault();
            if (operationClaim == null) return true;
            return false;
        }
    }
}
