using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Business.ValidationRules.FluentValidation
{
    public class ColorValidator : AbstractValidator<Color>
    {

        public ColorValidator()
        {
            RuleFor(c => c.ColorName).NotEmpty();
            RuleFor(c => c.ColorName).Must(UniqueName).WithMessage("Bu renk daha önce kaydedilmiş.");
        }

        private bool UniqueName(string arg)
        {
            RentACarProjectContext _db = new RentACarProjectContext();
            var color = _db.Colors.Where(c => c.ColorName.ToLower() == arg.ToLower()).SingleOrDefault();
            if (color == null) return true;
            return false;
        }
    }
}
