$(document).ready(function() {
  $(document).on("ajax:success", ".admin-group .admin-form form", function(xhr, data, status) {
    if(data.status == 200) {
      $(".admin-group form").find("input[type=text], input[type=number], input[type=password], textarea").val("");
      clearFlash();
      $(".admin-group table tbody").append(data.html);
    } else {
      flash(data.message);
    }
  });

  $(document).on("click", ".edit-group", function(e) {
    e.preventDefault();

    $this = $(this);
    $.get("groups/" + $this.data("id") + "/edit", function(data) {
      $(".edit-group-modal form").parent().html($(data.html).find("form"));
      $(".edit-group-modal").modal("show");
    });

    return false;
  });

  $(document).on("ajax:success", ".edit-group-modal form", function(xhr, data, status) {
    if(data.status == 200) {
      $(".edit-group-modal").modal("hide");
      $(".group-" + data.id).html($(data.html).html());
      clearFlash();
    } else {
      flash(data.message);
    }
  });

  $(document).on("click", ".delete-group", function(e) {
    e.preventDefault();

    $this = $(this);
    $.ajax({
      url: "groups/" + $this.data("id"),
      type: "DELETE",
      success: function(data) {
        if(data.status == 200) {
          $this.closest("tr").remove();
        }
      }
    });

    return false;
  });
});
