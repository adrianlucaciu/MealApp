// npm run start - start server
// A $( document ).ready() block.
$(document).ready(function () {


    $('#mealsTable').css('display', 'none');

    $('#closeModal').click(function() {
        $('#myModal').css('display', 'none')
    })

    $('#ingForm').submit(function (e) {
        e.preventDefault();

        console.log($('#ingredient').val)

        var ingredient = $('#ingredient').val()

        $.ajax({
            url: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=' + ingredient,
            type: 'GET',
            success: function (data, status) {
                $(console.log(data.meals))

                // convert string to JSON
                response = $.parseJSON(JSON.stringify(data.meals));

                $.each(response, function (i, item) {

                    var img = "<img src='" + item.strMealThumb + "' />";

                    var $tr = $('<tr>')
                    
                    .append(
                        $('<td>').text(item.idMeal),
                        $('<td>').html(img),
                        $('<td>').text(item.strMeal)
                    ).appendTo('#mealsTable');
                    
                    $tr.attr('id', item.idMeal);

                    $tr.click(function() {
                        fillModalWithApiData($tr.attr('id'))
                        openModal()
                    })

                   
                    
                })


                $('#mealsTable').css('display', 'block');

                $('#topSearchBar').removeClass('centeredInPage')

          
                

            },
            error: function (errorMessage) {
                alert('Something went wrong ' + errorMessage)
            }
        });
    })





    function fillModalWithApiData(mealId) {
        $.ajax({
            url: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + mealId,
            type:'GET',
            success: function(data, status) {
                $(console.log(data))
                responseArray = $.parseJSON(JSON.stringify(data.meals));

                if(responseArray.length > 0) {
                    
                    var meal = responseArray[0]
                    console.log(meal)
                    $('#strMeal').text(meal.strMeal);
                    $('#strArea').text(meal.strArea);
                    $('#strCategory').text(meal.strCategory);

                    var img = "<img src='" + meal.strMealThumb + "'/>";

                    $('#strMealThumb').html(img);
                    $('#strInstructions').text(meal.strInstructions);
                }
            },
            error: function(errorMessage) {
                alert('Something went wrong ' + errorMessage)
            }
        })
    }
    function openModal() {
        

        $('#myModal').css('display', 'block')
    }
    
});