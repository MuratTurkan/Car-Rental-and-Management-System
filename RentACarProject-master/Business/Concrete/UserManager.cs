using Business.Abstract;
using Business.BusinessAspects.Autofac;
using Business.Constants;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Validation;
using Core.Entities.Concrete;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Business.Concrete
{
    public class UserManager : IUserService
    {
        IUserDal _userDal;
        IUserOperationClaimService _userOperationClaimService;
        

        public UserManager(IUserDal userDal, IUserOperationClaimService userOperationClaimService)
        {
            _userDal = userDal;
            _userOperationClaimService = userOperationClaimService;
        }

        [ValidationAspect(typeof(UserValidator))]
        public IResult Add(User user)
        {
            _userDal.Add(user);
            return new SuccessResult(Messages.Added);
        }

        [SecuredOperation("Yönetici,Çalışan")]
        public IResult Delete(User user)
        {
            var userOperationClaim = _userOperationClaimService.GetByUserId(user.UserId).Data;
            if (userOperationClaim != null)
            {
                _userOperationClaimService.Delete(userOperationClaim);
            }
            _userDal.Delete(user);
            return new SuccessResult(Messages.Deleted);
        }

        public IDataResult<List<User>> GetAll()
        {
            return new SuccessDataResult<List<User>>(_userDal.GetAll().OrderBy(u => u.FirstName).ToList(), Messages.Listed);
        }

        public IDataResult<List<User>> GetByRoles(string claimName)
        {
            return new SuccessDataResult<List<User>>(_userDal.GetByRoles(claimName).OrderBy(u => u.FirstName).ToList(), Messages.Listed);
        }

        public IDataResult<User> GetById(long userId)
        {
            return new SuccessDataResult<User>(_userDal.Get(u => u.UserId == userId), Messages.Get);
        }

        public IDataResult<User> GetByMail(string email)
        {
            return new SuccessDataResult<User>(_userDal.Get(u => u.Email == email));
        }

        public List<OperationClaim> GetClaims(User user)
        {
            return _userDal.GetClaims(user).OrderBy(o => o.ClaimName).ToList();
        }

        public IResult Update(User user)
        {
            var result = _userDal.Get(u => u.UserId == user.UserId);
            user.PasswordHash = result.PasswordHash;
            user.PasswordSalt = result.PasswordSalt;
            _userDal.Update(user);
            return new SuccessResult(Messages.Updated);
        }

        public IDataResult<List<UserDetailDto>> GetUserDetails()
        {
            var users = _userDal.GetAll();
            List<UserDetailDto> userDetailDto = new List<UserDetailDto>();

            foreach (var user in users)
            {
                userDetailDto.Add(new UserDetailDto
                {
                    UserId = user.UserId,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    NationalityId = user.NationalityId,
                    BirthYear = user.BirthYear,
                    Status = user.Status,
                    PasswordHash = user.PasswordHash,
                    PasswordSalt = user.PasswordSalt,
                    ClaimName = GetByUserClaim(user.UserId).Data.ClaimName,
                    ClaimId = GetByUserClaim(user.UserId).Data.ClaimId
                });
            }

            return new SuccessDataResult<List<UserDetailDto>>(userDetailDto.OrderBy(u => u.FirstName).ToList(), Messages.Listed);
        }

        public IDataResult<OperationClaim> GetByUserClaim(long userId)
        {
            var result = _userDal.GetByUserClaim(userId);
            return result != null ? new SuccessDataResult<OperationClaim>(result) : new SuccessDataResult<OperationClaim>(new OperationClaim { ClaimId = 0, ClaimName = "Yetki Yok" });
        }

        public IDataResult<List<UserDetailDto>> GetByCustomers()
        {
            return new SuccessDataResult<List<UserDetailDto>>(_userDal.GetByCustomers().OrderBy(u => u.FirstName).ToList());
        }

        public IDataResult<UserDetailDto> GetByUserId(long userId)
        {
            return new SuccessDataResult<UserDetailDto>(GetUserDetails().Data.Find(u => u.UserId == userId));
        }
    }
}
