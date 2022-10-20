using Core.Utilities.Results;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IIdentityInformationService
    {
        IDataResult<List<IdentityInformation>> GetAll();
        IDataResult<IdentityInformation> GetById(long identityId);
        IDataResult<IdentityInformation> GetByUserId(long userId);
        IResult Add(IdentityInformation identityInformation);
        IResult Update(IdentityInformation identityInformation);
        IResult Delete(IdentityInformation identityInformation);


    }
}
