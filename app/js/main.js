$(function () {
  $('.process__btn').on('click', function () {
    var index = $(this).closest('.process__item').index();

    $('.process__btn').removeClass('process__btn--active');
    $('.process__item').removeClass('process__item--active');
    $(this).addClass('process__btn--active');
    $(this).closest('.process__item').addClass('process__item--active');

    $('.process__text-item').removeClass('process__text-item--active');
    $('.process__text-item').eq(index).addClass('process__text-item--active');
  });
});
