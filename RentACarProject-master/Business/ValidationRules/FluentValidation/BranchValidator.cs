using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Business.ValidationRules.FluentValidation
{
    public class BranchValidator : AbstractValidator<Branch>
    {

        public BranchValidator()
        {
            RuleFor(b => b.CityId).NotEmpty();
            RuleFor(b => b.BranchName).NotEmpty();
            RuleFor(b => b.BranchName).Must(UniqueName).WithMessage("Bu şube daha önce kaydedilmiş.");
        }

        private bool UniqueName(string arg)
        {   
            RentACarProjectContext _db = new RentACarProjectContext();
            var branch = _db.Branchs.Where(b => b.BranchName.ToLower() == arg.ToLower()).SingleOrDefault();
            if (branch == null) return true;
            return false;
        }
    }
}
