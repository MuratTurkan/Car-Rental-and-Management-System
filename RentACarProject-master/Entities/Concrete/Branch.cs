using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Concrete
{
    public class Branch : IEntity

    {
        public long BranchId { get; set; }
        public int CityId { get; set; }
        public string BranchName { get; set; }
    }
}
