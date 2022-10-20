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
using System.Linq;
using System.Text;

namespace Business.Concrete
{
    public class CaseTypeManager : ICaseTypeService
    {
        ICaseTypeDal _caseTypeDal;

        public CaseTypeManager(ICaseTypeDal caseTypeDal)
        {
            _caseTypeDal = caseTypeDal;
        }

        [SecuredOperation("Yönetici,Çalışan")]
        [ValidationAspect(typeof(CaseTypeValidator))]
        public IResult Add(CaseType caseType)
        {
            _caseTypeDal.Add(caseType);
            return new SuccessResult(Messages.Added);
        }

        [SecuredOperation("Yönetici,Çalışan")]
        public IResult Delete(CaseType caseType)
        {
            _caseTypeDal.Delete(caseType);
            return new SuccessResult(Messages.Deleted);
        }

        public IDataResult<List<CaseType>> GetAll()
        {
            return new SuccessDataResult<List<CaseType>>(_caseTypeDal.GetAll().OrderBy(c => c.CaseName).ToList(), Messages.Listed);
        }

        public IDataResult<CaseType> GetById(long caseId)
        {
            return new SuccessDataResult<CaseType>(_caseTypeDal.Get(c => c.CaseId == caseId), Messages.Get);
        }

        [SecuredOperation("Yönetici,Çalışan")]
        public IResult Update(CaseType caseType)
        {
            _caseTypeDal.Update(caseType);
            return new SuccessResult(Messages.Updated);
        }
    }
}
