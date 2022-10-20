using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Business.ValidationRules.FluentValidation
{
    public class CardValidator : AbstractValidator<Card>
    {

        public CardValidator()
        {
            RuleFor(c => c.UserId).NotEmpty();
            RuleFor(c => c.FullName).NotEmpty();
            RuleFor(c => c.CardNo).NotEmpty();
            RuleFor(c => c.CardNo).Must(UniqueCardNo).WithMessage("Bu kart numarası daha önce kaydedilmiş."); ;
            RuleFor(c => c.ExpiryDate).NotEmpty();
            RuleFor(c => c.Cvv).NotEmpty();
        }
        private bool UniqueCardNo(long arg)
        {
            RentACarProjectContext _db = new RentACarProjectContext();
            var card = _db.Cards.Where(c => c.CardNo == arg).SingleOrDefault();
            if (card == null) return true;
            return false;
        }


    }
}
