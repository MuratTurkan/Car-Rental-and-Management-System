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
    public class DrivingInformationsController : ControllerBase
    {
        IDrivingInformationService _drivingInformationService;
        public DrivingInformationsController(IDrivingInformationService drivingInformationService)
        {
            _drivingInformationService = drivingInformationService;
        }

        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            var result = _drivingInformationService.GetAll();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("getByUserId")]
        public IActionResult GetByUserId(long userId)
        {
            var result = _drivingInformationService.GetByUserId(userId);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("getById")]
        public IActionResult GetById(long drivingId)
        {
            var result = _drivingInformationService.GetById(drivingId);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }   

        [HttpPost("add")]
        public IActionResult Add(DrivingInformation drivingInformation)
        {
            var result = _drivingInformationService.Add(drivingInformation);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpPost("update")]
        public IActionResult Update(DrivingInformation drivingInformation)
        {
            var result = _drivingInformationService.Update(drivingInformation);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpPost("delete")]
        public IActionResult Delete(DrivingInformation drivingInformation)
        {
            var result = _drivingInformationService.Delete(drivingInformation);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}
