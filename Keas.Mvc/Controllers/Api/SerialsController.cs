using Keas.Core.Data;
using Keas.Core.Domain;
using Keas.Mvc.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Keas.Mvc.Controllers.Api
{
    [Authorize(Policy = "KeyMasterAccess")]
    public class SerialsController : SuperController
    {
        private readonly ApplicationDbContext _context;
        private readonly IEventService _eventService;

        public SerialsController(ApplicationDbContext context, IEventService eventService)
        {
            _context = context;
            _eventService = eventService;
        }

        // public async Task<IActionResult> Search(string q)
        // {
        //     var comparison = StringComparison.OrdinalIgnoreCase;
        //     var equipment = await _context.Serials
        //         .Where(x => x.Team.Name == Team && x.Active && x.Assignment == null &&
        //         (x.Name.StartsWith(q,comparison) || x.Space.BldgName.IndexOf(q,comparison) >= 0 // case-insensitive .Contains
        //             || x.Space.RoomNumber.StartsWith(q, comparison)))
        //         .Include(x => x.Space)
        //         .AsNoTracking().ToListAsync();

        //     return Json(equipment);
        // }

        
        // public async Task<IActionResult> SearchInSpace(int spaceId, string q)
        // {
        //     var comparison = StringComparison.OrdinalIgnoreCase;
        //     var equipment = await _context.Serials
        //         .Where(x => x.Team.Name == Team && x.SpaceId == spaceId && x.Active && x.Assignment == null &&
        //         (x.Name.StartsWith(q,comparison) || x.Space.BldgName.IndexOf(q,comparison) >= 0 // case-insensitive .Contains
        //             || x.Space.RoomNumber.StartsWith(q, comparison)))
        //         .Include(x => x.Space).AsNoTracking().ToListAsync();

        //     return Json(equipment);
        // }


        public async Task<IActionResult> ListAssigned(int personId)
        {
            var serialAssignments = await _context.Serials
                .Where(w => w.Assignment.PersonId == personId)
                .Include(x => x.Key)
                .ThenInclude(x => x.KeyXSpaces)
                .ThenInclude(x => x.Space)
                .Include(w => w.Assignment)
                .ThenInclude(w => w.Person.User)
                .AsNoTracking().ToArrayAsync();

            return Json(serialAssignments);
        }

        public async Task<IActionResult> Create([FromBody] Serial serial)
        {
            // TODO Make sure user has permission; Protect from overpost
            if (ModelState.IsValid)
            {
                _context.Serials.Add(serial);
                // await _eventService.TrackCreateSerial(serial);
                await _context.SaveChangesAsync();
            }

            return Json(serial);
        }

        public async Task<IActionResult> Assign(int serialId, int personId, string date)
        {
            // TODO make sure user has permission
            if (ModelState.IsValid)
            {
                var serial = await _context.Serials.Where(s => s.Key.Team.Name == Team)
                    .Include(x => x.Key).ThenInclude(x => x.KeyXSpaces).ThenInclude(x => x.Space)
                    .SingleAsync(s => s.Id == serialId);

                var key = serial.Key;
                serial.Assignment = new KeyAssignment {PersonId = personId, ExpiresAt = DateTime.Parse(date)};
                serial.Assignment.Person =
                    await _context.People.Include(p => p.User).Include(p=> p.Team).SingleAsync(p => p.Id == personId);

                if (serial.Assignment.Person.Team.Name != Team)
                {
                    Message = "User is not part of this team!";
                    return BadRequest(serial);
                }
                if (serial.Key.Team.Id != serial.Assignment.Person.TeamId)
                {
                    Message = "Serial team did not match person's team!";
                    return BadRequest(serial);
                }
                // null out key so it doesn't try to add it 
                serial.Key = null;

                _context.KeyAssignments.Add(serial.Assignment);

                await _context.SaveChangesAsync();
                await _eventService.TrackAssignKey(serial);
                return Json(serial);
            }
            return BadRequest(ModelState);
        }

        public async Task<IActionResult> Revoke([FromBody] Serial serial)
        {
            // TODO permission
            if (ModelState.IsValid)
            {
                var serialToUpdate = await _context.Serials.Where(x => x.Key.Team.Name == Team)
                    .Include(w => w.Assignment).ThenInclude(w => w.Person.User)
                    .SingleAsync(w => w.Id == serial.Id);

                _context.KeyAssignments.Remove(serialToUpdate.Assignment);
                serialToUpdate.Assignment = null;
                await _context.SaveChangesAsync();
                // await _eventService.TrackUnAssignSerial(serial);
                return Json(null);
            }
            return BadRequest(ModelState);
        }

        public async Task<IActionResult> Update([FromBody]Serial serial)
        {
            //TODO: check permissions
            if (ModelState.IsValid)
            {
                var w = await _context.Serials.Where(x => x.Key.Team.Name == Team)
                    .SingleAsync(x => x.Id == serial.Id);
                    
                w.Number = serial.Number;

                await _context.SaveChangesAsync();
                return Json(w);
            }
            return BadRequest(ModelState);
        }

    //     public async Task<IActionResult> GetHistory(int id)
    //     {
    //         var history = await _context.Histories
    //             .Where(h => h.AssetType == "Serial" && h.Serial.Team.Name == Team && h.SerialId == id)
    //             .OrderByDescending(x => x.ActedDate)
    //             .Take(5)
    //             .AsNoTracking().ToListAsync();

    //         return Json(history);
    //     }
    }
}