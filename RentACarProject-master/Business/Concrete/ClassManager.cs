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
    public class ClassManager : IClassService
    {
        IClassDal _classDal;

        public ClassManager(IClassDal classDal)
        {
            _classDal = classDal;
        }

        [SecuredOperation("Yönetici,Çalışan")]
        [ValidationAspect(typeof(ClassValidator))]
        public IResult Add(Class classes)
        {
            _classDal.Add(classes);
            return new SuccessResult(Messages.Added);
        }

        [SecuredOperation("Yönetici,Çalışan")]
        public IResult Delete(Class classes)
        {
            _classDal.Delete(classes);
            return new SuccessResult(Messages.Deleted);
        }

        public IDataResult<List<Class>> GetAll()
        {
            return new SuccessDataResult<List<Class>>(_classDal.GetAll().OrderBy(c => c.ClassName).ToList(), Messages.Listed);
        }

        public IDataResult<Class> GetById(long classId)
        {
            return new SuccessDataResult<Class>(_classDal.Get(c => c.ClassId == classId), Messages.Get);
        }

        [SecuredOperation("Yönetici,Çalışan")]
        public IResult Update(Class classes)
        {
            _classDal.Update(classes);
            return new SuccessResult(Messages.Updated);
        }
    }
}
