'use strict';

function Gallery(horn) {
    this.image_url = horn.image_url;
    this.titile = horn.title;
    this.description = horn.description;
    this.keyword = horn.keyword;
    this.horns = horn.horns;
}


Gallery.allHorns = [];
Gallery.prototype.render = function () {
    $('main').append('<div class="clone"></div>');
    let hornClone = $('div[class="clone"]');

    let hornHtml = $('#photo-template').html();

    hornClone.html(hornHtml);

    hornClone.find('h2').text(this.title);
    hornClone.find('img').attr('src', this.image_url);
    hornClone.find('p').text(this.description);
    hornClone.removeClass('clone');
    hornClone.attr('class', this.title);
}

Gallery.readJson = () => {
    $.get('data.json', 'json')
    .then(data => {
        data.forEach(item => {
            Gallery.allHorns.push (new Gallery(item));
        })
    })

    .then(Gallery.loadHorns)
}

Gallery.loadHorns = () => {
    Gallery.allHorns.forEach(horn=> horn.render())

}

$(()=> Gallery.readJson());