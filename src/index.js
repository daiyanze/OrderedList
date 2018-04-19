export default class Modelizr {
  
  constructor(arrOfObj, idAttr = 'id') {
    this.data = this.makeOrderedMap(arrOfObj)
    this.idAttr = idAttr
  }

  makeOrderedMap(arrOfObj) {
    const data = arrOfObj.map(a => [a[this.idAttr], a])
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
  
  unshift(arrOfObj) {
    this.data = this.makeOrderedMap(arrOfObj.concat(this.values))
    return this
  }
  
  push(arrOfObj) {
    this.data = this.makeOrderedMap(this.values.concat(arrOfObj))
    return this
  }
  
  update(arrOfObj) {
    for (const a of arrOfObj) {
      if (this.data.get(a[this.idAttr])) {
        this.data.set(a[this.idAttr], a)
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
  
  mutateBy(cb) {
    if (cb) {
      const data = cb.apply(null, this, {})
      if (data.length) {
        this.data = this.makeOrderedMap(data) 
      }
    }
    return this
  }
}