﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASP.NETCoreWebApplication.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ASP.NETCoreWebApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransactionController : Controller
    {
        Test_dataContext _context = new Test_dataContext();
        
        // GET
        [HttpGet]
        public IEnumerable<Transaction> GetTransactions([FromQuery(Name = "listing")] string lid)
        {
            if (DataManager.Instance().TransactionDict.ContainsKey(lid))
            {
                return DataManager.Instance().TransactionDict[lid];   
            }
            else
            {
                return new List<Transaction>();
            }
        }
        
        [HttpPost]
        [Route("api/create")]
        public async Task<ActionResult<Transaction>> PostTransaction([FromQuery(Name = "listing")] string lid, Transaction transaction)
        {
            _context.Transaction.Add(transaction);
            await _context.SaveChangesAsync();
            if (!DataManager.Instance().TransactionDict.ContainsKey(lid))
            {
                DataManager.Instance().TransactionDict.Add(lid, new List<Transaction>());
            }
            DataManager.Instance().TransactionDict[lid].Add(transaction);

            return CreatedAtAction("GetTransactions", new { id = transaction.TransactionId }, transaction);
        }

        [HttpDelete]
        [Route("api/delete")]
        public async Task<ActionResult<Transaction>> PostTransaction([FromQuery(Name = "tid")] string tid, [FromQuery(Name = "lid")] string lid)
        {
            Transaction transaction = await _context.Transaction.FindAsync(Int32.Parse(tid));
            if (transaction == null) return NotFound();
            _context.Transaction.Remove(transaction);
            await _context.SaveChangesAsync();
            List<Transaction> transactions = DataManager.Instance().TransactionDict[lid];
            foreach (Transaction t in transactions)
            {
                if (t.TransactionId == Int32.Parse(tid))
                {
                    transactions.Remove(t);
                    break;
                }
            }
            return transaction;
        }

        [HttpPut]
        [Route("api/update")]
        public async Task<IActionResult> PutTransaction([FromQuery(Name = "listing")] string lid, Transaction transaction)
        {
            _context.Entry(transaction).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Transaction.Any(t => t.TransactionId == transaction.TransactionId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            string tid = transaction.TransactionId.ToString();
            List<Transaction> transactions = DataManager.Instance().TransactionDict[lid];
            foreach (Transaction t in transactions)
            {
                if (t.TransactionId == Int32.Parse(tid))
                {
                    transactions.Remove(t);
                    transactions.Add(transaction);
                    break;
                }
            }
            return NoContent();
        }
        
    }
}