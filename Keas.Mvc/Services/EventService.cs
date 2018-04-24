using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Keas.Core.Domain;

namespace Keas.Mvc.Services
{
    public interface IEventService
    {
        Task TrackCreateKey(Key key, User user);

    }
    public class EventService : IEventService
    {
        private readonly IHistoryService _historyService;
        private readonly INotificationService _notificationService;

        public EventService(IHistoryService historyService, INotificationService notificationService)
        {
            _historyService = historyService;
            _notificationService = notificationService;
        }

        public async Task TrackCreateKey(Key key, User user)
        {
            var history = await _historyService.KeyCreated(key, user);
            await _notificationService.KeyCreatedUpdatedInactive(key, history);
        }
    }
}
