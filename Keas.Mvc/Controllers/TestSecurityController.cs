using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Keas.Core.Data;
using Keas.Core.Domain;
using Keas.Mvc.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Keas.Mvc.Controllers
{
    public class TestSecurityController : SuperController
    {
        private readonly ISecurityService _securityService;
        private readonly ApplicationDbContext _context;
        private readonly IEventService _eventService;

        public TestSecurityController(ISecurityService securityService, ApplicationDbContext context, IEventService eventService)
        {
            _securityService = securityService;
            _context = context;
            _eventService = eventService;
        }
        public IActionResult Index()
        {
            var roles = _context.Roles
                .Where(r => r.Name == Role.Codes.KeyMaster || r.Name == Role.Codes.DepartmentalAdmin).ToList();
            ViewBag.Keymaster = _securityService.IsInRoles(roles, Team).Result;
                //_securityService.IsInRole(_context, Role.Codes.KeyMaster, Team).Result ;
            return View();
        }

        [Authorize(Policy = "EquipMasterAccess")]
        public IActionResult Equip()
        {
            return View("Index");
        }

        [Authorize(Policy = "KeyMasterAccess")]
        public IActionResult Key()
        {
            return View("Index");
        }

        [Authorize(Policy = "AccessMasterAccess")]
        public IActionResult Access()
        {
            return View("Index");
        }

        [Authorize(Policy = "DepartmentAdminAccess")]
        public IActionResult DeptAdmin()
        {
            return View("Index");
        }

        public async Task<IActionResult> CreateKey()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> CreateKey(Key key)
        {
            var team = await _context.Teams.SingleAsync(t => t.Name == Team);
            key.Team = team;
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
    }
}