$(document).ready(function() {
    // create an array of topics 
    let topics =["computing", "investment","welding", "motor vehicle repair","Home Improvement"];
  
    $(".gif").on("click",function(){
        console.log('the care is stuj');
    })

    // create buttons from the topics array

    for (let i in topics){
        var jButton = $("<button>");
        // Then give it an ID in the following form:
        
        // "item-4" or "item-3" or "item-99", where the number is equal to toDoCount.
        jButton.attr("id","button-"+i);
        jButton.attr("class","btn-lg");
        console.log(jButton);
        jButton.text(topics[i]);

        // append the button to the div
        $("#topicButtons").append(jButton);
    }

    // code for button onlick 
    $(".btn-lg").on("click",function(){
        var topicName = $(this).text().trim();
        //replace spaces in the topic name with a plus (+) 
        topicName = topicName.replace(/\s+/g, "+");
        console.log("the button text : ",topicName);

        // set giphy api key here
        const apikey = "mZQJH3AXFhBK880Q0bBP8cAjau56ifTH";
        // take the clicked button label and use it in query to giphy and declare/set ajax variables.
        var queryUrl = "http://api.giphy.com/v1/gifs/search?q="+topicName+"&api_key="+apikey+"&limit=10"
       
        // create an ajax function call here
        function giphyAjaxCall(){
            $.ajax({
                url: queryUrl,
                method:"GET"
            }).then(function(response){
                // create a variable to store the response data
                var topicImages = response.data;
                console.log(topicImages);
                //loop through the ten images to work on them here
                for(let j in topicImages){
                    //check if the image has a good rating for appropriate display
                    if(topicImages[j].images.rating !== "r"){
                        //create variable to store image and its rating
                        var imageRating  = topicImages[j].rating;
                        console.log(imageRating);
                        var imageTag = $("<img>");
                        var ratingTag = $("<p>"); 
                        var imageDiv =$("<div>");
                        // add image attributes
                        imageTag.attr("src",topicImages[j].images.fixed_height_still.url);
                        imageTag.attr("data-still",topicImages[j].images.fixed_height_still.url);
                        imageTag.attr("data_animate",topicImages[j].images.fixed_height.url );
                        imageTag.attr("data_state","still");
                        imageTag.attr("class","gif");
                        //add image rating to the p tag
                        ratingTag.text("Rating : "+imageRating); 

                        //append the tags to images div
                        imageDiv.append(imageTag);
                        imageDiv.append(ratingTag);

                        //prepend the image to the topicImages Id div on the html page
                        $("#topicImages").prepend(imageDiv);
                    }
                }
            });
        }
        // call ajax function to query giphy and add the images to the dom
        giphyAjaxCall();
    });

    // add on click function to take user input
    $("#topic-button").on("click",function(){
        let userTopic =  $("#add-topic").val();
        console.log("here. thre");
        // add the topic array , user input topic
        topics.push(userTopic);
        console.log(topics);

        //call function to write button to the dom
        recreateButton();
        //clear the text the user entered
        $("#add-topic").val("");
    });
   
    //function to recreate the array
    function recreateButton (){
        $("#topicButtons").empty();
        $("#topicImages").empty();
        for (let i in topics){
            var jButton = $("<button>");
            // Then give it an ID in the following form:
            
            // "item-4" or "item-3" or "item-99", where the number is equal to toDoCount.
            jButton.attr("id","button-"+i);
            jButton.attr("class","btn-lg");
            console.log(jButton);
            jButton.text(topics[i]);
    
            // append the button to the div
            $("#topicButtons").append(jButton);
        }

    }


});