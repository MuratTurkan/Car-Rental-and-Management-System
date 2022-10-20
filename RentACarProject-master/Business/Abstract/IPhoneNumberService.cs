using Core.Utilities.Results;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IPhoneNumberService
    {
        IDataResult<List<PhoneNumber>> GetAll();
        IDataResult<List<PhoneNumberDetailDto>> GetPhoneNumberDetails();
        IDataResult<List<PhoneNumber>> GetByUserPhoneNumbers(long userId);
        IDataResult<PhoneNumber> GetById(long phoneId);
        IResult Add(PhoneNumber phoneNumber);
        IResult Update(PhoneNumber phoneNumber);
        IResult Delete(PhoneNumber phoneNumber);

    }
}
