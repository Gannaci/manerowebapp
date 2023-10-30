﻿using Microsoft.AspNetCore.Mvc;

namespace Manero_WebApp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            ViewData["Title"] = "Home";
            return View();
        }
    }
}
