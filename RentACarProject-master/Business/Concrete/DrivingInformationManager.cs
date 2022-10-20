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
    public class DrivingInformationManager : IDrivingInformationService
    {
        IDrivingInformationDal _drivingInformationDal;

        public DrivingInformationManager(IDrivingInformationDal drivingInformationDal)
        {
            _drivingInformationDal = drivingInformationDal;
        }

        [ValidationAspect(typeof(DrivingInformationValidator))]
        public IResult Add(DrivingInformation drivingInformation)
        {
            _drivingInformationDal.Add(drivingInformation);
            return new SuccessResult(Messages.Added);
        }

        public IResult Delete(DrivingInformation drivingInformation)
        {
            _drivingInformationDal.Delete(drivingInformation);
            return new SuccessResult(Messages.Deleted);
        }

        public IDataResult<List<DrivingInformation>> GetAll()
        {
            return new SuccessDataResult<List<DrivingInformation>>(_drivingInformationDal.GetAll(), Messages.Listed);
        }

        public IDataResult<DrivingInformation> GetById(long drivingId)
        {
            return new SuccessDataResult<DrivingInformation>(_drivingInformationDal.Get(d => d.DrivingId == drivingId), Messages.Get);
        }

        public IDataResult<DrivingInformation> GetByUserId(long userId)
        {
            return new SuccessDataResult<DrivingInformation>(_drivingInformationDal.Get(i => i.UserId == userId), Messages.Get);
        }

        public IResult Update(DrivingInformation drivingInformation)
        {
            _drivingInformationDal.Update(drivingInformation);
            return new SuccessResult(Messages.Updated);
        }
    }
}
