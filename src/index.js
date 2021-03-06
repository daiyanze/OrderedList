export default class OrderedList {
  
  constructor(arrOfObj, idAttr = 'id') {
    this.idAttr = idAttr
    this.data = this.makeOrderedMap(arrOfObj)
  }

  makeOrderedMap(arrOfObj) {
    const data = []
    if (
      arrOfObj &&
      arrOfObj instanceof Array &&
      arrOfObj[0] instanceof Object
    ) {
      for (const a of arrOfObj) {
        const i = a[this.idAttr]
        if (i !== undefined) {
          data.push([i, a])
        }
      }
    }
    return Object.freeze(new Map(data))
  }

  get values() {
    return Array.from(this.data.values())
  }
  
  get keys() {
    return Array.from(this.data.keys())
  }
  
  get size() {
    return this.data.size
  }
  
  get length() {
    return this.size
  }
  
  get first() {
    return this.values[0]
  }
  
  get last() {
    return this.values[this.size - 1]
  }

  findOne(index) {
    return this.data.get(index)
  }

  findList(arrOfIndexes) {
    const res = []
    for (const i of arrOfIndexes) {
      const item = this.data.get(i)
      if (item) {
        res.push(item)
      }
    }
    return res
  }

  // Insert one piece of data to the given position
  insertOne(obj, idx) {
    if (
      obj.hasOwnProperty(this.idAttr) &&
      !isNaN(idx) &&
      idx >= 0
    ) {
      const clone = [...this.values]
      clone.splice(idx, 0, obj)
      this.data = this.makeOrderedMap(clone)
    }
    return this
  }
  
  unshift(arrOfObj) {
    if (arrOfObj) {
      this.data = this.makeOrderedMap(arrOfObj.concat(this.values))
    }
    return this
  }
  
  push(arrOfObj) {
    if (arrOfObj) {
      this.data = this.makeOrderedMap(this.values.concat(arrOfObj))
    }
    return this
  }
  
  update(arrOfObj) {
    if (arrOfObj) {
      for (const a of arrOfObj) {
        if (this.data.get(a[this.idAttr])) {
          this.data.set(a[this.idAttr], a)
        }
      }
    }
    return this
  }
  
  remove(arrOfIndexes) {
    if (!arrOfIndexes) {
      this.data.clear()
    } else {
      for (const id of arrOfIndexes) {
        this.data.delete(id)
      }
    }
    return this
  }
  
  mutateBy(cb, args = {}) {
    if (cb) {
      const data = cb.call(null, this, args)
      if (data instanceof Array) {
        this.data = this.makeOrderedMap(data) 
      }
    }
    return this
  }
}