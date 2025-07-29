### Leetcode 3526 (Hard): Range XOR Queries with Subarray Reversals [Practice](https://leetcode.com/problems/range-xor-queries-with-subarray-reversals)

### Description  
You are given an integer array **nums** of length n and a list of **queries**. Each query is one of:
- **[1, index, value] — Update:** Set nums[index] = value.
- **[2, left, right] — Range XOR Query:** Compute the XOR of the subarray nums[left..right] and record the result.
- **[3, left, right] — Reverse Subarray:** Reverse the subarray nums[left..right] in-place.

Return an array with the results of all "Range XOR Query" queries, in the order they appeared.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,4,5]`, `queries = [[2,1,3],[1,2,10],[3,0,4],[2,0,4]]`  
Output: `[5, 8]`  
*Explanation:  
- Query 1: [2,1,3] → XOR(nums[1:4]) = 2⊕3⊕4 = 5  
- Query 2: [1,2,10] → nums = [1,2,10,4,5]  
- Query 3: [3,0,4] → Reverse nums[0:5] → [5,4,10,2,1]  
- Query 4: [2,0,4] → XOR(nums[0:5]) = 5⊕4⊕10⊕2⊕1 = 8*

**Example 2:**  
Input: `nums = [0,1,2,3,4,5]`, `queries = [[3,1,4],[2,1,4],[1,0,100],[2,0,2]]`  
Output: `[2, 102]`  
*Explanation:  
- Reverse nums[1:5] → [0,5,4,3,2,1]  
- XOR(nums[1:5]) = 5⊕4⊕3⊕2 = 2  
- Update nums=100 → [100,5,4,3,2,1]  
- XOR(nums[0:3]) = 100⊕5⊕4 = 102*

**Example 3:**  
Input: `nums = `, `queries = [[2,0,0],[1,0,0],[3,0,0],[2,0,0]]`  
Output: `[7,0]`  
*Explanation:  
- XOR(nums[0:1]) = 7  
- Set nums=0  
- Reverse nums[0:1] is a no-op  
- XOR(nums[0:1]) = 0*

### Thought Process (as if you’re the interviewee)  
The brute-force approach is to process each query in order:
- For **update**, set nums[index]=value.
- For **range XOR**, loop from left to right and compute the XOR.
- For **reverse**, reverse the segment in-place.

This works, but doing a range XOR query naively costs O(n) time per query, which is too slow if there are many queries.

To optimize, typically, for static XOR range queries, we can use a prefix XOR array to get O(1) range queries. However, the presence of updates and especially **reversals** invalidates static pre-computation.

For both updates and reversals, the array changes. Neither a simple prefix XOR nor a Segment Tree supports **reversals** efficiently. But we can use a data structure like a Splay Tree or Treap (implicit key tree with range operations), which can:
- Apply range reverse in O(log n) via lazy propagation,
- Support range XOR queries and point updates in O(log n),
- Maintain array order.

A segment tree by itself cannot efficiently support subarray reversal, so an implicit Treap (or Splay Tree) is the best approach here.

Trade-off: Implementation is more complex, but necessary for strong query times.

### Corner cases to consider  
- Reversing a subarray of length 1 (no effect).
- Updating the same element multiple times.
- Multiple reversals that overlap or undo each other.
- Range queries with left = right (just one element).
- Empty query list (no-op).
- All nums are zero, or all equal values.

### Solution

```python
# We use an implicit Treap for efficient reverse and range xor.
# Each Treap node maintains its value, subtree xor, subtree size, and a reverse flag.

import random

class TreapNode:
    def __init__(self, val):
        self.val = val
        self.prio = random.randint(1, 1 << 30)
        self.left = None
        self.right = None
        self.size = 1
        self.subtree_xor = val
        self.rev = False  # mark for lazy reverse

def update(node):
    if node is None:
        return
    node.size = 1
    node.subtree_xor = node.val
    if node.left:
        node.size += node.left.size
        node.subtree_xor ^= node.left.subtree_xor
    if node.right:
        node.size += node.right.size
        node.subtree_xor ^= node.right.subtree_xor

def push(node):
    if node and node.rev:
        node.left, node.right = node.right, node.left
        if node.left:
            node.left.rev ^= True
        if node.right:
            node.right.rev ^= True
        node.rev = False

def split(node, k):
    if not node:
        return (None, None)
    push(node)
    lsize = node.left.size if node.left else 0
    if k <= lsize:
        left, right = split(node.left, k)
        node.left = right
        update(node)
        return (left, node)
    else:
        left, right = split(node.right, k - lsize - 1)
        node.right = left
        update(node)
        return (node, right)

def merge(a, b):
    if not a or not b:
        return a or b
    if a.prio > b.prio:
        push(a)
        a.right = merge(a.right, b)
        update(a)
        return a
    else:
        push(b)
        b.left = merge(a, b.left)
        update(b)
        return b

def insert(node, k, newnode):
    left, right = split(node, k)
    return merge(merge(left, newnode), right)

def set_value(node, idx, val):
    # Set value at idx to val
    l1, r1 = split(node, idx)
    l2, r2 = split(r1, 1)
    if l2:
        l2.val = val
    update(l2)
    node = merge(merge(l1, l2), r2)
    return node

def query_xor(node, l, r):
    l1, r1 = split(node, l)
    l2, r2 = split(r1, r - l + 1)
    res = l2.subtree_xor if l2 else 0
    node = merge(merge(l1, l2), r2)
    return res, node

def reverse(node, l, r):
    l1, r1 = split(node, l)
    l2, r2 = split(r1, r - l + 1)
    if l2:
        l2.rev ^= True
    node = merge(merge(l1, l2), r2)
    return node

def build_treap(arr):
    root = None
    for x in arr:
        node = TreapNode(x)
        root = merge(root, node)
    return root

def range_xor_queries_with_subarray_reversals(nums, queries):
    res = []
    root = build_treap(nums)
    for q in queries:
        if q[0] == 1:
            # Update: set nums[idx] = val
            idx, val = q[1], q[2]
            root = set_value(root, idx, val)
        elif q[0] == 2:
            # Query: xor nums[l..r]
            l, r = q[1], q[2]
            ans, root = query_xor(root, l, r)
            res.append(ans)
        elif q[0] == 3:
            # Reverse nums[l..r]
            l, r = q[1], q[2]
            root = reverse(root, l, r)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  Each operation (update, range xor query, reverse) is O(log n) amortized due to the Treap's properties.  
  For q queries: O(q log n).

- **Space Complexity:**  
  O(n) for the Treap nodes (each original array element maps to one node).  
  Plus O(q) for storing result answers.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you implement this using a purely functional data structure?  
  *Hint: Consider persistent segment trees or treaps to allow time-travel queries.*

- How would you handle these operations if the array was immutable?  
  *Hint: Prefix XOR arrays are sufficient when there are no updates or reversals.*

- Is it possible to process all operations offline (i.e., knowing all queries at the start)?  
  *Hint: Data structures like offline Mo's algorithm might help but are tricky with reversals and updates.*

### Summary
This problem uses the advanced **implicit Treap** pattern, capable of supporting range queries, range modification (reverse), and point updates efficiently.  
It demonstrates lazy propagation, ordered splits, and the power of randomized BSTs for array-like modifications under complex operations.  
Similar data structures and ideas may be applied to range sum queries with reversals, substring manipulations, and ordered set problems where order and range operations must co-exist.