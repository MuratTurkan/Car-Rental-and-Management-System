using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Concrete
{
    public class PhoneNumber : IEntity
    {
        public long PhoneId { get; set; }
        public long UserId { get; set; }
        public string PhoneNo { get; set; }
}
}
