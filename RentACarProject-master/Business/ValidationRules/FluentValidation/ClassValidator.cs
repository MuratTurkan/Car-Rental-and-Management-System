using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Business.ValidationRules.FluentValidation
{
    public class ClassValidator : AbstractValidator<Class>
    {

        public ClassValidator()
        {
            RuleFor(c => c.ClassName).NotEmpty();
            RuleFor(c => c.ClassName).Must(UniqueName).WithMessage("Bu sınıf daha önce kaydedilmiş.");
        }

        private bool UniqueName(string arg)
        {
            RentACarProjectContext _db = new RentACarProjectContext();
            var classs = _db.Classes.Where(c => c.ClassName.ToLower() == arg.ToLower()).SingleOrDefault();
            if (classs == null) return true;
            return false;
        }
    }
}
