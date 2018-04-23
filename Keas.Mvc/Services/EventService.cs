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
        private readonly HistoryService _historyService;
        private readonly NotificaitonService _notificaitonService;

        public EventService(HistoryService historyService, NotificaitonService notificaitonService)
        {
            _historyService = historyService;
            _notificaitonService = notificaitonService;
        }

        public async Task TrackCreateKey(Key key, User user)
        {
            var history = await _historyService.KeyCreated(key, user);
            await _notificaitonService.KeyCreated(key, history);
        }
    }
}
