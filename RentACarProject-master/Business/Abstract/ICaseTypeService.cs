using Core.Utilities.Results;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface ICaseTypeService
    {
        IDataResult<List<CaseType>> GetAll();
        IDataResult<CaseType> GetById(long caseId);
        IResult Add(CaseType caseType);
        IResult Update(CaseType caseType);
        IResult Delete(CaseType caseType);


    }
}
