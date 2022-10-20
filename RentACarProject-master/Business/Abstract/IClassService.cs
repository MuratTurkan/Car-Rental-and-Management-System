using Core.Utilities.Results;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IClassService
    {
        IDataResult<List<Class>> GetAll();
        IDataResult<Class> GetById(long classId);
        IResult Add(Class classes);
        IResult Update(Class classes);
        IResult Delete(Class classes);


    }
}
