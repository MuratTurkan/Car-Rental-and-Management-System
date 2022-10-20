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
    public class RentalDetailsController : ControllerBase
    {
        IRentalDetailService _rentalDetailService;
        public RentalDetailsController(IRentalDetailService rentalDetailService)
        {
            _rentalDetailService = rentalDetailService;
        }

        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            var result = _rentalDetailService.GetAll();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("getRentalDetails")]
        public IActionResult GetRentalDetails()
        {
            var result = _rentalDetailService.GetRentalDetails();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("getRentalDetailsByUserId")]
        public IActionResult GetRentalDetailsByUserId(long userId)
        {
            var result = _rentalDetailService.GetRentalDetailsByUserId(userId);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("getById")]
        public IActionResult GetById(long rentalId)
        {
            var result = _rentalDetailService.GetById(rentalId);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpPost("add")]
        public IActionResult Add(RentalDetail rentalDetail)
        {
            var result = _rentalDetailService.Add(rentalDetail);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpPost("update")]
        public IActionResult Update(RentalDetail rentalDetail)
        {
            var result = _rentalDetailService.Update(rentalDetail);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpPost("delete")]
        public IActionResult Delete(RentalDetail rentalDetail)
        {
            var result = _rentalDetailService.Delete(rentalDetail);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}
