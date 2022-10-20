using Core.Entities.Concrete;
using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Business.ValidationRules.FluentValidation
{
    public class UserValidator : AbstractValidator<User>
    {

        public UserValidator()
        {
            RuleFor(u => u.FirstName).NotEmpty();
            RuleFor(u => u.LastName).NotEmpty();
            RuleFor(u => u.Email).NotEmpty();
            RuleFor(u => u.Email).Must(UniqueEmail).WithMessage("Bu email daha önce kaydedilmiş.");
            RuleFor(u => u.NationalityId).NotEmpty();
            RuleFor(u => u.NationalityId).Must(UniqueNationalityId).WithMessage("Bu TC daha önce kaydedilmiş.");
            RuleFor(u => u.BirthYear).NotEmpty();
            RuleFor(u => u.Status).NotEmpty();
            RuleFor(u => u.PasswordHash).NotEmpty();
            RuleFor(u => u.PasswordSalt).NotEmpty();
        }

        private bool UniqueEmail(string arg)
        {
            RentACarProjectContext _db = new RentACarProjectContext();
            var user = _db.Users.Where(u => u.Email.ToLower() == arg.ToLower()).SingleOrDefault();
            if (user == null) return true;
            return false;
        }

        private bool UniqueNationalityId(string arg)
        {
            RentACarProjectContext _db = new RentACarProjectContext();
            var user = _db.Users.Where(u => u.NationalityId.ToLower() == arg.ToLower()).SingleOrDefault();
            if (user == null) return true;
            return false;
        }
    }
}
