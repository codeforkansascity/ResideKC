/**
 * Created by paulb on 10/2/15.
 */

$(document).ready(function () {

    // ----------------------------------------------------------------------------------------------------------
    // Data source - Bloodhound
    // ==========================================================================================================

    var apsOrganizations = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('single_line_address'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
//              prefetch: 'http://aps-cms.dev-apskc.localhost/organizations/typeahead_list/s:a.json',
        limit: 50,
        crossDomain: true,

        remote: {
            url: 'http://dev-api.codeforkc.org/address-typeahead/V0/%QUERY',
            wildcard: '%QUERY',
            transform: function (response) {
                console.log('transform', response.data);
                return response.data;
            }
        }
    });

    apsOrganizations.initialize();

    // ----------------------------------------------------------------------------------------------------------
    // custom templates with all Custom Events
    // ==========================================================================================================
    // For events see https://github.com/twitter/typeahead.js/blob/master/doc/jquery_typeahead.md#custom-events
    // Another interesting jsfiddle http://jsfiddle.net/Fresh/kLLCy/
    // And the article that showed me to use .on('typeahead:selected', function (object, datum) { ....
    //   http://stackoverflow.com/questions/21000529/using-bootstrap-3-and-twitter-typeahead-js-for-autocomplete
    // This code is based off of
    //   http://stackoverflow.com/questions/21997266/how-do-i-submit-data-populated-from-typeahead-bloodhound-auto-complete
    // ----------------------------------------------------------------------------------------------------------
    // To use scrolable drop down menu,
    //   Wrap a div around the input field with .typeahead
    //   and attach it's ID to the typeahead
    //

    $('#remote .typeahead').typeahead(
        {
            highlight: true
        },
        {
            name: 'address',
            display: 'single_line_address',
            source: apsOrganizations.ttAdapter()
            ,
            templates: {
                empty: [
                    '<div class="empty-message">',
                    'unable to find any addresses that match the current query',
                    '</div>'
                ].join('\n')
            }

        })

        .on('typeahead:opened', function () {
            console.log('typeahead:opened');
            $('#person_was_selected').val(0);
            $('#address_saved_name').val($('#address_name_type_a_head').val());

        }).on('typeahead:closed', function () {
        console.log('typeahead:closed');

        console.log('address_was_selected=' + $('#address_was_selected').val());
        console.log('address_name_type_a_head=' + $('#address_name_type_a_head').val());
        console.log('address_saved_name=' + $('#address_saved_name').val());

        if ($('#address_was_selected').val() == 0) {
            if ($('#address_name_type_a_head').val() != $('#address_saved_name').val()) {
                $('#PersonName').val($('#address_name_type_a_head').val());
                $('#contact_address_id').val('');
                console.log('NEW PERSON');
            } else {
                console.log('EXISTING PERSON');
                $('#PersonName').val('');
            }
        } else {
            console.log('EXISTING PERSON');
            $('#PersonName').val('');
        }

    }).on('typeahead:cursorchanged', function (eventObject, suggestionObject, suggestionDataset) {
        console.log('typeahead:cursorchanged');
    }).on('typeahead:selected', function (eventObject, suggestionObject, suggestionDataset) {
        console.log('typeahead:selected');
        $('#contact_address_id').val(suggestionObject.id);
        $('#address_was_selected').val(1);
//            addForm.populate_contact_add_form(suggestionObject.contact_id);
    }).on('typeahead:autocompleted', function (eventObject, suggestionObject, suggestionDataset) {
        console.log('typeahead:autocompleted');
        $('#contact_address_id').val(suggestionObject.id);
        $('#address_was_selected').val(1);
    })

    ;

    $("#address-form").keypress(function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            submitFunction();
        } else {
            return true;
        }
    });
    
    $("#address-form").on("submit", function () {
        submitFunction();
    });

    function submitFunction(){
        var one_line_address = encodeURIComponent($("#address_id").val().replace(/ KANSAS CITY, MO/, ''));

        var address_api_url = "http://dev-api.codeforkc.org//address-attributes/V0/" + one_line_address + "?city=Kansas%20City&state=mo";

        $.ajax({
            method: "GET",
            crossDomain: true,
            url: address_api_url
        })

            .done(function (data) {
                address_api_obj = jQuery.parseJSON(data);
                console.log(address_api_obj);

                $('.address-values').empty();

        
        var kiva_pin = address_api_obj.data.city_id;

        console.log(kiva_pin);


        // There should be a better way to do this instead of nesting Ajax calls within Ajax calls

            var url = "http://maps.kcmo.org/kcgis/rest/services/external/Tables/MapServer/2/" + kiva_pin + "?f=json&pretty=true";
console.log(url);

            $.ajax({
                method: "GET",
                crossDomain: true,
                url: url
            })
    
            .done(function (data) {
                    address_obj = jQuery.parseJSON(data);
                    console.log(address_obj);

        $('#your').append('<div class="col-md-3">Your Trash day is</div><div class="col-md-9">' + address_obj.feature.attributes.TRASHDAY + '</div>');
        $('#your').append('<div class="col-md-3">Your Council District is</div><div class="col-md-9">' + address_obj.feature.attributes.COUNCILDISTRICT + '</div>');

                $.each(address_obj.feature.attributes, function (key, value) {

                    var row = '';
                    row += '<tr>';
                    row += '<td>' + key + '</td>';
                    row += '<td>' + value + '</td>';
                    row += '</tr>';

                    $('#cases > tbody:last').append(row);

                });
            var line = '';


                 })
                .fail(function () {
                    $('#address-error').show("slow");
                    $('#address-error').text('Error');
                })
                .always(function () {

            });









            })
            .fail(function () {
                $('#address-error').show("slow");
                $('#address-error').text('Error');

            })
            .always(function () {

            });

        return false;
    }
    /* ########################################################## */

});


