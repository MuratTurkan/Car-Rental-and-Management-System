using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Business.ValidationRules.FluentValidation
{
    public class IdentityInformationValidator : AbstractValidator<IdentityInformation>
    {

        public IdentityInformationValidator()
        {
            RuleFor(ı => ı.UserId).NotEmpty();
            RuleFor(ı => ı.UserId).Must(UniqueUserId).WithMessage("Bu kullanıcının kimlik bilgisi daha önce kaydedilmiş.");
            RuleFor(ı => ı.SerialNumber).NotEmpty();
            RuleFor(ı => ı.SerialNumber).Must(UniqueSerialNumber).WithMessage("Bu seri numarası daha önce kaydedilmiş.");
            RuleFor(ı => ı.FatherName).NotEmpty();
            RuleFor(ı => ı.MotherName).NotEmpty();
            RuleFor(ı => ı.BirthPlace).NotEmpty();
            RuleFor(ı => ı.BirthYear).NotEmpty();
            RuleFor(ı => ı.MaritalStatus).NotEmpty();
            RuleFor(ı => ı.Gender).NotEmpty();
            RuleFor(ı => ı.ValidUntil).NotEmpty();
        }

        private bool UniqueUserId(long arg)
        {
            RentACarProjectContext _db = new RentACarProjectContext();
            var identityInformation = _db.IdentityInformations.Where(i => i.UserId == arg).SingleOrDefault();
            if (identityInformation == null) return true;
            return false;
        }
        private bool UniqueSerialNumber(string arg)
        {
            RentACarProjectContext _db = new RentACarProjectContext();
            var identityInformation = _db.IdentityInformations.Where(i => i.SerialNumber.ToLower() == arg.ToLower()).SingleOrDefault();
            if (identityInformation == null) return true;
            return false;
        }
    }
}
