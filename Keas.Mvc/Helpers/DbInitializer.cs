﻿using System;
using System.Linq;
using Keas.Core.Data;
using Keas.Core.Domain;
using System.Collections.Generic;

namespace Keas.Mvc.Helpers
{
    public static class DbInitializer
    {
        public static void Initialize(ApplicationDbContext context)
        {
            context.Database.EnsureDeleted(); // TODO: remove
            context.Database.EnsureCreated();

            if (context.Users.Any()) return; // already initialzied

            // add in some default factilities
            var room1 = new Room { BldgKey = "01", FloorKey = "01", RoomKey = "01", BldgName="Foo", RoomName = "Bar", RoomNumber = "12" };
            var space1 = new Space { Room = room1, ChartNum = "3", OrgId = "ADNO" };
            context.Spaces.Add(space1);

            var room2 = new Room { BldgKey = "02", FloorKey = "03", RoomKey = "02", BldgName = "North Hall", RoomName = "Group/Meeting Room", RoomNumber = "308" };
            var space2 = new Space { Room = room2, ChartNum = "3", OrgId = "ADNO" };
            context.Spaces.Add(space2);

            var room3 = new Room { BldgKey = "02", FloorKey = "03", RoomKey = "03", BldgName = "North Hall", RoomName = "Meeting Room for CAPS Staff and Large Groups", RoomNumber = "325" };
            var space3 = new Space { Room = room3, ChartNum = "3", OrgId = "ADNO" };
            context.Spaces.Add(space3);

            var room4 = new Room { BldgKey = "02", FloorKey = "02", RoomKey = "04", BldgName = "North Hall", RoomNumber = "0206A" };
            var space4 = new Space { Room = room4, ChartNum = "3", OrgId = "ADNO" };
            context.Spaces.Add(space4);

            var room5 = new Room { BldgKey = "02", FloorKey = "01", RoomKey = "05", BldgName = "North Hall", RoomName = "Storage", RoomNumber = "0121A" };
            var space5 = new Space { Room = room5, ChartNum = "3", OrgId = "ADNO" };
            context.Spaces.Add(space5);

            var room6 = new Room { BldgKey = "03", FloorKey = "01", RoomKey = "06", BldgName = "South Hall", RoomName = "Storage", RoomNumber = "0121A" };
            var space6 = new Space { Room = room6, ChartNum = "3", OrgId = "ADNO" };
            context.Spaces.Add(space6);

            var scott = new User { Id = "123124", FirstName = "Scott", Name = "Scott Kirkland", Email = "scott@email.com" };
            var jason = new User { Id = "123222", Name = "Jason", Email = "jason@email.com" };
            var caes = new Team { Id = 1, Name = "CAESDO" };

            context.Users.Add(scott);
            context.Teams.Add(caes);
            context.TeamMemberships.Add(new TeamMembership { User = scott, Team = caes, Role = "Admin" });

            // add assets
            var jasonCaes = new Person { User = jason, Id=1, Team = caes, Group = "CRU" };
            var scottCaes = new Person { User = scott, Id=2, Team = caes, Group = "CRU" };


            var access = new Access
            {
                Name = "PPS", Team = caes
            };
            var accessAssignment = new AccessAssignment
            {
                //Access = access,
                Person = jasonCaes,
                RequestedBy = scott,
                ExpiresAt = DateTime.UtcNow.AddYears(3)
            };
            access.Assignments.Add(accessAssignment);
            jasonCaes.AccessAssignments.Add(accessAssignment);

            var access2 = new Access
            {
                Name = "PPS2",
                Team = caes,
            };

            var accessAssignment2 = new AccessAssignment
            {
                //Access = access2,
                Person = scottCaes,
                RequestedBy = scott,
                ExpiresAt = DateTime.UtcNow.AddYears(3)
            };
            access2.Assignments.Add(accessAssignment2);
            scottCaes.AccessAssignments.Add(accessAssignment2);

            var keyAssignment = new KeyAssignment
            {
                Person = jasonCaes,
                PersonId = jasonCaes.Id,
                RequestedBy = jason,
                ExpiresAt = DateTime.UtcNow.AddYears(5)
            };

            var key = new Key { SerialNumber = "SN", Team = caes, Name = "38 Mrak Keycard", Assignment = keyAssignment };

            var equipmentAssignment = new EquipmentAssignment
            {
                Person = jasonCaes,
                RequestedBy = scott,
                ExpiresAt = DateTime.UtcNow.AddYears(3)
            };

            var equipment = new Equipment { Name = "laptop", Team = caes, Assignment = equipmentAssignment, SerialNumber = "XYZ" };

            context.Access.Add(access);
            context.AccessAssignments.Add(accessAssignment);
            context.Access.Add(access2);
            context.AccessAssignments.Add(accessAssignment2);

            context.Keys.Add(key);
            context.KeyAssignments.Add(keyAssignment);
            context.EquipmentAssignments.Add(equipmentAssignment);
            context.Equipment.Add(equipment);

            var equip2Assignment = new EquipmentAssignment
            {
                Person = jasonCaes,
                RequestedBy = scott,
                ExpiresAt = DateTime.UtcNow.AddYears(3)
            };

            var equip2 = new Equipment { Name = "desktop", Team = caes, Assignment = equip2Assignment, SerialNumber = "ABC" };

            context.EquipmentAssignments.Add(equip2Assignment);
            context.Equipment.Add(equip2);
            
            var history = new History {
                Person = jasonCaes,
                Actor = scott,
                Description = "Something important happened",
                Key = key
            };

            context.Histories.Add(history);

            context.SaveChanges();
        }
    }
}