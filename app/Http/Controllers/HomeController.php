<?php

namespace App\Http\Controllers;

use App\Note;
use Illuminate\Http\Request;
use Jenssegers\Agent\Agent;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $agent = new Agent();
        $browser = $agent->browser();
        $version = $agent->version($browser);
        $ip = $request->ip();
        if (!isset($_COOKIE['type'])) {
            $_COOKIE['type'] = 'date';
        }
        if (!isset($_COOKIE['sort'])) {
            $_COOKIE['sort'] = 'desc';
        }
        if ($_COOKIE['type'] == 'user') {
            if ($_COOKIE['sort'] == 'desc') {
                $notes = Note::orderBy('username', 'desc')->paginate(25);
            } elseif ($_COOKIE['sort'] == 'asc') {
                $notes = Note::orderBy('username', 'asc')->paginate(25);
            }
        }
        if ($_COOKIE['type'] == 'email') {
            if ($_COOKIE['sort'] == 'desc') {
                $notes = Note::orderBy('email', 'desc')->paginate(25);
            } elseif ($_COOKIE['sort'] == 'asc') {
                $notes = Note::orderBy('email', 'asc')->paginate(25);
            }
        }
        if ($_COOKIE['type'] == 'date') {
            if ($_COOKIE['sort'] == 'desc') {
                $notes = Note::orderBy('created_at', 'desc')->paginate(25);
            } elseif ($_COOKIE['sort'] == 'asc') {
                $notes = Note::orderBy('created_at', 'asc')->paginate(25);
            }
        }
        return view('home')->with([
            'notes'   => $notes,
            'ip'      => $ip,
            'browser' => $browser,
            'version' => $version
        ]);
    }

    public function addNote(Request $request)
    {
        $data = $request->only('username', 'email', 'homepage', 'text', 'ip', 'browser');
        $note = new Note;
        $note->username = $data['username'];
        $note->email = $data['email'];
        $note->homepage = $data['homepage'];
        $note->text = $data['text'];
        $note->ip = $data['ip'];
        $note->browser = $data['browser'];
        $note->save();
    }
}
