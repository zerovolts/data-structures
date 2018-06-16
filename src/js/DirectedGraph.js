class DirectedGraph {
  constructor(nodeList) {
    this.currentId = 0;
    this.nodes = new Map();

    if (nodeList) {
      nodeList.forEach(node => {
        this.addNode(node);
      });
    }
  }

  newId() {
    return this.currentId++;
  }

  addNode(node) {
    const id = this.newId();
    this.nodes.set(id, node);
    return id;
  }

  getNode(id) {
    return this.nodes.get(id);
  }

  distance(startId, endId) {}

  bfs(startId) {
    const queue = [];
    const visited = [];
    queue.push(startId);

    while (queue.length > 0) {
      const element = queue.shift();
      visited.push(element);
      this.getNode(element).children.forEach(id => {
        if (!visited.includes(id)) {
          queue.push(id);
        }
      });
    }

    return visited;
  }

  dfs(rootId, visited = []) {
    const node = this.getNode(rootId);
    visited.push(rootId);

    const children = [].concat.apply(
      [],
      node.children
        .filter(id => !visited.includes(id))
        .map(id => this.dfs(id, visited))
    );

    if (children.length > 0) {
      return [node.value, ...children];
    } else {
      return [node.value];
    }
  }

  toString(rootId) {
    rootId = rootId ? rootId : this.nodes.keys().next().value;
    return this.dfs(rootId).join(", ");
  }
}

class Node {
  constructor(value, children) {
    this.value = value;
    this.children = children;
  }
}

const g = new DirectedGraph();
g.addNode(new Node("zach", [1, 3]));
g.addNode(new Node("hex", []));
g.addNode(new Node("zero", [0, 1, 4]));
g.addNode(new Node("kagrenac", [1, 4]));
g.addNode(new Node("wamuu", [0, 2]));

console.log(g.bfs(0));
