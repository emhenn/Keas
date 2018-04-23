﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Keas.Core.Data;
using Keas.Core.Domain;
using Keas.Mvc.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Keas.Mvc.Controllers
{
    public class KeysController : SuperController
    {
        private readonly ApplicationDbContext _context;
        private readonly EventService _eventService;
        private readonly SecurityService _securityService;

        public KeysController(ApplicationDbContext context, EventService eventService, SecurityService securityService)
        {
            this._context = context;
            _eventService = eventService;
            _securityService = securityService;
        }

        public string GetTeam()
        {
            return Team;
        }

        public async Task<IActionResult> Search(int teamId, string q)
        {
            var comparison = StringComparison.InvariantCultureIgnoreCase;
            var keys = await _context.Keys
                .Where(x => x.Team.Id == teamId && x.Active && x.Assignment == null &&
                (x.Name.StartsWith(q, comparison) || x.SerialNumber.StartsWith(q, comparison)))
                .AsNoTracking().ToListAsync();

            return Json(keys);
        }

        public async Task<IActionResult> ListAssigned(int personId, int teamId) {
            var keyAssignments = await _context.Keys.Where(x=> x.Assignment.PersonId == personId && x.TeamId == teamId).Include(x=> x.Assignment).AsNoTracking().ToArrayAsync();

            return Json(keyAssignments);
        }

        // List all keys for a team
        public async Task<IActionResult> List(int id) {
            var keys = await _context.Keys.Where(x=> x.TeamId == id).Include(x=> x.Assignment).AsNoTracking().ToArrayAsync();

            return Json(keys);
        }
        public async Task<IActionResult> Create([FromBody]Key key)
        {
            // TODO Make sure user has permissions
            var user = await _securityService.GetUser();
            if (ModelState.IsValid)
            {
                _context.Keys.Add(key);
                await _context.SaveChangesAsync();
                await _eventService.TrackCreateKey(key, user);
            }
            return Json(key);
        }

        public async Task<IActionResult> Assign(int keyId, int personId, string date)
        {
            // TODO Make sure user has permssion, make sure equipment exists, makes sure equipment is in this team
            if (ModelState.IsValid)
            {
                var key = await _context.Keys.SingleAsync(x => x.Id == keyId);
                key.Assignment = new KeyAssignment { PersonId = personId, ExpiresAt = DateTime.Parse(date) };

                _context.KeyAssignments.Add(key.Assignment);

                await _context.SaveChangesAsync();
                return Json(key);
            }
            return BadRequest(ModelState);
        }

        public async Task<IActionResult> Revoke([FromBody]Key key)
        {
            //TODO: check permissions
            if (ModelState.IsValid)
            {
                var k = await _context.Keys.Include(x => x.Assignment).SingleAsync(x => x.Id == key.Id);

                _context.KeyAssignments.Remove(k.Assignment);
                k.Assignment = null;
                k.KeyAssignmentId = null;
                await _context.SaveChangesAsync();
                return Json(k);
            }
            return BadRequest(ModelState);
        }
    }
}