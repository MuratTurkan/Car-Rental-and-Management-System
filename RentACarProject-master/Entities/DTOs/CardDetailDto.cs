using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DTOs
{
    public class CardDetailDto : IDto
    {
        public long CardId { get; set; }
        public long UserId { get; set; }
        public string NationalityId { get; set; }
        public string FullName { get; set; }
        public long CardNo { get; set; }
        public DateTime ExpiryDate { get; set; }
        public int Cvv { get; set; }
    }
}
