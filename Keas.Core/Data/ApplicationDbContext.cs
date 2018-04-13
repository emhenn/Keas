﻿using Keas.Core.Domain;
using Microsoft.EntityFrameworkCore;

namespace Keas.Core.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        { }
        
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Team> Teams { get; set; }
       
        public virtual DbSet<Person> People { get; set; }
        public virtual DbSet<Access> Access { get; set; }
        public virtual DbSet<AccessAssignment> AccessAssignments { get; set; }
        
        public virtual DbSet<Key> Keys { get; set; }
        public virtual DbSet<KeyAssignment> KeyAssignments { get; set; }
        public virtual DbSet<Equipment> Equipment { get; set; }
        public virtual DbSet<EquipmentAssignment> EquipmentAssignments { get; set; }
        public virtual DbSet<EquipmentAttribute> EquipmentAttributes { get; set; }
        public virtual DbSet<FinancialOrganization> FISOrgs  { get; set; }

        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<TeamPermission> TeamPermissions { get; set; }

        public virtual DbSet<History> Histories { get; set; }

        // Facilities link import tables
        public virtual DbSet<Room> Rooms { get; set; }
        public virtual DbSet<Space> Spaces { get; set; }
    }
}