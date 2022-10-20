using Core.Utilities.Results;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface ICardService
    {
        IDataResult<List<Card>> GetAll();
        IDataResult<List<CardDetailDto>> GetCardDetails();
        IDataResult<List<CardDetailDto>> GetCardDetailsByUserId(long userId);
        IDataResult<Card> GetById(long cardId);
        IResult Add(Card card);
        IResult Update(Card card);
        IResult Delete(Card card);


    }
}
