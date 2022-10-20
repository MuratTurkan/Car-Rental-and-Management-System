using Core.Utilities.Results;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IRentalDetailService
    {
        IDataResult<List<RentalDetail>> GetAll();
        IDataResult<List<RentalDetailDto>> GetRentalDetails();
        IDataResult<List<RentalDetailDto>> GetRentalDetailsByUserId(long userId);
        IDataResult<RentalDetail> GetById(long rentalId);
        IResult Add(RentalDetail rentalDetail);
        IResult Update(RentalDetail rentalDetail);
        IResult Delete(RentalDetail rentalDetail);

    }
}
