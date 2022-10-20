using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Concrete
{
    public class CaseType:IEntity
    {
        public long CaseId { get; set; }
        public string CaseName { get; set; }
}
}
