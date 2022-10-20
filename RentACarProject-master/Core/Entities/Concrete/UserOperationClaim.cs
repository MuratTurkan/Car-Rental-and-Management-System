namespace Core.Entities.Concrete
{
    public class UserOperationClaim:IEntity
    {
        public long DetailId { get; set; }
        public long UserId { get; set; }
        public long ClaimId { get; set; }
    }

}
