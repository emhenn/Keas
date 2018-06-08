﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Keas.Core.Domain
{
    public class Team
    {
        [Key]
        public int Id { get; set; }

        // TODO: make this a unique field
        [StringLength(128)]
        [Display(Name = "Team Name")]
        [Required]
        public string Name { get; set; }

        public List<Person> People { get; set; }

        [JsonIgnore]
       public ICollection<TeamPermission> TeamPermissions { get; set; }

        public List<FinancialOrganization> FISOrgs { get; set; }
       
    }
}
