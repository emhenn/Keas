using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Keas.Core.Domain;

namespace Keas.Mvc.Services
{
    public interface INotificationSercive
    {
        
    }
    public class NotificaitonService : INotificationSercive
    {
        // Assume we email all Team KeyMasters & DepartmentalAdmins
        public void KeyCreated(Key key, History history)
        {
            
        }
    }
}
