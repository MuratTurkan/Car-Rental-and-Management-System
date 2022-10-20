using Business.Abstract;
using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Business.ValidationRules.FluentValidation
{
    public class BrandValidator : AbstractValidator<Brand>
    {
        public BrandValidator()
        {
            RuleFor(b => b.BrandName).NotEmpty();
            RuleFor(b => b.BrandName).Must(UniqueName).WithMessage("Bu marka daha önce kaydedilmiş.");
        }

        private bool UniqueName(string arg)
        {
            RentACarProjectContext _db = new RentACarProjectContext();
            var brand = _db.Brands.Where(b => b.BrandName.ToLower() == arg.ToLower()).SingleOrDefault();
            if (brand == null) return true;
            return false;
        }

    }
}
