using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Concrete
{
    public class DrivingInformation : IEntity
    {
        public long DrivingId { get; set; }
        public long UserId { get; set; }
        public string LicenceNumber { get; set; }
        public DateTime ExpiryDate { get; set; }
        public string BloodGroup { get; set; }
        public string LicenceProvince { get; set; }
    }
}
