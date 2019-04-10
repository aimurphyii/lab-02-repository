'use strict';

// for each item in array we will search for keywords. keywords will be linked to keywords in our drop down menu


// creating a funciton that will creat unique object for our gallery, based on the data it will read from the local json file
function HornsGalleryItem(horndata) {
    // linking each attribute to the corresponding value in the json file
    this.title = horndata.title;
    this.keyword = horndata.keyword;
    this.horns = horndata.horns;
    this.image_url = horndata.image_url;
    this.description = horndata.description;
}

// once we create the object, we will store them in this array to call through as needed
HornsGalleryItem.catalogue=[];

let selectOptions=[];


// we want to create a protoype that will give our objects a method that allows them to display

HornsGalleryItem.prototype.render = function(){

    // we are going to get main from the dom, and inside of main we are going to add in new div elements conatining data from out gallery objects
    // let opt = $('option');
    // $('select').append('<option></option>');
    // $('option').attr('value',this.keyword);
    // $('option').text(this.keyword);
    

    $('main').append('<div class="clone"></div>');
    let hornItemClone = $('div[class="clone"]');
//   I am copying the existing tags and structure
    let hornItemHtml = $('#photo-template').html();
// the copied html pattern is now the skeleton of our newly created horn item div
    hornItemClone.html(hornItemHtml);

    // at this point we will find each element and rewrite it
    hornItemClone.find('h2').text(this.title);
    hornItemClone.find('img').attr('src', this.image_url);
    hornItemClone.find('p').text(this.description);
    hornItemClone.removeClass('clone');
    hornItemClone.attr('class',this.keyword);
    hornItemClone.attr('class','img');
}

// now we need to get the data to run this operation
HornsGalleryItem.readJson = () =>{
    // we get json file form our dir
    $.get('../data/page-1.json', 'json')
    // once we have it we will create a new item and push it into our catalogue and each item is going to recieve the data from the json file
    .then(data=>{
        data.forEach(item => {
            HornsGalleryItem.catalogue.push(new HornsGalleryItem(item));
            
        });
    })
    // then once everything is allocated we will load it to the page
    .then(HornsGalleryItem.loadGallery)
}
// this is where we load our parameter from the constructor and render for each one
HornsGalleryItem.loadGallery=()=>{
    HornsGalleryItem.catalogue.forEach(horndata=>horndata.render())
}

$(()=>HornsGalleryItem.readJson())

// i need to make a selector with options that match my keywords. I can grab keywords from catalogue.
function getKey(arr){
    for(let i = 0; i < arr.length; i++){
        selectOptions.push(arr[i].keyword);
    };
}
getKey(HornsGalleryItem.catalogue);


// well, once i figure out keywords, I will need to select them, so at least I can do that.
// select box filtering
// this will be helpful for horns.
// what ever name gets SELECTED, 
$('select[name="filter-key"]').on('change', function () {
    // when it changes on change, itll get the value, hide all images, and get class (img attribute in html)
    let $selection = $(this).val();
    // here: hide first
    $('img').hide()
    // here: display whatever has this value attribute
    $(`img[class="${$selection}"]`).show()
  })