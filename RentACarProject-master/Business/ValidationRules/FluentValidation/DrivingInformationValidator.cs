using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Business.ValidationRules.FluentValidation
{
    public class DrivingInformationValidator : AbstractValidator<DrivingInformation>
    {

        public DrivingInformationValidator()
        {
            RuleFor(d => d.UserId).NotEmpty();
            RuleFor(d => d.UserId).Must(UniqueUserId).WithMessage("Bu kullanıcının ehliyet bilgisi daha önce kaydedilmiş.");
            RuleFor(d => d.LicenceNumber).NotEmpty();
            RuleFor(d => d.LicenceNumber).Must(UniqueLicenceNumber).WithMessage("Bu lisans numarası daha önce kaydedilmiş.");
            RuleFor(d => d.ExpiryDate).NotEmpty();
            RuleFor(d => d.BloodGroup).NotEmpty();
            RuleFor(d => d.LicenceProvince).NotEmpty();
        }

        private bool UniqueUserId(long arg)
        {
            RentACarProjectContext _db = new RentACarProjectContext();
            var drivingInformation = _db.DrivingInformations.Where(d => d.UserId == arg).SingleOrDefault();
            if (drivingInformation == null) return true;
            return false;
        }
        private bool UniqueLicenceNumber(string arg)
        {
            RentACarProjectContext _db = new RentACarProjectContext();
            var drivingInformation = _db.DrivingInformations.Where(d => d.LicenceNumber.ToLower() == arg.ToLower()).SingleOrDefault();
            if (drivingInformation == null) return true;
            return false;
        }
    }
}
