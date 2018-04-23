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
        Task<History> KeyCreated(Key key, User user);
        Task<History> AccessCreated(Access access, User user);
        Task<History> EquipmentCreated(Equipment equipment, User user);
        Task<History> KeyUpdated(Key key, User user);
        Task<History> AccessUpdated(Access access, User user);
        Task<History> EquipmentUpdated(Equipment equipment, User user);
        Task<History> KeyInactivated(Key key, User user);
        Task<History> AccessInactivated(Access access, User user);
        Task<History> EquipmentInactivated(Equipment equipment, User user);

    }

    public class HistoryService : IHistoryService
    {
        private readonly ApplicationDbContext _context;
        public HistoryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<History> KeyCreated(Key key, User user)
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
            return historyEntry;
        }

        public async Task<History> AccessCreated(Access access, User user)
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
            return historyEntry;
        }

        public async Task<History> EquipmentCreated(Equipment equipment, User user)
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
            return historyEntry;
        }

        public async Task<History> KeyUpdated(Key key, User user)
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
            return historyEntry;
        }

        public async Task<History> AccessUpdated(Access access, User user)
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
            return historyEntry;
        }

        public async Task<History> EquipmentUpdated(Equipment equipment, User user)
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
            return historyEntry;
        }
        public async Task<History> KeyInactivated(Key key, User user)
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
            return historyEntry;
        }

        public async Task<History> AccessInactivated(Access access, User user)
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
            return historyEntry;
        }

        public async Task<History> EquipmentInactivated(Equipment equipment, User user)
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
            return historyEntry;
        }

        public async Task<History> KeyAssigned(Key key, User user)
        {
            var historyEntry = new History
            {
                Description = "Key Assigned",
                Actor = user,
                ActorName = user.Name,
                AssetType = "Key",
                ActionType = "Assigned",
                Key = key
            };
            _context.Histories.Add(historyEntry);
            await _context.SaveChangesAsync();
            return historyEntry;
        }

        public async Task<History> AccessAssigned(Access access, User user)
        {
            var historyEntry = new History
            {
                Description = "Access Assigned",
                Actor = user,
                ActorName = user.Name,
                AssetType = "Access",
                ActionType = "Assigned",
                Access = access
            };
            _context.Histories.Add(historyEntry);
            await _context.SaveChangesAsync();
            return historyEntry;
        }

        public async Task<History> EquipmentAssigned(Equipment equipment, User user)
        {
            var historyEntry = new History
            {
                Description = "Access Assigned",
                Actor = user,
                ActorName = user.Name,
                AssetType = "Access",
                ActionType = "Assigned",
                Equipment = equipment
            };
            _context.Histories.Add(historyEntry);
            await _context.SaveChangesAsync();
            return historyEntry;
        }

        public async Task<History> KeyUnassigned(Key key, User user)
        {
            var historyEntry = new History
            {
                Description = "Key Unassigned",
                Actor = user,
                ActorName = user.Name,
                AssetType = "Key",
                ActionType = "Unassigned",
                Key = key
            };
            _context.Histories.Add(historyEntry);
            await _context.SaveChangesAsync();
            return historyEntry;
        }

        public async Task<History> AccessUnassigned(Access access, User user)
        {
            var historyEntry = new History
            {
                Description = "Access Unassigned",
                Actor = user,
                ActorName = user.Name,
                AssetType = "Access",
                ActionType = "Unassigned",
                Access = access
            };
            _context.Histories.Add(historyEntry);
            await _context.SaveChangesAsync();
            return historyEntry;
        }

        public async Task<History> EquipmentUnassigned(Equipment equipment, User user)
        {
            var historyEntry = new History
            {
                Description = "Access Unassigned",
                Actor = user,
                ActorName = user.Name,
                AssetType = "Access",
                ActionType = "Unassigned",
                Equipment = equipment
            };
            _context.Histories.Add(historyEntry);
            await _context.SaveChangesAsync();
            return historyEntry;
        }

        public async Task<History> KeyAccepted(Key key, User user)
        {
            var historyEntry = new History
            {
                Description = "Key Accepted",
                Actor = user,
                ActorName = user.Name,
                AssetType = "Key",
                ActionType = "Accepted",
                Key = key
            };
            _context.Histories.Add(historyEntry);
            await _context.SaveChangesAsync();
            return historyEntry;
        }

        public async Task<History> AccessAccepted(Access access, User user)
        {
            var historyEntry = new History
            {
                Description = "Access Accepted",
                Actor = user,
                ActorName = user.Name,
                AssetType = "Access",
                ActionType = "Accepted",
                Access = access
            };
            _context.Histories.Add(historyEntry);
            await _context.SaveChangesAsync();
            return historyEntry;
        }

        public async Task<History> EquipmentAccepted(Equipment equipment, User user)
        {
            var historyEntry = new History
            {
                Description = "Access Accepted",
                Actor = user,
                ActorName = user.Name,
                AssetType = "Access",
                ActionType = "Accepted",
                Equipment = equipment
            };
            _context.Histories.Add(historyEntry);
            await _context.SaveChangesAsync();
            return historyEntry;
        }

    }
}
