using System;
using System.ComponentModel.DataAnnotations;

namespace Keas.Core.Domain {
    public class History {
        public History()
        {
            ActedDate = DateTime.UtcNow;
        }

        [Key]
        public int Id { get; set; }

        [Required]
        public string Description { get; set; }

        public User Actor { get; set; }
        public string ActorId { get; set; }
        public string ActorName { get; set; }

        public DateTime ActedDate { get; set; }
        
        // Key vs Equipment vs Access
        public string AssetType { get; set; }

        // Created, granted, accepted, declined, revoked, deleted
        public String ActionType { get; set; }

        public Key Key {get;set;}
        public int? KeyId { get; set; }

        public Equipment Equipment { get; set; }
        public int? EquipmentId { get; set; }

        public Access Access { get; set; }
        public int? AccessId { get; set; }

    }
}