$(document).ready(function(){
  
    // declare variables
    var topics = ["computer history museum"];
    const apikey = "mZQJH3AXFhBK880Q0bBP8cAjau56ifTH";
    
    //function to create button
    function createButton(){
        // clear the buttons div 
        $("#topicButtons").em
        //loop through the topic array
        for(let i=0; i<topics.length; i++){
            
            var jButton = $("<button>");
         
            // create buttin with id of "item-i"
            jButton.attr("id","button-"+i);
            jButton.attr("class","btn-choice");
            console.log(jButton);
            jButton.text(topics[i]);

            // append the button to the topics div
            $("#topicButtons").append(jButton)
        }
    }

    //the on click action when a topic is submitted
    $("#topic-button").on("click",function(){
        let userTopic =  $("#add-topic").val();
        
        // push the user's topic into the topics array
        topics.push(userTopic);
          
        //clear the text box for another input
        $("#add-topic").val("");
        
        //call function to write button to the dom
        createButton();
    });

    // ajax function call to giphy api
    function ajaxSubjectCall(topicName) {

        // declare api variables
        var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + topicName + "&api_key=" + apikey + "&limit=10"

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            // create a variable to store the response data
            var topicImages = response.data;

            //loop through the ten images returned in the api
            for (let j in topicImages) {
                //check image rating for appropriate display
                if (topicImages[j].images.rating !== "r") {
                    //create variable to store image and its rating
                    var imageRating = topicImages[j].rating;
                    var image = topicImages[j].images;

                    //create image and dom tags for the image
                    var imageTag = $("<img>");
                    var ratingTag = $("<p>");
                    var imageDiv = $("<div>");

                    // add image attributes
                    imageTag.attr("src", image.fixed_height_still.url);
                    imageTag.attr("data-still", image.fixed_height_still.url);
                    imageTag.attr("data_animate", image.fixed_height.url);
                    imageTag.attr("data_state", "still");
                    imageTag.attr("class", "gif");

                    //add image rating to the p tag
                    ratingTag.text("Rating : " + imageRating);

                    //append the tags to images div
                    imageDiv.append(imageTag);
                    imageDiv.append(ratingTag);

                    //prepend the image to the topicImages Id div on dom
                    $("#topicImages").prepend(imageDiv);
                }
            }
        });
    }

    // on click of the subject topic button, call the api to pull images from giphy
    $("#btn-0").on("click",function(event){

        console.log('here');
        // collect search query name from image label
        var topicName = $(this).text().trim();

        //replace spaces in the topic name with a plus (+) 
        topicName = topicName.replace(/\s+/g, "+");
        console.log(topicName);
        //call ajax
        ajaxSubjectCall(topicName);

    });   

  

});