using System;

namespace Keas.Core.Domain
{
    public class Notification
    {
       public int Id { get; set; }

        public User User { get; set; }

        public string UserId { get; set; }
        public History History { get; set; }
        public int HistoryId { get; set; }
        public string Details { get; set; }

        public bool Pending { get; set; }
        public DateTime? DateTimeSent { get; set; }
        public DateTime DateTimeCreated { get; set; }
        public bool NeedsAccept { get; set; }

        public Team Team { get; set; }
        public int? TeamId { get; set; }

        public Notification()
        {
            Pending = true;
            DateTimeCreated = DateTime.UtcNow;
            NeedsAccept = false;
        }

    }
}

