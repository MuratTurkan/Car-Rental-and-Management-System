using Entities.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.ValidationRules.FluentValidation
{
    public class RentalDetailValidator : AbstractValidator<RentalDetail>
    {

        public RentalDetailValidator()
        {
            RuleFor(r => r.UserId).NotEmpty();
            RuleFor(r => r.CarId).NotEmpty();
            RuleFor(r => r.BranchId).NotEmpty();
            RuleFor(r => r.RentDate).NotEmpty();
            RuleFor(r => r.ReturnDate).NotEmpty();
            RuleFor(r => r.RentalPrice).NotEmpty();
        }
    }
}
