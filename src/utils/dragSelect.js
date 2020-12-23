const SelectType = {
  UNSELECT: '0',
  SELECTED: '1'
}

/**
 * 拖动选中
 * 使用方法：
 * new DragSelect(document.getElementById('container'), {
    dragClass: 'drag-class', // 需要拖动选中的元素的class
    onSelect: function (nodes) { // 拖动结束后回调选中的元素节点
        console.log(nodes)
    }
})
 */
export default class DragSelect {
  constructor(el, options) {
    console.log('drag-select: init')
    this.el = el
    this.initOptions(options)
    this.nodeList = el.querySelectorAll('.' + this.options.dragClass)
    this.initNodeList(el)

    this.isDraging = false
    this.mask = null
    this.startX = null
    this.startY = null

    this.mouseDownHandler = this.onMouseDown.bind(this)
    this.mouseMoveHandler = this.onMouseMove.bind(this)
    this.mouseUpHandler = this.onMouseUp.bind(this)
    this.elementRemovedHandler = this.onElementRemoved.bind(this)

    document.addEventListener('mousedown', this.mouseDownHandler)
    document.addEventListener('mousemove', this.mouseMoveHandler)
    document.addEventListener('mouseup', this.mouseUpHandler)

    this.el.addEventListener('DOMNodeRemovedFromDocument', this.elementRemovedHandler)
  }

  initOptions(options) {
    this.options = Object.assign({}, {
      dragClass: '', // 可以拖动选中的class元素
      threshold: 20, // 拖动阈值，拖动范围大于此值才会视为正在拖动
      startInContainer: true, // 是否起始点在容器内才能拖拽
      onSelect: null // function, 返回选中的节点
    }, options)
  }

  initNodeList() {
    for (let i = 0; i < this.nodeList.length; i++) {
      // 标记元素是否被选中
      this.nodeList[i].setAttribute('data-select', SelectType.UNSELECT)
    }
  }

  onMouseDown(evt) {
    console.log('mousedown')
    if (!this.checkStartInContainer(evt)) {
      return false
    }
    this.isDraging = true
    this.initNodeList()
    this.createDragMask(evt)
    this.stopDefaultEvt(evt)
  }

  onMouseMove(evt) {
    if (!this.isDraging) {
      return false
    }
    this.drawingMask(evt)
    const maskRect = this.mask.getBoundingClientRect()
    const _l = maskRect.left
    const _t = maskRect.top
    const _w = maskRect.width
    const _h = maskRect.height
    for (let i = 0; i < this.nodeList.length; i++) {
      const node = this.nodeList[i]
      const nodeRect = node.getBoundingClientRect()
      const sl = nodeRect.left + nodeRect.width
      const st = nodeRect.top + nodeRect.height
      if (sl > _l && st > _t && nodeRect.left < _l + _w && nodeRect.top < _t + _h) {
        node.setAttribute('data-select', SelectType.SELECTED)
      } else {
        node.setAttribute('data-select', SelectType.UNSELECT)
      }
    }
  }

  onMouseUp(evt) {
    if (this.isDraging) {
      this.isDraging = false
      if (this.checkThreshold()) {
        this.getSelectedNodes()
      }
      this.clearMask()
    }
  }

  onElementRemoved(evt) {
    console.log('drag-select: el has removed')
    document.removeEventListener('mousedown', this.mouseDownHandler)
    document.removeEventListener('mousemove', this.mouseMoveHandler)
    document.removeEventListener('mouseup', this.mouseUpHandler)
  }

  createDragMask(evt) {
    this.clearMask()
    this.startX = (evt.x || evt.clientX)
    this.startY = (evt.y || evt.clientY)
    this.mask = document.createElement('div')
    this.mask.style.left = this.startX + 'px'
    this.mask.style.top = this.startY + 'px'
    this.mask.style.cssText = `
            position:fixed;
            width:0px;
            height:0px;
            z-index:10000;
            font-size:0px;
            margin:0px;
            padding:0px;
            border:1px dashed #0099FF;
            background-color:#C3D5ED;
            filter:alpha(opacity:60);
            opacity:0.6;
            display:none;
        `
    document.body.appendChild(this.mask)
  }

  drawingMask(evt) {
    this.mask.style.display = ''
    const _x = (evt.x || evt.clientX)
    const _y = (evt.y || evt.clientY)
    this.mask.style.left = Math.min(_x, this.startX) + 'px'
    this.mask.style.top = Math.min(_y, this.startY) + 'px'
    this.mask.style.width = Math.abs(_x - this.startX) + 'px'
    this.mask.style.height = Math.abs(_y - this.startY) + 'px'
  }

  clearMask(evt) {
    if (this.mask) {
      document.body.removeChild(this.mask)
      this.mask = null
    }
  }

  stopDefaultEvt(evt) {
    evt.stopPropagation ? evt.stopPropagation() : evt.cancelBubble = true
    evt.preventDefault ? evt.preventDefault() : evt.returnValue = false
  }

  // 检查起始点是否在容器内
  checkStartInContainer(evt) {
    const startX = (evt.x || evt.clientX)
    const startY = (evt.y || evt.clientY)
    const rect = this.el.getBoundingClientRect()
    const { top, left, bottom, right } = rect

    return startX >= left && startX <= right && startY >= top && startY <= bottom
  }

  // 检查阈值
  checkThreshold() {
    const rect = this.mask.getBoundingClientRect()
    const { width, height } = rect
    const threshold = this.options.threshold
    return width > threshold && height > threshold
  }

  // 获取选中的节点
  getSelectedNodes() {
    const nodes = []
    for (let i = 0; i < this.nodeList.length; i++) {
      const node = this.nodeList[i]
      const select = node.getAttribute('data-select')
      if (select === SelectType.SELECTED) {
        nodes.push(node)
      }
    }
    const onSelect = this.options.onSelect
    if (onSelect && typeof onSelect === 'function') {
      onSelect(nodes)
    }
  }
}
