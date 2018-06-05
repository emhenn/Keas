﻿using System.ComponentModel.DataAnnotations;

namespace Keas.Core.Domain
{
    public class TeamTag
    {

        [Key]
        public string Tag { get; set; }

        public Team Team { get; set; }
        public int TeamId { get; set; }
    }
}
