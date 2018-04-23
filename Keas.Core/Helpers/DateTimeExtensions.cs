using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Keas.Core.Helpers
{
    public static class DateTimeExtensions
    {
        public static readonly TimeZoneInfo Pacific = TimeZoneInfo.FindSystemTimeZoneById("Pacific Standard Time");

        public static DateTime? ToPacificTime(this DateTime? dateTime)
        {
            if (dateTime == null)
            {
                return null;
            }
            return ToPacificTime(dateTime.Value);
        }
        public static DateTime ToPacificTime(this DateTime dateTime)
        {
            return TimeZoneInfo.ConvertTimeFromUtc(dateTime, Pacific);
        }

        public static DateTime FromPacificTime(this DateTime dateTime)
        {
            return TimeZoneInfo.ConvertTimeToUtc(dateTime, Pacific);
        }

    }
}
