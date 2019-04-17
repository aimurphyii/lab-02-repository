'use strict';

// for each item in array we will search for keywords. keywords will be linked to keywords in our drop down menu


// creating a funciton that will creat unique object for our gallery, based on the data it will read from the local json file

function Gallery(horn) {
    // linking each attribute to the corresponding value in the json file
    for (let key in horn){
      this[key] = horn[key];
    }
}

// once we create the object, we will store them in this array to call through as needed, but separately for each json page

Gallery.allHorns1 = [];
Gallery.allHorns2 = [];

// nav handler
$('nav a').on('click', function () {
    let $oneOrTwo = $(this).data('tab');
    // what is $whereToGo
    // gives us 'delegation' or 'attributes'
    console.log('page one or page two', $oneOrTwo);
    $('.content').hide();
    // we want $('#delegation')
    $('#' + $oneOrTwo).fadeIn(750)
})

Gallery.prototype.toHtml = function () {
    
  // we are going to get main from the dom, and inside of main we are going to add in new div elements conatining data from out gallery objects--now with handlebars...

  let $hbarTemplate = $('#horns-template').html();
  // console.log('template source', $hbarTemplate);
  // the copied html pattern is now the skeleton of our newly created horn item div
  let compiledTemplate = Handlebars.compile($hbarTemplate);
  // console.log(compiledTemplate);

  return compiledTemplate(this);
}

// one page at a time
let jp1 = '/data/page-1.json';
let jp2 = '/data/page-2.json';
let tab1 = $('#one');
let tab2 = $('#two');


// now we need to get the data to run this 
Gallery.readJson = (jpage, galleryset, place, filter) => {
  // we are going to grab a json file to run through our constructor
  $.get(jpage, 'json')
// s ogo and get that info then...
    .then(data => {
      // for each item we have in json we are going to run through our constructor and push it into our gallery catalogue
      data.forEach(item => {
        galleryset.push(new Gallery(item));
      })
    })
    //then we want ot send them to the html

    .then(place)
    .then(Gallery.loadKeywords)
    // .then(Gallery.populateFilter)
    .then(filter)
}


Gallery.loadHorns1 = () => {
  Gallery.allHorns1.forEach(hornItem=>{
    $('#one').append(hornItem.toHtml());
  })
}
Gallery.loadHorns2 = () => {
  Gallery.allHorns2.forEach(hornItem=>{
    $('#two').append(hornItem.toHtml());
  })
}


Gallery.loadKeywords = () => {
    let filterKeywords = [];
    $('option').not(':first').remove();
    Gallery.allHorns1.forEach(horn => {
        if (!filterKeywords.includes(horn.keyword))
        filterKeywords.push(horn.keyword);
    });
    Gallery.allHorns2.forEach(horn => {
      if (!filterKeywords.includes(horn.keyword))
      filterKeywords.push(horn.keyword);
  });
    let filterkeywords = [];
    filterkeywords.sort();

    filterKeywords.forEach(keyword => {
        let optionTag = `<option value = "${keyword}">${keyword}</option>`;
        $('select').append(optionTag);
        console.log(filterKeywords);
    });
}

Gallery.handleFilter1 = () => {
  $('select').on('change', function () {
    let $selected = $(this).val();
    console.log('selected is ', $selected);
    if ($selected !== 'default') {

      Gallery.allHorns1.forEach(horn => {

        if ($selected === horn.keyword) {
          console.log($selected);
          $('div').attr("style", "display: none");
          $(`.${$selected}`).attr("style", "display: block")
          console.log('here i am at ',horn.keyword, $selected);
        }
      });
    }
  })
}

Gallery.handleFilter2 = () => {
  $('select').on('change', function () {
    let $selected = $(this).val();
    console.log('selected is ', $selected);
    if ($selected !== 'default') {

      Gallery.allHorns2.forEach(horn => {

        if ($selected === horn.keyword) {
          console.log($selected);
          $('div').attr("style", "display: none");
          $(`.${$selected}`).attr("style", "display: block")
          console.log('here i am at ',horn.keyword, $selected);
        }
      });
    }
  })
}


$(() => Gallery.readJson(jp1, Gallery.allHorns1, Gallery.loadHorns1, Gallery.handleFilter1));

$(() => Gallery.readJson(jp2, Gallery.allHorns2, Gallery.loadHorns2, Gallery.handleFilter2));


// DOM-ready function
$(document).ready(function () {
  $('#two').hide()
})
