$(function(){

    // Offset of image to compensate for positioning
    var imageOffset = {
        top: 30,
        left: 10
    };

    // Clicking the map image should create a new marker...
    $('#map-image').click(function(e){
        var cloned = $('#marker-original').clone();

        // Calculate the offset of the marker from the clicked point
        var mapOffset = $('#map-container').offset();
        var xPosition = e.pageX - mapOffset.left - imageOffset.left;
        var yPosition = e.pageY - mapOffset.top - imageOffset.top;

        // Remove clone's id, give it a unique class,
        // position it, and add it to the container
        cloned.attr('id', '').addClass('clone').css({
            top: yPosition,
            left: xPosition 
        }).appendTo('#map-container');

        // Fade in the tooltip to ask for a note
        cloned.find('.marker-note').fadeIn();

        // Find the marker-input field and give it focus
        cloned.find('.marker-input').focus();
    });

    // Clicking on an existing marker should delete it
    $(document).on('click', '.clone', function(e){
        $(this).remove();
    });

    //***
    // Note: Make use of the .stop() jQuery function to stop any
    //       active animations before playing the next set. This
    //       prevents awkward overlaps!
    //***

    // When mousing over a pin image, fade in the related tooltip if it contains text
    $(document).on('mouseover', '.marker .pin', function(e){
        var markerNote = $(this).closest('.marker').find('.marker-note');
        if(markerNote.text() !== '') {
            $(this).closest('.marker').find('.marker-note').stop().fadeIn();
        }
    });

    // When mousing off of a pin image, hide the tooltip.
    $(document).on('mouseout', '.marker .pin', function(e){
        $(this).closest('.marker').find('.marker-note').stop().fadeOut();
    });

    // When an input is blurred, update the value of the text field by replacing the input
    $(document).on('blur', '.marker-input', function(e){
        $(this).closest('.marker-note').text($(this).val());
        $(this).closest('.marker').find('.marker-note').stop().fadeOut();
    });

    // When pressing the enter key, save the marker-input value
    $(document).on('keydown', '.marker-input', function(e){
        if(e.keyCode === 13){
            $(this).closest('.marker-note').text($(this).val());
        }
    });
});