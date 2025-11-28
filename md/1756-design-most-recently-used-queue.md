### Leetcode 1756 (Medium): Design Most Recently Used Queue [Practice](https://leetcode.com/problems/design-most-recently-used-queue)

### Description  
Design a queue-like data structure called **MRUQueue** ("Most Recently Used Queue") that contains elements **1** to **n** in order.  
- The class should support two operations:  
  - **MRUQueue(n):** Initialize the queue with values `[1, 2, ..., n]`.  
  - **fetch(k):** Fetch the kᵗʰ element in the queue (1-indexed), move it to the end (making it most recently used), and return it.

For every fetch(k) call:  
- Remove the kᵗʰ element from its current position.  
- Append it to the end.  
- Return its value.  
Elements retain their value and identity, only their order changes over fetches.  
Try to design your solution to be efficient even for many such fetch operations.

### Examples  

**Example 1:**  
Input:  
```
MRUQueue(8)
fetch(3)
fetch(5)
fetch(2)
fetch(2)
```
Output:  
```
3
6
2
4
```
*Explanation:*  
- Start with [1, 2, 3, 4, 5, 6, 7, 8].  
- fetch(3): Element 3 → move to end ⇒ [1, 2, 4, 5, 6, 7, 8, 3].  
- fetch(5): Element 6 → move to end ⇒ [1, 2, 4, 5, 7, 8, 3, 6].  
- fetch(2): Element 2 → move to end ⇒ [1, 4, 5, 7, 8, 3, 6, 2].  
- fetch(2): Element 4 → move to end ⇒ [1, 5, 7, 8, 3, 6, 2, 4].

**Example 2:**  
Input:  
```
MRUQueue(2)
fetch(2)
fetch(1)
```
Output:  
```
2
1
```
*Explanation:*  
- Start with [1, 2].  
- fetch(2): Element 2 → move to end (no actual change, since it's already at end).  
- fetch(1): Element 1 → move to end ⇒ [2, 1].

**Example 3:**  
Input:  
```
MRUQueue(3)
fetch(1)
fetch(2)
fetch(2)
```
Output:  
```
1
2
3
```
*Explanation:*  
- [1, 2, 3] → fetch(1): 1 moves to end ⇒ [2, 3, 1]  
- fetch(2): Element 3 → move to end ⇒ [2, 1, 3]  
- fetch(2): Element 1 → move to end ⇒ [2, 3, 1]


### Thought Process (as if you’re the interviewee)  

First, I notice that the brute-force approach is straightforward:  
- Maintain a list for the queue.  
- To fetch(k), pop the (k-1)ᵗʰ item and append it to the end, then return it.

This works but each fetch(k) is **O(n)** in the worst case due to popping from arbitrary index and inserting at end, and can be inefficient if there are many fetch calls and large n.

To improve, since the core operation is "move kᵗʰ element to the end", we need to find the kᵗʰ item quickly and maintain fast updates.  
- We can use **square root decomposition** by keeping elements in buckets/chunks of about √n each.
- When we fetch(k), we can quickly find which chunk contains the kᵗʰ item (because total size per chunk is known, chunk sizes are roughly balanced).
- Remove the item from its chunk, append to a "last bucket" at the end, and rebalance if needed.

This brings fetch(k) to *O(√n)* due to chunk traversal and local rebalancing, a great improvement.

Further optimization is possible using advanced data structures (balanced BST, Binary Indexed Tree + array), but sqrt-decomposition is efficient, easier to code, and widely applicable.

Trade-offs:
- Simple array/list: trivial but O(n) per fetch.
- Sqrt decomposition: ~O(√n) per operation, code is more complex, but handles up to 2000 fetches and n ≤ 2×10⁴ easily.


### Corner cases to consider  
- n = 1 or very small queue.
- k = 1 or k = n (fetching first or last).
- Multiple repeated fetch on same position.
- Fetch always at end or always at front.
- Long sequence of fetches so chunks may need rebalancing.
- Ensure items are not duplicated or lost after many fetches.


### Solution

```python
class MRUQueue:

    def __init__(self, n: int):
        # Square root decomposition: initialize buckets/chunks
        self.bucket_size = int(n ** 0.5) + 1
        self.buckets = []
        vals = [i+1 for i in range(n)]
        for i in range(0, n, self.bucket_size):
            self.buckets.append(vals[i:i+self.bucket_size])

    def fetch(self, k: int) -> int:
        k -= 1  # convert to 0-based
        # Find which bucket contains the k-th element
        for b in self.buckets:
            if k < len(b):
                res = b.pop(k)
                break
            else:
                k -= len(b)
        # Put the fetched element at the end
        self.buckets[-1].append(res)
        # After each op, rebalance if last bucket is too large
        for i in range(len(self.buckets)-1, 0, -1):
            if len(self.buckets[i]) > self.bucket_size * 2:
                # Move overflow to new bucket
                overflow = self.buckets[i][self.bucket_size:]
                self.buckets[i] = self.buckets[i][:self.bucket_size]
                self.buckets.append(overflow)
        # Optional: clean up small empty buckets in front
        if self.buckets[0] == []:
            self.buckets.pop(0)
        return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - **Constructor:** O(n) (splitting elements into buckets).
  - **fetch(k):** O(√n) to find the right bucket, pop, and possibly rebalance. Each fetch will at worst traverse all buckets, but since there are about √n buckets, it's much faster than O(n).
- **Space Complexity:**  
  - O(n): Just stores the elements plus bucket overhead. No extra structures beyond that.


### Potential follow-up questions (as if you’re the interviewer)  

- What if elements were not unique, could your structure support that?
  *Hint: How would you identify and move the correct instance among duplicates?*

- Can you support removing the most recently used element efficiently?
  *Hint: Since the end is the most recent, what changes in the data structure if you allow true deletions?*

- How would you adapt your solution if fetch was by value, not position?
  *Hint: Would a hashmap help here?*


### Summary
This is a classic case of applying the **sqrt decomposition (chunked array)** pattern for efficiently managing queries that require random access and frequent reordering.  
- The same approach (buckets/chunks) is common for dynamic lists with moving/removing/inserting operations, like in "block linked lists", dequeue operations, or problems like "LRU cache" where usage order matters.
- It trades a little complexity and extra space for big improvements in runtime, and is a very practical design for "access and move" or "frequency-lists" tasks.


### Flashcard
Use a balanced BST or order statistic tree to support O(log n) fetch(k) and move-to-end operations for the MRU queue.

### Tags
Array(#array), Linked List(#linked-list), Divide and Conquer(#divide-and-conquer), Design(#design), Simulation(#simulation), Doubly-Linked List(#doubly-linked-list)

### Similar Problems
- LRU Cache(lru-cache) (Medium)