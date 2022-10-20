using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Business.ValidationRules.FluentValidation
{
    public class GearValidator : AbstractValidator<Gear>
    {

        public GearValidator()
        {
            RuleFor(g => g.GearName).NotEmpty();
            RuleFor(g => g.GearName).Must(UniqueName).WithMessage("Bu vites daha önce kaydedilmiş.");
        }

        private bool UniqueName(string arg)
        {
            RentACarProjectContext _db = new RentACarProjectContext();
            var gear = _db.Gears.Where(g => g.GearName.ToLower() == arg.ToLower()).SingleOrDefault();
            if (gear == null) return true;
            return false;
        }
    }
}
