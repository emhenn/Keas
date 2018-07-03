﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Keas.Core.Data;
using Keas.Core.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Keas.Mvc.Controllers
{
    [Authorize(Policy = "DepartmentAdminAccess")]
    public class TagsManagerController : SuperController
    {
        private readonly ApplicationDbContext _context;

        public TagsManagerController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Tags
        public async Task<ActionResult> Index()
        {
            var model = await _context.Tags.Where(t => t.Team.Name == Team).OrderBy(t=> t.Name).ToListAsync();
            return View(model);
        }

        // GET: Tags/Create
        public ActionResult Create()
        {
            return View();
        }
        
        // POST: Tags/Create
        [HttpPost]
        public async Task<ActionResult> Create( Tag newTag)
        {
            if (ModelState.IsValid)
            {
                var team = await _context.Teams.FirstAsync(t => t.Name == Team);
                newTag.Team = team;
                _context.Tags.Add(newTag);
                await _context.SaveChangesAsync();
                Message = "Tag created.";
                return RedirectToAction(nameof(Index));
            }
            Message = "An error occurred. Tag could not be created.";
            return View();
        }
        
        // GET: Tags/Edit/5
        public async Task<ActionResult> Edit(int id)
        {
            var tag = await _context.Tags.SingleAsync(t => t.Team.Name == Team && t.Id == id);
            if (tag == null)
            {
                return NotFound();
            }
            return View(tag);
        }
        
        // POST: Tags/Edit/5
        [HttpPost]
        public async Task<ActionResult> Edit(int id, Tag updatedTag)
        {
            if (id != updatedTag.Id)
            {
                return NotFound();
            }
            var tagToUpdate = await _context.Tags.SingleAsync(t => t.Id == id && t.Team.Name==Team);
            if (await TryUpdateModelAsync<Tag>(tagToUpdate, "", t => t.Name))
            {
                try
                {
                    await _context.SaveChangesAsync();
                    Message = "Tag updated.";
                    return RedirectToAction(nameof(Index));
                }
                catch
                {
                    ModelState.AddModelError("", "Unable to save changes.");
                }
            }
            return View(updatedTag);
        }
        
        // GET: Tags/Delete/5
        public async Task<ActionResult> Delete(int id)
        {
            var tag = await _context.Tags.SingleAsync(t => t.Team.Name == Team && t.Id == id);
            if (tag == null)
            {
                return NotFound();
            }
            return View(tag);
        }
        
        // POST: Tags/Delete/5
        [HttpPost]
        public async Task<ActionResult> Delete(int id, Tag deleteTag)
        {
            var tagToDelete = await _context.Tags.SingleAsync(t => t.Team.Name == Team && t.Id == id);
            _context.Remove(tagToDelete);
            await _context.SaveChangesAsync();
            Message = "Tag deleted.";
            return RedirectToAction(nameof(Index));
        }
    }
}