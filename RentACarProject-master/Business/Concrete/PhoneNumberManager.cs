using Business.Abstract;
using Business.BusinessAspects.Autofac;
using Business.Constants;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Validation;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Business.Concrete
{
    public class PhoneNumberManager : IPhoneNumberService
    {
        IPhoneNumberDal _phoneNumberDal;

        public PhoneNumberManager(IPhoneNumberDal phoneNumberDal)
        {
            _phoneNumberDal = phoneNumberDal;
        }

        [ValidationAspect(typeof(PhoneNumberValidator))]
        public IResult Add(PhoneNumber phoneNumber)
        {
            _phoneNumberDal.Add(phoneNumber);
            return new SuccessResult(Messages.Added);
        }

        public IResult Delete(PhoneNumber phoneNumber)
        {
            _phoneNumberDal.Delete(phoneNumber);
            return new SuccessResult(Messages.Deleted);
        }

        [SecuredOperation("Yönetici,Çalışan")]
        public IDataResult<List<PhoneNumber>> GetAll()
        {
            return new SuccessDataResult<List<PhoneNumber>>(_phoneNumberDal.GetAll().OrderBy(p => p.PhoneNo).ToList(), Messages.Listed);
        }

        [SecuredOperation("Yönetici,Çalışan")]
        public IDataResult<PhoneNumber> GetById(long phoneId)
        {
            return new SuccessDataResult<PhoneNumber>(_phoneNumberDal.Get(p => p.PhoneId == phoneId), Messages.Get);
        }

        public IDataResult<List<PhoneNumber>> GetByUserPhoneNumbers(long userId)
        {
            return new SuccessDataResult<List<PhoneNumber>>(_phoneNumberDal.GetAll(p => p.UserId == userId).OrderBy(p => p.PhoneNo).ToList());
        }

        [SecuredOperation("Yönetici,Çalışan")]
        public IDataResult<List<PhoneNumberDetailDto>> GetPhoneNumberDetails()
        {
            return new SuccessDataResult<List<PhoneNumberDetailDto>>(_phoneNumberDal.GetPhoneNumberDetails().OrderBy(p => p.NationalityId).ToList(), Messages.Listed);
        }

        [SecuredOperation("Yönetici,Çalışan")]
        public IResult Update(PhoneNumber phoneNumber)
        {
            _phoneNumberDal.Update(phoneNumber);
            return new SuccessResult(Messages.Updated);
        }
    }
}
