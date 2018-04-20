using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Keas.Core.Data;
using Keas.Core.Domain;
using Microsoft.EntityFrameworkCore;

namespace Keas.Mvc.Services
{
    public interface IHistoryService
    {
        
    }

    public class HistoryService : IHistoryService
    {
        private readonly ApplicationDbContext _context;
        public HistoryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async void KeyCreated(Key key)
        {
            var user = GetUser().Result;
            var historyEntry = new History
            {
                Description = "Key Created",
                Actor = user,
                ActorName = user.Name,
                KeasType = "Key",
                ActionType = "Created",
                Key = key
            };
            _context.Histories.Add(historyEntry);
            await _context.SaveChangesAsync();

            // TODO call notification service for this action

        }
        
        public async Task<User> GetUser()
        {
            var userId = ClaimsPrincipal.Current.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _context.Users.SingleOrDefaultAsync(x => x.Email == userId);
            return user;
        }
    }
}
