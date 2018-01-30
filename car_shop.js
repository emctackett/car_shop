var cars = [
  { make: 'Honda', image: 'images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000},
  { make: 'Honda', image: 'images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
  { make: 'Toyota', image: 'images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
  { make: 'Toyota', image: 'images/toyota-corrolla-2016.jpg', model: 'Corrolla', year: 2016, price: 15000 },
  { make: 'Suzuki', image: 'images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
];

$(function() {
  var App = {
    allCars: cars,
    filteredCars: cars,
    cacheTemplates: function() {
      this.filtersTemplate = Handlebars.compile($('#filters_template').remove().html());
      this.carsTemplate = Handlebars.compile($('#cars_template').remove().html());
      Handlebars.registerPartial('car_template', ($('#car_template').remove().html()));
    },
    generateFilters: function() {
      var makes = _.uniq(_(cars).pluck('make'));
      var models = _.uniq(_(cars).pluck('model'));
      var prices = _.uniq(_(cars).pluck('price'));
      var years = _.uniq(_(cars).pluck('year'));

      return { makes: makes, models: models, prices: prices, years: years };
    },
    renderFilterMenu: function() {
      $('#filters').html(this.filtersTemplate(this.generateFilters()));
    },
    renderCars: function() {
      $('#cars').html(this.carsTemplate({ cars: this.filteredCars }));
    },
    filterResults: function() {
      var make = $('#make_select').val();
      var model = $('#model_select').val();
      var price = Number($('#price_select').val());
      var year = Number($('#year_select').val());

      var filters = {};

      if (make) filters.make = make;
      if (model) filters.model = model;
      if (price) filters.price = price;
      if (year) filters.year = year;

      this.filterCars(filters);
    },
    filterCars: function(filters) {
      this.filteredCars = _(this.allCars).where(filters);
      this.renderCars();
    },
    init: function() {
      this.cacheTemplates();
      this.renderCars();
      this.renderFilterMenu();
      $('.filter_btn').on('click', this.filterResults.bind(this));
    },
  };

  App.init();
});
