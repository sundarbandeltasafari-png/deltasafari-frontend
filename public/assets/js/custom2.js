(function ($) {
  ("use strict");

   $(".single-search-box, .single-field").each(function () {
    var $box = $(this);
    var $dropdown = $box.find(".custom-select-dropdown");
    var $input = $dropdown.find("input");
    var $wrap = $box.find(".custom-select-wrap");
    var $searchInput = $wrap.find(".custom-select-search-area input");

    // Toggle dropdown on click
    $dropdown.on("click", function (e) {
      e.stopPropagation();
      $(".custom-select-wrap").removeClass("active"); // Close others
      $wrap.toggleClass("active");
    });

    // Handle option click
    $wrap.find(".option-list-destination li").on("click", function () {
      var country = $(this).find(".destination h6").text();
      var destination = $(this).find(".destination span").text();
      const countryDestinationHtml = `<div class="destination"><h6>${country}</h6> <span>${destination}</span></div>`;
      $box.find(".input-field-value").empty().html(countryDestinationHtml); // âœ… FIXED
      $input.val(country + destination);
      $wrap.removeClass("active");
    });

    $wrap.find(".option-list li").on("click", function () {
      var value = $(this).find("h6").text();
      $input.val(value);
      $wrap.removeClass("active");
    });

    // Search filter
    $searchInput.on("input", function () {
      var searchText = $(this).val().toLowerCase();
      $wrap
        .find(".option-list-destination li, .option-list li")
        .each(function () {
          var destinationText = $(this)
            .find(".destination h6, h6")
            .text()
            .toLowerCase();
          $(this).toggle(destinationText.includes(searchText));
        });
    });

    // Close dropdown on click outside
    $(document).on("click", function (event) {
      if (!$(event.target).closest($box).length) {
        $wrap.removeClass("active");
      }
    });
  });

  // calender
  $(function () {
    const today = moment();
    const checkOutDefault = moment().add(3, "days");
    const tomorrow = moment().add(1, "days");

    // ----------- General Calendar: inOut (Per Dropdown) ------------
    $('input[name="inOut"]').each(function () {
      const $input = $(this);
      const $display = $input
        .closest(".custom-select-dropdown")
        .find(".selected-date");

      $input.daterangepicker(
        {
          singleDatePicker: true,
          startDate: today,
          minYear: 2025,
          maxYear: 2026,
          locale: {
            format: "DD-MMM-YYYY",
          },
        },
        function (start) {
          const formattedDayMonth = start.format("D MMMM");
          const formattedDayYear = start.format("dddd YYYY");
          const formattedDate = `<div class="selected-date"><h6>${formattedDayMonth}</h6><span>${formattedDayYear}</span></div>`;
          $display.html(formattedDate);
        }
      );

      // Initialize default
      $display.html(
        `<div class="selected-date"><h6>${today.format(
          "D MMMM"
        )}</h6><span>${today.format("dddd YYYY")}</span></div>`
      );
    });
    $('input[name="inOut2"]').each(function () {
      const $input = $(this);

      $input.daterangepicker(
        {
          singleDatePicker: true,
          showDropdowns: true,
          startDate: "01-Jan-2005",
          minYear: 1980,
          maxYear: 2020,
          locale: {
            format: "DD-MMM-YYYY",
          },
        },
        function (start) {
          var years = moment().diff(start, "years");
        }
      );
    });

    // ----------- Hotel Check-In (Scoped) ------------
    $("input.hotel-checkin").each(function () {
      const $input = $(this);
      const $display = $input
        .closest(".custom-select-dropdown, .hotel-box, .date-box")
        .find(".hotel-selected-date-checkin");
      const $display2 = jQuery(document).find(".hotel-selected-date-checkout");

      $input.daterangepicker(
        {
          opens: "center",
          startDate: today,
          endDate: checkOutDefault,
          minYear: 2025,
          maxYear: 2026,
          locale: {
            format: "DD-MMM",
          },
        },
        function (start, end) {
          const formatted = start.format("D MMMM");
          $display.html(`<h6>${formatted}</h6><span>Check-In</span>`);

          const formattedCheckOut = end.format("D MMMM");
          $display2.html(`<h6>${formattedCheckOut}</h6><span>Check-Out</span>`);
        }
      );
      $("#hotel-details-calendar").toggleClass("active");
      // Default display before selection
      $display.html(`<h6>${today.format("D MMMM")}</h6><span>Check-In</span>`);
      $display2.html(
        `<h6>${checkOutDefault.format("D MMMM")}</h6><span>Check-Out</span>`
      );
    });

    // hotel details checkout

    $(".hotel-selected-date-checkin").html(
      `<h6>${tomorrow.format("D MMMM")}</h6><span>Check-In</span>`
    );
    $(".hotel-selected-date-checkout").html(
      `<h6>${checkOutDefault.format("D MMMM")}</h6><span>Check-Out</span>`
    );
    $(
      ".hotel-details-wrapper .booking-area .date-field, .hotel-details-wrapper .booking-area .date-field .custom-select-dropdown"
    ).click(function () {
      $("#hotel-details-calendar").toggleClass("active");
    });

    $("body").on("click", "#hotel-calendar-check", function (e) {
      e.preventDefault();
      $("#hotel-details-calendar").removeClass("active");
    });

    $("body").on("click", "#tour-calendar-check", function (e) {
      e.preventDefault();
      $("#tour-booking-calendar").removeClass("active");
    });

    // Tour details
    $(".booking-modal .selected-date").html(
      `<h6>${moment(today).format("D MMMM")}</h6><span>Booking Date</span>`
    );
    $(
      ".booking-modal .modal-content .date-field,.booking-modal .modal-content .date-field .custom-select-dropdown,.booking-modal .selected-date"
    ).click(function () {
      $("#tour-booking-calendar").toggleClass("active");
    });
    $(document).click(function (e) {
      if (
        !$(e.target).closest(
          "#tour-booking-calendar, .date-field, .custom-select-dropdown, .selected-date"
        ).length
      ) {
        $("#tour-booking-calendar").removeClass("active");
      }
    });
  });

  //Quantity Increment Guest
  function updateGuestSummary() {
    let totalAdults = 0;
    let totalChildren = 0;

    $('input[name="adult_quantity"]').each(function () {
      totalAdults += parseInt($(this).val(), 10) || 0;
    });

    $('input[name="child_quantity"]').each(function () {
      totalChildren += parseInt($(this).val(), 10) || 0;
    });

    $("#adult-qty").text(totalAdults);
    $("#child-qty").text(totalChildren);
  }

  function updateRoomTitles() {
    $(".room-list .single-room").each(function (index) {
      $(this)
        .find(".room-title h6")
        .text(`Room-${index + 1}`);
    });
  }

})