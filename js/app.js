'use strict';

// for each item in array we will search for keywords. keywords will be linked to keywords in our drop down menu


// creating a funciton that will creat unique object for our gallery, based on the data it will read from the local json file
function Gallery(horn) {
    // linking each attribute to the corresponding value in the json file
    this.title = horn.title;
    this.keyword = horn.keyword;
    this.horns = horn.horns;
    this.image_url = horn.image_url;
    this.description = horn.description;
    this.source = horn.source;
}

// once we create the object, we will store them in this array to call through as needed

Gallery.allHorns = [];

// nav handler
$('nav a').on('click', function () {
    let $oneOrTwo = $(this).data('tab');
    // what is $whereToGo
    // gives us 'delegation' or 'attributes'
    console.log('page one or page two', $oneOrTwo);
    $('.tab-content').hide();
    // we want $('#delegation')
    $('#' + $oneOrTwo).fadeIn(750)
})

Gallery.prototype.render = function () {
    
    $('#'+ this.source).append('<div class="clone"></div>');
    let hornClone = $('div[class="clone"]');


    // we are going to get main from the dom, and inside of main we are going to add in new div elements conatining data from out gallery objects

    let hornItemHtml = $('#photo-template').html();
// the copied html pattern is now the skeleton of our newly created horn item div
    hornClone.html(hornItemHtml);

    // at this point we will find each element and rewrite it
    hornClone.find('h2').text(this.title);
    hornClone.find('img').attr('src', this.image_url);
    hornClone.find('p').text(this.description);
    hornClone.attr('class',this.keyword);
    // hornClone.attr('class','img');
    hornClone.removeClass('clone');
}

// one page at a time
// let p1 = '/data/page-1.json';
// let p2 = '/data/page-2.json';
// let tab1 = $('#page1');
// let tab2 = $('#page2');

// now we need to get the data to run this 
Gallery.readJson = () =>{
    // we get json file form our dir
    $.get('/data/page-1.json', 'json')

        .then(data => {
            data.forEach(item => {
                Gallery.allHorns.push(new Gallery(item));
            })
        })
// if you wanted it all to run together
    $.get('/data/page-2.json', 'json')

        .then(data => {
            data.forEach(item => {
                Gallery.allHorns.push(new Gallery(item));
            })
        })

        .then(Gallery.loadHorns)
        .then(Gallery.loadKeywords)
        .then(Gallery.populateFilter)
        .then(Gallery.handleFilter)

}

// Gallery.splitSource=()=>{
//     for (let i=19;i<Arr.length;i++){

//     }
// }

Gallery.loadHorns = () => {
    Gallery.allHorns.forEach(horn => horn.render())
}


Gallery.loadKeywords = () => {
    let filterKeywords = [];
    $('option').not(':first').remove();
    Gallery.allHorns.forEach(horn => {
        if (!filterKeywords.includes(horn.keyword))
        filterKeywords.push(horn.keyword);
    });

    let filterkeywords = [];
    filterkeywords.sort();

    filterKeywords.forEach(keyword => {
        let optionTag = `<option value = "${keyword}">${keyword}</option>`;
        $('select').append(optionTag);
    });
}

Gallery.handleFilter = () => {
    $('select').on('change', function(){
        let $selected=$(this).val();
        console.log('selected is ',$selected);
        if($selected!== 'default'){
            
            Gallery.allHorns.forEach(horn=>{
                
                if($selected===horn.keyword){
                    console.log($selected);
                    $('div').attr("style", "display: none");
                    $(`.${$selected}`).attr("style", "display: block");
                }
            });
        }
    })
}

$(() => Gallery.readJson());

// DOM-ready function
$(document).ready(function () {
    $('#page-2').hide()
  })
  