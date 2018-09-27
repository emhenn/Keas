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
                .Include(w => w.Assignment)
                .ThenInclude(w => w.Person.User)
                .AsNoTracking().ToArrayAsync();

            return Json(serialAssignments);
        }

    //     public async Task<IActionResult> Create([FromBody] Serial serial)
    //     {
    //         // TODO Make sure user has permission; Protect from overpost
    //         if (ModelState.IsValid)
    //         {
    //             if (serial.Space != null)
    //             {
    //                 var space = await _context.Spaces.SingleAsync(s => s.RoomKey == serial.Space.RoomKey);
    //                 serial.Space = space;
    //             }
    //             _context.Serials.Add(serial);
    //             await _eventService.TrackCreateSerial(serial);
    //             await _context.SaveChangesAsync();
    //         }

    //         return Json(serial);
    //     }

    //     public async Task<IActionResult> Assign(int serialId, int personId, string date)
    //     {
    //         // TODO make sure user has permission
    //         if (ModelState.IsValid)
    //         {
    //             var serial = await _context.Serials.Where(w => w.Team.Name == Team).Include(w => w.Space)
    //                 .SingleAsync(w => w.Id == serialId);
    //             serial.Assignment = new SerialAssignment{PersonId = personId, ExpiresAt = DateTime.Parse(date)};
    //             serial.Assignment.Person =
    //                 await _context.People.Include(p => p.User).Include(p=> p.Team).SingleAsync(p => p.Id == personId);

    //             if (serial.Team.Name != Team)
    //             {
    //                 Message = "Serial is not part of this team!";
    //                 return BadRequest(serial);
    //             }
    //             if (serial.Assignment.Person.Team.Name != Team)
    //             {
    //                 Message = "User is not part of this team!";
    //                 return BadRequest(serial);
    //             }
    //             if (serial.TeamId != serial.Assignment.Person.TeamId)
    //             {
    //                 Message = "Serial team did not match person's team!";
    //                 return BadRequest(serial);
    //             }

    //             _context.SerialAssignments.Add(serial.Assignment);

    //             await _context.SaveChangesAsync();
    //             await _eventService.TrackAssignSerial(serial);
    //             return Json(serial);
    //         }
    //         return BadRequest(ModelState);
    //     }

    //     public async Task<IActionResult> Revoke([FromBody] Serial serial)
    //     {
    //         // TODO permission
    //         if (ModelState.IsValid)
    //         {
    //             var serialToUpdate = await _context.Serials.Where(x => x.Team.Name == Team)
    //                 .Include(w => w.Assignment).ThenInclude(w => w.Person.User)
    //                 .SingleAsync(w => w.Id == serial.Id);

    //             _context.SerialAssignments.Remove(serialToUpdate.Assignment);
    //             serialToUpdate.Assignment = null;
    //             await _context.SaveChangesAsync();
    //             await _eventService.TrackUnAssignSerial(serial);
    //             return Json(null);
    //         }
    //         return BadRequest(ModelState);
    //     }

    //     public async Task<IActionResult> Update([FromBody]Serial serial)
    //     {
    //         //TODO: check permissions
    //         if (ModelState.IsValid)
    //         {
    //             var w = await _context.Serials.Where(x => x.Team.Name == Team)
    //                 .SingleAsync(x => x.Id == serial.Id);
                    
    //             w.Name = serial.Name;
    //             w.Tags = serial.Tags;

    //             await _context.SaveChangesAsync();
    //             return Json(w);
    //         }
    //         return BadRequest(ModelState);
    //     }

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