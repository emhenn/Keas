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

        public async void KeyCreated(Key key, User user)
        {
            var historyEntry = new History
            {
                Description = "Key Created",
                Actor = user,
                ActorName = user.Name,
                AssetType = "Key",
                ActionType = "Created",
                Key = key
            };
            _context.Histories.Add(historyEntry);
            await _context.SaveChangesAsync();

        }
        
      
    }
}
