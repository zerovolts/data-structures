class LinkedNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }

  static fromArray(array) {
    let tempList;
    for (let i = array.length - 1; i >= 0; i--) {
      tempList = new LinkedNode(array[i]).cons(tempList || null);
    }
    return tempList;
  }

  cons(node) {
    this.next = node;
    return this;
  }

  foldl(fn, acc) {
    if (this.next == null) {
      return fn(acc, this.value);
    } else {
      return fn(this.next.foldl(fn, acc), this.value);
    }
  }

  map(fn) {
    return this.foldl((acc, cur) => new LinkedNode(fn(cur)).cons(acc), null);
  }

  filter(pred) {
    return this.foldl(
      (acc, cur) => (pred(cur) ? new LinkedNode(cur).cons(acc) : acc),
      null
    );
  }

  // to demonstrate without using foldl
  map2(fn) {
    if (this.next == null) {
      return new LinkedNode(fn(this.value));
    } else {
      return new LinkedNode(fn(this.value)).cons(this.next.map(fn));
    }
  }

  toString() {
    if (this.next == null) {
      return `${this.value}`;
    } else {
      return `${this.value}, ${this.next.toString()}`;
    }
  }
}

const ll = LinkedNode.fromArray([1, 2, 3, 4, 5, 6, 7, 8]);
const ll2 = new LinkedNode(4).cons(new LinkedNode(7).cons(new LinkedNode(9)));
console.log(
  ll
    .map(x => x * 2)
    .filter(x => x > 8)
    .foldl((acc, cur) => acc + cur, 0)
    .toString()
);
