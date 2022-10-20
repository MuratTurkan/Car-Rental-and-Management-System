using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Concrete
{
    public class CarImage : IEntity
    {
        public long ImageId { get; set; }
        public long CarId { get; set; }
        public string ImagePath { get; set; }
    }
}
