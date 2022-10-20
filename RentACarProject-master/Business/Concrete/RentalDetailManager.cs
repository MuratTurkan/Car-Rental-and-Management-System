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
    public class RentalDetailManager : IRentalDetailService
    {
        IRentalDetailDal _rentalDetailDal;
        IIdentityInformationDal _identityInformationDal;
        IDrivingInformationDal _drivingInformationDal;

        public RentalDetailManager(IRentalDetailDal rentalDetailDal, IIdentityInformationDal identityInformationDal, IDrivingInformationDal drivingInformationDal)
        {
            _rentalDetailDal = rentalDetailDal;
            _identityInformationDal = identityInformationDal;
            _drivingInformationDal = drivingInformationDal;
        }

        [ValidationAspect(typeof(RentalDetailValidator))]
        public IResult Add(RentalDetail rentalDetail)
        {
            if (_drivingInformationDal.Get(d => d.UserId == rentalDetail.UserId) == null ||
                _identityInformationDal.Get(i => i.UserId == rentalDetail.UserId) == null)
            {
                return new ErrorResult("Kimlik Bilgisi veya Ehliyet Bilgisi Bulunmayan Müşterilere Araç Kiralama Yapılamaz. Bilgileri güncelledikten sonra tekrar deneyiniz.");
            }
            _rentalDetailDal.Add(rentalDetail);
            return new SuccessResult(Messages.Rented);
        }

        [SecuredOperation("Yönetici,Çalışan")]
        public IResult Delete(RentalDetail rentalDetail)
        {
            _rentalDetailDal.Delete(rentalDetail);
            return new SuccessResult(Messages.Deleted);
        }

        public IDataResult<List<RentalDetail>> GetAll()
        {
            return new SuccessDataResult<List<RentalDetail>>(_rentalDetailDal.GetAll().OrderByDescending(r => r.RentDate).ToList(), Messages.Listed);
        }

        [SecuredOperation("Yönetici,Çalışan")]
        public IDataResult<RentalDetail> GetById(long rentalId)
        {
            return new SuccessDataResult<RentalDetail>(_rentalDetailDal.Get(r => r.RentalId == rentalId), Messages.Get);
        }

        [SecuredOperation("Yönetici,Çalışan")]
        public IDataResult<List<RentalDetailDto>> GetRentalDetails()
        {
            return new SuccessDataResult<List<RentalDetailDto>>(_rentalDetailDal.GetRentalDetails().OrderByDescending(r => r.RentDate).ToList(), Messages.Listed);
        }

        public IDataResult<List<RentalDetailDto>> GetRentalDetailsByUserId(long userId)
        {
            return new SuccessDataResult<List<RentalDetailDto>>(_rentalDetailDal.GetRentalDetails(r => r.UserId == userId).OrderByDescending(r => r.RentDate).ToList(), Messages.Listed);
        }

        [SecuredOperation("Yönetici,Çalışan")]
        public IResult Update(RentalDetail rentalDetail)
        {
            _rentalDetailDal.Update(rentalDetail);
            return new SuccessResult(Messages.Updated);
        }
    }
}
