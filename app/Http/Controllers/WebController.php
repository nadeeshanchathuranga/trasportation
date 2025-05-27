<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;

class WebController extends Controller
{
     public function index()
    {


        return Inertia::render('Web/home/HomePage');
    }
}
