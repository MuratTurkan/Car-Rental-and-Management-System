using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DTOs
{
    public class CarImageDetailDto:IDto
    {
        public long ImageId { get; set; }
        public long CarId { get; set; }
        public string CarPlate { get; set; }
        public string ImagePath { get; set; }
    }
}
