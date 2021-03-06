using System;
using Keas.Core.Resources;
using Microsoft.EntityFrameworkCore;

namespace Keas.Core.Domain
{
    public class KeySerial : AssetBase
    {

        public KeySerial()
        {
            Active = true;
            Status = KeySerialStatuses.Active;
        }

        public string Number { get; set; }

        public string Status { get; set; }

        public Key Key { get; set; }

        public int KeyId { get; set; }

        public KeySerialAssignment KeySerialAssignment { get; set; }

        public int? KeySerialAssignmentId { get; set; }

        public override string Title => Name ?? Number;

        protected internal static void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<KeySerial>()
                .HasOne(s => s.KeySerialAssignment)
                .WithOne(a => a.KeySerial)
                .HasForeignKey<KeySerialAssignment>(a => a.KeySerialId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<KeySerial>()
                .HasOne(s => s.Team)
                .WithMany()
                .HasForeignKey(s => s.TeamId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
