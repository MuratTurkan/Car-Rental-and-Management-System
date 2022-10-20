using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Business.ValidationRules.FluentValidation
{
    public class CarValidator : AbstractValidator<Car>
    {

        public CarValidator()
        {
            RuleFor(c => c.BrandId).NotEmpty();
            RuleFor(c => c.ColorId).NotEmpty();
            RuleFor(c => c.BranchId).NotEmpty();
            RuleFor(c => c.GearId).NotEmpty();
            RuleFor(c => c.FuelId).NotEmpty();
            RuleFor(c => c.ClassId).NotEmpty();
            RuleFor(c => c.CaseId).NotEmpty();
            RuleFor(c => c.CarPlate).NotEmpty();
            RuleFor(c => c.CarPlate).Must(UniquePlate).WithMessage("Bu plaka daha önce kaydedilmiş."); ;
            RuleFor(c => c.CarStar).NotEmpty();
            RuleFor(c => c.ModelYear).NotEmpty();
            RuleFor(c => c.DailyPrice).NotEmpty();
            RuleFor(c => c.Description).NotEmpty();
            RuleFor(c => c.CarUsable).NotEmpty();
            RuleFor(c => c.CarLocation).NotEmpty();

        }

        private bool UniquePlate(string arg)
        {
            RentACarProjectContext _db = new RentACarProjectContext();
            var car = _db.Cars.Where(c => c.CarPlate.ToLower() == arg.ToLower()).SingleOrDefault();
            if (car == null) return true;
            return false;
        }
    }
}
