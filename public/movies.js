$(document).ready(function() {

    appendToList()
    console.log('work plz');

});

//turn on nodemon app.js
// localhost:3000 is site


//add movie info to page
$('#addMovie').on('submit', function(event) {
    event.preventDefault();
    var form = $(this).serializeArray();
    $.post('/movies', form);
    window.location = 'indexone.html'
})



//submit edits
$('#editForm').on('submit', function(event) {
    event.preventDefault();
    var form = $(this).serializeArray();
    console.log(form);
    var windowLocation = window.location.href;
    var id = windowLocation.substring(windowLocation.indexOf('=') + 1)
    console.log(id, 'id');
    $.ajax({
        url: `/movies/${id}`,
        method: 'PUT',
        data: form
    }).done(function(res) {
        window.location = 'indexone.html'

    });
})

function deleteMovie(id) {
    $.ajax({
            url: `/movies/${id}`,
            method: 'DELETE',
        })
        .done((response) => {
            window.location = 'indexone.html'
            location.reload();
        })
        .fail((err) => {
            console.log(err);
        });
};




function appendToList() {
    console.log('1');
    $.get('/movies', function(items) {
        console.log('first');
        $.each(items, function(key, data) {
            console.log(data, 'data');
            $('#movieTable tbody')
                .append(
                    '<tr data-id=' + data.id + '><td>' + data.title + '</td><td>' +
                    data.year + '</td><td>' +
                    data.myRating + '</td><td><button onclick="deleteMovie(\'' +
                    data.id + '\')"> delete </button><td><button id="editButton"><a href="indexedit.html?=' +
                    data.id + '">edit</a></button></td><td></td></tr>');
        });
    });
}

function getData(id) {
    $.ajax({
            url: `/movies/${id}`,
            method: 'GET',
        })
        .done((response) => {
            console.log(response);
            appendData(response);
        })
        .fail((err) => {
            console.log(err);
        });
}
