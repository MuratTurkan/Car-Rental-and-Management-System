using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Concrete
{
    public class IdentityInformation : IEntity
    {
        public long IdentityId { get; set; }
        public long UserId { get; set; }
        public string SerialNumber { get; set; }
        public string FatherName { get; set; }
        public string MotherName { get; set; }
        public string BirthPlace { get; set; }
        public int BirthYear { get; set; }
        public string MaritalStatus { get; set; }
        public string Gender { get; set; }
        public DateTime ValidUntil { get; set; }
}
}
