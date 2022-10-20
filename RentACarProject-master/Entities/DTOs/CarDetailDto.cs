using Core.Entities;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DTOs
{
    public class CarDetailDto : IDto
    {
        public long CarId { get; set; }
        public long BranchId { get; set; }
        public string BrandName { get; set; }
        public string ColorName { get; set; }
        public string BranchName { get; set; }
        public string GearName { get; set; }
        public string FuelName { get; set; }
        public string ClassName { get; set; }
        public string CaseName { get; set; }
        public string CarPlate { get; set; }
        public double CarStar { get; set; }
        public int ModelYear { get; set; }
        public int DailyPrice { get; set; }
        public string Description { get; set; }
        public string CarUsable { get; set; }
        public string CarLocation { get; set; }
        public List<CarImage> CarImages { get; set; }
    }
}
