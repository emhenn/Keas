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

        public async void AccessCreated(Access access, User user)
        {
            var historyEntry = new History
            {
                Description = "Access Created",
                Actor = user,
                ActorName = user.Name,
                AssetType = "Access",
                ActionType = "Created",
                Access = access
            };
            _context.Histories.Add(historyEntry);
            await _context.SaveChangesAsync();
        }

        public async void EquipmentCreated(Equipment equipment, User user)
        {
            var historyEntry = new History
            {
                Description = "Access Created",
                Actor = user,
                ActorName = user.Name,
                AssetType = "Access",
                ActionType = "Created",
                Equipment = equipment
            };
            _context.Histories.Add(historyEntry);
            await _context.SaveChangesAsync();
        }

        public async void KeyUpdated(Key key, User user)
        {
            var historyEntry = new History
            {
                Description = "Key Updated",
                Actor = user,
                ActorName = user.Name,
                AssetType = "Key",
                ActionType = "Updated",
                Key = key
            };
            _context.Histories.Add(historyEntry);
            await _context.SaveChangesAsync();
        }

        public async void AccessUpdated(Access access, User user)
        {
            var historyEntry = new History
            {
                Description = "Access Updated",
                Actor = user,
                ActorName = user.Name,
                AssetType = "Access",
                ActionType = "Updated",
                Access = access
            };
            _context.Histories.Add(historyEntry);
            await _context.SaveChangesAsync();
        }

        public async void EquipmentUpdated(Equipment equipment, User user)
        {
            var historyEntry = new History
            {
                Description = "Access Updated",
                Actor = user,
                ActorName = user.Name,
                AssetType = "Access",
                ActionType = "Updated",
                Equipment = equipment
            };
            _context.Histories.Add(historyEntry);
            await _context.SaveChangesAsync();
        }
        public async void KeyInactivated(Key key, User user)
        {
            var historyEntry = new History
            {
                Description = "Key Inactivated",
                Actor = user,
                ActorName = user.Name,
                AssetType = "Key",
                ActionType = "Inactivated",
                Key = key
            };
            _context.Histories.Add(historyEntry);
            await _context.SaveChangesAsync();
        }

        public async void AccessInactivated(Access access, User user)
        {
            var historyEntry = new History
            {
                Description = "Access Inactivated",
                Actor = user,
                ActorName = user.Name,
                AssetType = "Access",
                ActionType = "Inactivated",
                Access = access
            };
            _context.Histories.Add(historyEntry);
            await _context.SaveChangesAsync();
        }

        public async void EquipmentInactivated(Equipment equipment, User user)
        {
            var historyEntry = new History
            {
                Description = "Access Inactivated",
                Actor = user,
                ActorName = user.Name,
                AssetType = "Access",
                ActionType = "Inactivated",
                Equipment = equipment
            };
            _context.Histories.Add(historyEntry);
            await _context.SaveChangesAsync();
        }






    }
}
