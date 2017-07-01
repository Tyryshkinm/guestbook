<?php

namespace App\Http\Controllers;

use App\Note;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $notes = Note::orderBy('id', 'desc')->paginate(25);
        return view('home')->with('notes', $notes);
    }

    public function addNote()
    {
        //
    }
}
