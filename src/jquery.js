window.$ = window.jQuery = function (selectorOrArray) {
  let elements = null
  if (typeof selectorOrArray === 'string') {
    elements = document.querySelectorAll(selectorOrArray)
  } else if (selectorOrArray instanceof Array) {
    elements = selectorOrArray
  }

  const api = Object.create(jQuery.prototype) // 创建一个对象，这个对象的__proto__为括号里的
  // Object.assign方法就是把{}中的对象都赋值给api
  // 相当于 api.elements = elements
  Object.assign(api, {
    elements: elements,
    // 把oldThis 存在这个对象里。 要不然别的方法访问不到
    // find中返回的是新的jQuery对象，而selectorOrArray是有oldThis这个属性的
    oldThis: selectorOrArray.oldThis,

  })

  return api
}
// 把方法都移到jQuery原型身上，      这样每次创建一个jQuery对象时，就不会再去开一块内存存放方法了。
//  所有创建的jQuery对象中的方法都放在原型上，这样省内存
jQuery.prototype = {
  constructor: jQuery,
  addClass(className) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].classList.add(className)
    }
    // 要求返回this 的原因是因为能够链式操作
    return this
  },
  find(selector) {
    let array = []
    for (let i = 0; i < this.elements.length; i++) {
      const elements2 = Array.from(this.elements[i]
        .querySelectorAll(selector))
      array = array.concat(elements2)
    }
    //  将当前的对象存放在array里
    array.oldThis = this
    // 然后在返回一个新的jQuery对象， 防止污染
    // 如果直接把数组赋值给elements返回的话，会污染到addClass方法
    return jQuery(array)
  },
  end() {
    return this.oldThis
  },
  each(fn) {
    for (let i = 0; i < this.elements.length; i++) {
      fn.call(null, this.elements[i], i)
    }
    // 要求返回this 的原因是因为能够链式操作
    return this
  },
  print() {
    console.log(this.elements);
  },
  parent() {
    const array = []
    // 遍历的原因是因为 同名元素有很多
    this.each((node) => {
      // 判断下如果是同一个父节点只打印一次就行
      // 如果没有 node.parentNode 就push
      if (array.indexOf(node.parentNode) === -1) {
        array.push(node.parentNode)
      }
    })
    // 返回一个新的jQuery对象， 
    return jQuery(array)
  },
  children() {
    const array = []
    this.each((node) => {
      array.push(...node.children)
    })
    // 返回一个新的jQuery对象， 
    return jQuery(array)
  },
  siblings() {
    const array = []
    this.each((node) => {
      array.push(...Array.from(node.parentNode.children)
        .filter(n => n !== node))
    })
    return jQuery(array)
  },
  next() {
    const array = []
    this.each((node) => {
      let nextNode = node.nextSibling
      while (nextNode && nextNode.nodeType === 3) {
        nextNode = nextNode.nextSibling
      }
      array.push(nextNode)
    })
    return jQuery(array)
  },
  prev() {
    const array = []
    this.each((node) => {
      let prevNode = node.previousSibling
      while (prevNode && prevNode.nodeType === 3) {
        prevNode = prevNode.previousSibling
      }
      array.push(prevNode)
    })
    return jQuery(array)
  },
}