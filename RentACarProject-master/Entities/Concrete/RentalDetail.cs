using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Concrete
{
    public class RentalDetail : IEntity
    {
        public long RentalId { get; set; }
        public long UserId { get; set; }
        public long CarId { get; set; }
        public long BranchId { get; set; }
        public DateTime RentDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public int RentalPrice { get; set; }
    }
}
