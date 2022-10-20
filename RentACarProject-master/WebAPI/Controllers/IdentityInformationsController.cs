using Business.Abstract;
using Entities.Concrete;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IdentityInformationsController : ControllerBase
    {
        IIdentityInformationService _identityInformationService;
        public IdentityInformationsController(IIdentityInformationService identityInformationService)
        {
            _identityInformationService = identityInformationService;
        }

        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            var result = _identityInformationService.GetAll();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("getByUserId")]
        public IActionResult GetByUserId(long userId)
        {
            var result = _identityInformationService.GetByUserId(userId);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("getById")]
        public IActionResult GetById(long identityId)
        {
            var result = _identityInformationService.GetById(identityId);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }   

        [HttpPost("add")]
        public IActionResult Add(IdentityInformation identityInformation)
        {
            var result = _identityInformationService.Add(identityInformation);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpPost("update")]
        public IActionResult Update(IdentityInformation identityInformation)
        {
            var result = _identityInformationService.Update(identityInformation);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpPost("delete")]
        public IActionResult Delete(IdentityInformation identityInformation)
        {
            var result = _identityInformationService.Delete(identityInformation);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}
