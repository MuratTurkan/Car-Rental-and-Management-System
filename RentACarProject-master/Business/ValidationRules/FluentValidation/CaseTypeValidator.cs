using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Business.ValidationRules.FluentValidation
{
    public class CaseTypeValidator : AbstractValidator<CaseType>
    {

        public CaseTypeValidator()
        {
            RuleFor(c => c.CaseName).NotEmpty();
            RuleFor(c => c.CaseName).Must(UniqueName).WithMessage("Bu kasa tipi daha önce kaydedilmiş."); ;
        }

        private bool UniqueName(string arg)
        {
            RentACarProjectContext _db = new RentACarProjectContext();
            var caseType = _db.CaseTypes.Where(c => c.CaseName.ToLower() == arg.ToLower()).SingleOrDefault();
            if (caseType == null) return true;
            return false;
        }
    }
}
