using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Business.Abstract;
using Business.BusinessAspects.Autofac;
using Business.Constants;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Validation;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;

namespace Business.Concrete
{
    public class CarManager : ICarService
    {
        ICarDal _carDal;
        IRentalDetailService _rentalDetailService;
        ICarImageService _carImageService;

        public CarManager(ICarDal carDal, IRentalDetailService rentalDetailService, ICarImageService carImageService)
        {
            _carDal = carDal;
            _rentalDetailService = rentalDetailService;
            _carImageService = carImageService;
        }
        [SecuredOperation("Yönetici,Çalışan")]
        [ValidationAspect(typeof(CarValidator))]
        public IResult Add(Car car)
        {
            if (car.DailyPrice > 0 && car.Description.Length >= 2)
            {
                _carDal.Add(car);
                return new SuccessResult(Messages.Added);
            }
            else
            {
                Console.WriteLine("Hatalı giriş yaptınız...");
                return new ErrorResult(Messages.ErrorAdded);
            }

        }

        [SecuredOperation("Yönetici,Çalışan")]
        public IResult Delete(Car car)
        {
            _carDal.Delete(car);
            return new SuccessResult(Messages.Deleted);
        }

        public IDataResult<List<Car>> GetAll()
        {
            return new SuccessDataResult<List<Car>>(_carDal.GetAll().OrderByDescending(c => c.ModelYear).ToList(), Messages.Listed);
        }

        public IDataResult<Car> GetById(long carId)
        {
            return new SuccessDataResult<Car>(_carDal.Get(c => c.CarId == carId), Messages.Get);
        }

        public IDataResult<List<CarDetailDto>> GetByUsable(DateTime rentDate, DateTime returnDate, long branchId)
        {
            if (rentDate.DayOfYear < DateTime.Now.DayOfYear || returnDate.DayOfYear < DateTime.Now.DayOfYear ||
                rentDate.DayOfYear > DateTime.Now.DayOfYear + 30 || returnDate.DayOfYear > DateTime.Now.DayOfYear + 30)
            {
                return new ErrorDataResult<List<CarDetailDto>>("En Erken Bugün ve En Geç 30 Gün Sonrasını Seçebilirsiniz.");
            }
            if (returnDate < rentDate)
            {
                return new ErrorDataResult<List<CarDetailDto>>("Bırakış Tarihi Alış Tarihinden Önce Olamaz.");
            }

            List<CarDetailDto> kullanilabilirArabalar = _carDal.GetByUsable(branchId);
            List<RentalDetail> rentalDetailList = _rentalDetailService.GetAll().Data;
            List<RentalDetail> silinecekler = new List<RentalDetail>();
            for (int i = 0; i < rentalDetailList.Count; i++)
            {
                if ((rentDate >= rentalDetailList[i].RentDate && rentDate <= rentalDetailList[i].ReturnDate) ||
                    (returnDate >= rentalDetailList[i].RentDate && returnDate <= rentalDetailList[i].ReturnDate))
                {
                    silinecekler.Add(rentalDetailList[i]);
                }
            }
            for (int i = 0; i < kullanilabilirArabalar.Count; i++)
            {
                for (int j = 0; j < silinecekler.Count; j++)
                {
                    if (kullanilabilirArabalar[i].CarId == silinecekler[j].CarId)
                    {
                        kullanilabilirArabalar.RemoveAt(i);
                        if (kullanilabilirArabalar.Count == 0)
                        {
                            break;
                        }
                    }
                }

            }

            for (int i = 0; i < kullanilabilirArabalar.Count; i++)
            {
                kullanilabilirArabalar[i].CarImages = _carImageService.GetByCarId(kullanilabilirArabalar[i].CarId).Data ;
            }

            return new SuccessDataResult<List<CarDetailDto>>(kullanilabilirArabalar, Messages.Get);
        }

        public IDataResult<List<CarDetailDto>> GetCarDetails()
        {
            return new SuccessDataResult<List<CarDetailDto>>(_carDal.GetCarDetails().OrderBy(c => c.BrandName).ToList(), Messages.Listed);
        }

        [SecuredOperation("Yönetici,Çalışan")]
        public IResult Update(Car car)
        {
            _carDal.Update(car);
            return new SuccessResult(Messages.Updated);
        }
    }
}
