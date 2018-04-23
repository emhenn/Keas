using Keas.Core.Data;
using Keas.Core.Domain;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Keas.Mvc.Services
{
    public interface INotificationService
    {
        Task KeyCreated(Key key, History history);

    }
    public class NotificationService : INotificationService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ISecurityService _securityService;

        public NotificationService(ApplicationDbContext dbContext, ISecurityService securityService)
        {
            _dbContext = dbContext;
            _securityService = securityService;
        }

        // Assume we email all Team KeyMasters & DepartmentalAdmins
        public async Task KeyCreated(Key key, History history)
        {
            var roles = _dbContext.Roles
                    .Where(r => r.Name == Role.Codes.DepartmentalAdmin || r.Name == Role.Codes.KeyMaster).ToList();
            var users = await _securityService.GetUsersInRoles(roles, key.TeamId);
            foreach (var user in users)
            {
                var emailQueue = new EmailQueue
                    {
                        User = user,
                        History = history,
                        Details = string.Format("{0} By {1}.", history.Description, history.ActorName)
                    };
                    _dbContext.EmailQueues.Add(emailQueue);
            }
           await _dbContext.SaveChangesAsync();
        }
    }
}
