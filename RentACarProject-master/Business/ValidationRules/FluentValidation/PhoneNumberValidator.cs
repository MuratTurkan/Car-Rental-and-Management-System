using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Business.ValidationRules.FluentValidation
{
    public class PhoneNumberValidator : AbstractValidator<PhoneNumber>
    {

        public PhoneNumberValidator()
        {
            RuleFor(p => p.UserId).NotEmpty();
            RuleFor(p => p.PhoneNo).NotEmpty();
            RuleFor(p => p.PhoneNo).Must(UniqueName).WithMessage("Bu telefon numarası daha önce kaydedilmiş.");
        }

        private bool UniqueName(string arg)
        {             
            RentACarProjectContext _db = new RentACarProjectContext();
            var phoneNo = _db.PhoneNumbers.Where(p => p.PhoneNo.ToLower() == arg.ToLower()).SingleOrDefault();
            if (phoneNo == null) return true;
            return false;
        }
    }
}
