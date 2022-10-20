using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Concrete
{
    public class Class:IEntity
    {
        public long ClassId { get; set; }
        public string ClassName { get; set; }
}
}
