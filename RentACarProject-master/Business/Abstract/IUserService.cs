using Core.Entities.Concrete;
using Core.Utilities.Results;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IUserService
    {
        IDataResult<List<User>> GetAll();
        IDataResult<List<UserDetailDto>> GetUserDetails();
        IDataResult<List<UserDetailDto>> GetByCustomers();
        IDataResult<List<User>> GetByRoles(string claimName);
        IDataResult<User> GetById(long userId);
        IDataResult<UserDetailDto> GetByUserId(long userId);
        IResult Add(User user);
        IResult Update(User user);
        IResult Delete(User user);
        List<OperationClaim> GetClaims(User user);
        IDataResult<OperationClaim> GetByUserClaim(long userId);
        IDataResult<User> GetByMail(string email);
    }
}
