
// pass id's with modals
$('#exampleModal').on('show.bs.modal', function (e) {
    let userId = $(e.relatedTarget).data('user-id');
    $(e.currentTarget).find('input[name="userId"]').val(userId);
});
$('#deleteModal').on('show.bs.modal', function (e) {
    let userId = $(e.relatedTarget).data('user-id');
    $(e.currentTarget).find('input[name="userId"]').val(userId);
});
$('#editModal').on('show.bs.modal', function (e) {
    let userId = $(e.relatedTarget).data('user-id');
    $(e.currentTarget).find('input[name="userId"]').val(userId);
});
$('#deleteTaskModal').on('show.bs.modal', function (e) {
    let taskId = $(e.relatedTarget).data('task-id');
    $(e.currentTarget).find('input[name="taskId"]').val(taskId);
});
$('#editRoleModal').on('show.bs.modal', function (e) {
    let userId = $(e.relatedTarget).data('user-id');
    $(e.currentTarget).find('input[name="userId"]').val(userId);
});

// tooltips
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

//date time picker config
let today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
$('#datetimepicker').datetimepicker({
    uiLibrary: 'bootstrap',
    footer: true,
    smodal: true,
    format: 'dd mmmm yyyy HH:MM',
    minDate: today,
    datepicker: {
        minDate: today
    }
});

//selectpicker
$('select').selectpicker();


//ajax request for toggle
$('.toggle-done').on('change.bootstrapSwitch', function (e) {
    let role = ($(".toggle-done").data("role"));
    let team = ($(".toggle-done").data("team"));
    let data = {};
    data.done = e.target.checked;
    data._id = e.target.value;
    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'http://localhost:5000/tasks/edit-done',
        success: function (data) {
            console.log(role)
            if (role === "team-captain" || role === "team-member") {
                window.location.replace("http://localhost:5000/teams/team");
            } else {
                window.location.replace(`http://localhost:5000/teams/${team}`);
            }
        }
    });
});
