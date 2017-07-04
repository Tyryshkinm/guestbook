@extends('layouts.app')

@section('content')


    <div class="alert alert-danger" role="alert" hidden></div>

    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <button type="button" class="btn btn-primary" id="add-note-fade-in">
                            Add a note in the guest book
                        </button>
                        <form class="form-horizontal" hidden>
                            <div class="form-note" hidden>
                                <div class="form-group">
                                    <div class="col-md-6">
                                        <input type="text" class="form-control" id="username" name="username" required autofocus placeholder="Username">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-md-6">
                                        <input type="email" class="form-control" id="email" name="email" required placeholder="E-mail">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-md-6">
                                        <input type="url" class="form-control" id="homepage" name="url" placeholder="Homepage">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-md-6">
                                        <input type="text" class="form-control" id="text" name="text" required placeholder="Text">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-md-6">
                                        {!! app('captcha')->display() !!}
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-md-6">
                                        <button type="button" class="btn btn-primary" id="add-note">
                                            Add Note
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="panel-body">
                        <form method="post" action="/" class="sort">
                            {{ csrf_field() }}
                            <button type="button" name="user" id="sort-by-user" class="btn btn-primary">
                                Sort by User
                            </button>
                            <button type="button" name="email" id="sort-by-email" class="btn btn-primary">
                                Sort by Email
                            </button>
                            <button type="button" name="date" id="sort-by-date" class="btn btn-primary">
                                Sort by Date
                            </button>
                        </form>
                        <div class="border">
                            <div class="alert alert-success" role="alert" hidden></div>
                        </div>
                        <div class="list-notes">

                            @if(isset($notes) and isset($ip) and isset($browser))
                                <div hidden id="ip" data-ip="{{ $ip }}"></div>
                                <div hidden id="browser" data-browser="{{ $browser . ' ' . $version }}"></div>
                                <?php $i = 0;?>
                                <div class="ajax-note"></div>
                                @foreach($notes as $note)
                                    <?php $i++;?>
                                    <div class="note" id="note<?php echo $i;?>">
                                        <div class="note-text">
                                            {{ $note->text }}
                                        </div>
                                        <div class="note-name-time">
                                            {{ 'User: ' }}<b>{{ $note->username }}</b>{{ ' wrote on ' }}<b>{{ $note->created_at->format('d.m.Y h:i:s') }}</b>
                                        </div>
                                        <div class="note-email-homepage">
                                            {{ 'E-mail: ' }}<b>{{ $note->email }}</b>{{  ' Homepage: ' }}<b>{{ $note->homepage }}</b>
                                        </div>
                                        <div class="note-ip-browser">
                                            {{ 'IP: ' }}<b>{{ $note->ip }}</b>{{ ' Browser: ' }}<b>{{ $note->browser }}</b>
                                        </div>
                                        <div class="border"></div>
                                    </div>
                                @endforeach
                            @endif
                        </div>
                        <div class="text-center">
                            <div class="pagination">
                                {{ $notes->links() }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection