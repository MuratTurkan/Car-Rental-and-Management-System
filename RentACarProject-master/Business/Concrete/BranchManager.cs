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
    public class BranchManager : IBranchService
    {
        IBranchDal _branchDal;

        public BranchManager(IBranchDal branchDal)
        {
            _branchDal = branchDal;
        }

        [SecuredOperation("Yönetici")]
        [ValidationAspect(typeof(BranchValidator))]
        public IResult Add(Branch branch)
        {
            _branchDal.Add(branch);
            return new SuccessResult(Messages.Added);
        }

        [SecuredOperation("Yönetici")]
        public IResult Delete(Branch branch)
        {
            _branchDal.Delete(branch);
            return new SuccessResult(Messages.Deleted);
        }

        public IDataResult<List<Branch>> GetAll()
        {
            return new SuccessDataResult<List<Branch>>(_branchDal.GetAll().OrderBy(b=> b.BranchName).ToList(), Messages.Listed);
        }

        public IDataResult<List<BranchDetailDto>> GetBranchDetails()
        {
            return new SuccessDataResult<List<BranchDetailDto>>(_branchDal.GetBranchDetails().OrderBy(b => b.BranchName).ToList(), Messages.Listed);
        }

        public IDataResult<Branch> GetByBranchName(string branchName)
        {
            return new SuccessDataResult<Branch>(_branchDal.GetByBranchName(branchName), Messages.Get);
        }

        public IDataResult<Branch> GetById(long branchId)
        {
            return new SuccessDataResult<Branch>(_branchDal.Get(b => b.BranchId == branchId), Messages.Get);
        }

        [SecuredOperation("Yönetici")]
        public IResult Update(Branch branch)
        {
            _branchDal.Update(branch);
            return new SuccessResult(Messages.Updated);
        }
    }
}
