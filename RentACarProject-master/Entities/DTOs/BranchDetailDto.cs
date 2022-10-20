using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DTOs
{
    public class BranchDetailDto:IDto
    {
        public long BranchId { get; set; }
        public string CityName { get; set; }
        public string BranchName { get; set; }
    }
}
