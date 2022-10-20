using Business.Abstract;
using Business.BusinessAspects.Autofac;
using Business.Constants;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Validation;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class IdentityInformationManager : IIdentityInformationService
    {
        IIdentityInformationDal _identityInformationDal;

        public IdentityInformationManager(IIdentityInformationDal identityInformationDal)
        {
            _identityInformationDal = identityInformationDal;
        }

        [ValidationAspect(typeof(IdentityInformationValidator))]
        public IResult Add(IdentityInformation identityInformation)
        {
            _identityInformationDal.Add(identityInformation);
            return new SuccessResult(Messages.Added);
        }

        public IResult Delete(IdentityInformation identityInformation)
        {
            _identityInformationDal.Delete(identityInformation);
            return new SuccessResult(Messages.Deleted);
        }

        public IDataResult<List<IdentityInformation>> GetAll()
        {
            return new SuccessDataResult<List<IdentityInformation>>(_identityInformationDal.GetAll(), Messages.Listed);
        }
        public IDataResult<IdentityInformation> GetByUserId(long userId)
        {
            return new SuccessDataResult<IdentityInformation>(_identityInformationDal.Get(i => i.UserId == userId), Messages.Get);
        }

        public IDataResult<IdentityInformation> GetById(long identityId)
        {
            return new SuccessDataResult<IdentityInformation>(_identityInformationDal.Get(i => i.IdentityId == identityId), Messages.Get);
        }

        public IResult Update(IdentityInformation identityInformation)
        {
            _identityInformationDal.Update(identityInformation);
            return new SuccessResult(Messages.Updated);
        }
    }
}
