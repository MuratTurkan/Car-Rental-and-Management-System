using Business.Abstract;
using Business.Constants;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Validation;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class CardManager : ICardService
    {
        ICardDal _cardDal;

        public CardManager(ICardDal cardDal)
        {
            _cardDal = cardDal;
        }

        [ValidationAspect(typeof(CardValidator))]
        public IResult Add(Card card)
        {
            _cardDal.Add(card);
            return new SuccessResult(Messages.Added);
        }

        public IResult Delete(Card card)
        {
            _cardDal.Delete(card);
            return new SuccessResult(Messages.Deleted);
        }

        public IDataResult<List<Card>> GetAll()
        {
            return new SuccessDataResult<List<Card>>(_cardDal.GetAll(), Messages.Listed);
        }

        public IDataResult<Card> GetById(long cardId)
        {
            return new SuccessDataResult<Card>(_cardDal.Get(c => c.CardId == cardId), Messages.Get);
        }

        public IDataResult<List<CardDetailDto>> GetCardDetails()
        {
            return new SuccessDataResult<List<CardDetailDto>>(_cardDal.GetCardDetails(), Messages.Get);
        }

        public IDataResult<List<CardDetailDto>> GetCardDetailsByUserId(long userId)
        {
            return new SuccessDataResult<List<CardDetailDto>>(_cardDal.GetCardDetails(c=>c.UserId==userId), Messages.Get);
        }

        public IResult Update(Card card)
        {
            _cardDal.Update(card);
            return new SuccessResult(Messages.Updated);
        }
    }
}
