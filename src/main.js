// const api = jQuery('.test')
const api = $('.test')
api.addClass('red')
api.children().parent().print()

const api2 = api.find('.child').addClass('red')

api2.end().addClass('green')
api.each((item, index) => {
  console.log(item, index);
})


api.parent().print()
api.children().print()


// const api1 = jQuery('.child1')
const api1 = $('.child1')
api1.next().print()
api1.prev().print()
api.siblings().print()