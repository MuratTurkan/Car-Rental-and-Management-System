using Core.Entities;

namespace Entities.DTOs
{
    public class UserForRegisterDto : IDto
    {
        
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string NationalityId { get; set; }
        public int BirthYear { get; set; }
        public string Password { get; set; }
        public long ClaimId { get; set; }
    }
}
