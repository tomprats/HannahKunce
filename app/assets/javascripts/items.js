$(document).ready(function() {
  $(".admin-item .admin-form form").ajaxForm({
    success: function(data) {
      if(data.status == 200) {
        $(".admin-item form").find("input[type=text], input[type=number], input[type=password], textarea").val("");
        clearFlash();
        $(".admin-item table tbody").append(data.html);
      } else {
        flash(data.message);
      }
    }
  });

  $(document).on("click", ".edit-item", function(e) {
    e.preventDefault();

    $this = $(this);
    $.get("items/" + $this.data("id") + "/edit", function(data) {
      $(".edit-item-modal form").parent().html($(data.html).find("form"));
      $(".edit-item-modal").modal("show");
      $("form#edit_item_" + $this.data("id")).ajaxForm({
        success: function(data) {
          if(data.status == 200) {
            $(".edit-item-modal").modal("hide");
            $(".item-" + data.id).html($(data.html).html());
            clearFlash();
          } else {
            flash(data.message);
          }
        }
      });
    });

    return false;
  });

  $(document).on("click", ".delete-item", function(e) {
    e.preventDefault();

    $this = $(this);
    $.ajax({
      url: "items/" + $this.data("id"),
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
