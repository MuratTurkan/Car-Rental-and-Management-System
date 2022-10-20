using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Concrete
{
    public class Gear : IEntity
    {
        public long GearId { get; set; }
        public string GearName { get; set; }
}
}
