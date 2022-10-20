using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DTOs
{
    public class PhoneNumberDetailDto:IDto
    {
        public long PhoneId { get; set; }
        public long UserId { get; set; }
        public string NationalityId { get; set; }
        public string PhoneNo { get; set; }
    }
}
