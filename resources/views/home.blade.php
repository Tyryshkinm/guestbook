@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Add a note in the guest book
                        <div class="form-horizontal">
                            <div class="form-group">
                                <div class="col-md-6">
                                    <input type="text" class="form-control" required autofocus placeholder="Username">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-6">
                                    <input type="email" class="form-control" required placeholder="E-mail">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-6">
                                    <input type="url" class="form-control" placeholder="Homepage">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-6">
                                    <input type="text" class="form-control" required placeholder="Text">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-6">
                                    CAPTCHA
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-6">
                                    <button type="button" class="btn btn-primary">
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="panel-body">
                        <div class="list-notes">
                            @foreach($notes as $note)
                                <div class="note">
                                    <div class="note-username">
                                        {{ 'Username: ' . $note->username }}
                                    </div>
                                    <div class="note-email">
                                        {{ 'E-mail: ' . $note->email }}
                                    </div>
                                    <div class="note-homepage">
                                        {{ 'Homepage: ' . $note->homepage }}
                                    </div>
                                    <div class="note-ip">
                                        {{ 'IP: ' . $note->ip }}
                                    </div>
                                    <div class="note-browser">
                                        {{ 'Browser: ' . $note->browser }}
                                    </div>
                                    <div class="note-time">
                                        {{ $note->created_at }}
                                    </div>
                                    <div class="note-text">
                                        {{ $note->text }}
                                    </div>
                                </div>
                            @endforeach
                        </div>
                        <div class="pagination justify-content-center">
                            {{ $notes->links() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection