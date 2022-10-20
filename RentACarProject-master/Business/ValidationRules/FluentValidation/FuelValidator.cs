using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Business.ValidationRules.FluentValidation
{
    public class FuelValidator : AbstractValidator<Fuel>
    {

        public FuelValidator()
        {
            RuleFor(f => f.FuelName).NotEmpty();
            RuleFor(f => f.FuelName).Must(UniqueName).WithMessage("Bu yakıt daha önce kaydedilmiş.");
        }

        private bool UniqueName(string arg)
        {
            RentACarProjectContext _db = new RentACarProjectContext();
            var fuel = _db.Fuels.Where(f => f.FuelName.ToLower() == arg.ToLower()).SingleOrDefault();
            if (fuel == null) return true;
            return false;
        }
    }
}
