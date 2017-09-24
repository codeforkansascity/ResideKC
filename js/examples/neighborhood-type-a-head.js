/**
 * Created by paulb on 10/2/15.
 */

$(document).ready(function () {

    // ----------------------------------------------------------------------------------------------------------
    // Data source - Bloodhound
    // ==========================================================================================================

    var apsOrganizations = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
//              prefetch: 'http://aps-cms.dev-apskc.localhost/organizations/typeahead_list/s:a.json',
        limit: 50,
        crossDomain: true,

        remote: {
            url: config.url + 'neighborhood-typeahead/V0/%QUERY',
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
            name: 'neighborhood',
            display: 'name',
            source: apsOrganizations.ttAdapter()
            ,
            templates: {
                empty: [
                    '<div class="empty-message">',
                    'unable to find any neighborhoodes that match the current query',
                    '</div>'
                ].join('\n')
            }

        })

        .on('typeahead:opened', function () {
            console.log('typeahead:opened');
            $('#person_was_selected').val(0);
            $('#neighborhood_saved_name').val($('#neighborhood_name_type_a_head').val());

        }).on('typeahead:closed', function () {
            console.log('typeahead:closed');

            console.log('neighborhood_was_selected=' + $('#neighborhood_was_selected').val());
            console.log('neighborhood_name_type_a_head=' + $('#neighborhood_name_type_a_head').val());
            console.log('neighborhood_saved_name=' + $('#neighborhood_saved_name').val());

            if ($('#neighborhood_was_selected').val() == 0) {
                if ($('#neighborhood_name_type_a_head').val() != $('#neighborhood_saved_name').val()) {
                    $('#PersonName').val($('#neighborhood_name_type_a_head').val());
                    $('#contact_neighborhood_id').val('');
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
            $('#contact_neighborhood_id').val(suggestionObject.id);
            $('#neighborhood_was_selected').val(1);
//            addForm.populate_contact_add_form(suggestionObject.contact_id);
        }).on('typeahead:autocompleted', function (eventObject, suggestionObject, suggestionDataset) {
            console.log('typeahead:autocompleted');
            $('#contact_neighborhood_id').val(suggestionObject.id);
            $('#neighborhood_was_selected').val(1);
        })

    ;


    $("#neighborhood-form").on("submit", function () {

        var one_line_neighborhood = encodeURIComponent($("#neighborhood_id").val().replace(/ KANSAS CITY, MO/,''));

        var url = config.url + "neighborhood-attributes/V0/" + one_line_neighborhood + "?city=Kansas%20City&state=mo";

        $.ajax({
            method: "GET",
            crossDomain: true,
            url: url
        })

            .done(function (data) {
                neighborhood_obj = jQuery.parseJSON(data);
                console.log(neighborhood_obj);

                $('.neighborhood-values').empty();

                $.each(neighborhood_obj.data, function (key, value) {

                    var row = '';
                    row += '<tr>';
                    row += '<td>' + key + '</td>';
                    row += '<td>' + value + '</td>';
                    row += '</tr>';

                    $('#cases > tbody:last').append(row);

                });

            })
            .fail(function () {
                $('#neighborhood-error').show("slow");
                $('#neighborhood-error').text('Error');

            })
            .always(function () {

            });

        return false;
    });

    /* ########################################################## */

});


