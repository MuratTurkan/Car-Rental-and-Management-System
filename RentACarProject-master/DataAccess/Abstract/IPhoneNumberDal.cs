using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;
using Core.DataAccess;
using Entities.DTOs;

namespace DataAccess.Abstract
{
    public interface IPhoneNumberDal : IEntityRepository<PhoneNumber>
    {
        List<PhoneNumberDetailDto> GetPhoneNumberDetails();
    }
}
