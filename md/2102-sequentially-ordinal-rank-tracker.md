### Leetcode 2102 (Hard): Sequentially Ordinal Rank Tracker [Practice](https://leetcode.com/problems/sequentially-ordinal-rank-tracker)

### Description  
Design a system that **tracks locations with associated scores and names**.  
- There are two operations:
  - **add(name, score):** adds a location.
  - **get():** returns the name of the kᵗʰ best location, where k is the number of times get() has been called so far.
- Rankings:
  - Locations are ranked by **highest score first**.
  - If multiple have the same score, use **lex smallest name**.

Example: After 3 adds and 2 gets, the third get asks for the location ranked third so far.

### Examples  

**Example 1:**  
Input:  
add("bradford", 2),  
add("chester", 2),  
add("orlando", 3),  
get(),  
get(),  
add("abbey", 2),  
get()
Output:  
"orlando",  
"bradford",  
"chester"  
*Explanation:*
- "orlando" has highest score 3.  
- "bradford" and "chester" tie (score 2), "bradford" < "chester" lex order.
- After 3 adds: get() → "orlando" (1ˢᵗ), get() → "bradford" (2ⁿᵈ), add("abbey", 2) (now 3 locations rank 2), get() → "chester" (3ʳᵈ: "abbey" < "bradford" < "chester" for score 2).

**Example 2:**  
Input:  
add("lake", 1),  
get(),  
add("mona", 3),  
get(),  
add("niagara", 2),  
get()
Output:  
"lake",  
"mona",  
"niagara"  
*Explanation:*  
- After adding "lake", get() → "lake".
- add "mona" (score 3), get() → "mona".
- add "niagara" (2), get() → "niagara".

**Example 3:**  
Input:  
add("alpha", 5),  
add("beta", 5),  
add("gamma", 5),  
get(),  
get(),  
get()
Output:  
"alpha",  
"beta",  
"gamma"  
*Explanation:*  
- All have same score. Lexical order: "alpha", "beta", "gamma".

### Thought Process (as if you’re the interviewee)  
- **Naive:**  
  - On each get(), sort all entries by (−score, name) and return kᵗʰ.  
  - But sorting is O(n log n) per get; not efficient for large input.
- **Efficient:**  
  - Need a data structure to maintain k-best elements efficiently as gets are called.
  - Use two heaps:
    - **Left heap:** A min-heap of the top k elements (with worst among the top k at its root).
    - **Right heap:** A max-heap (reverse order) for the rest.
  - add(name, score): Insert into left heap, then push excess to right heap if needed.
  - get(): Pop from right heap into left heap and increment k.
- This method keeps left heap at size k and maintains the correct kᵗʰ best element at the top, giving O(log k) per operation.

### Corner cases to consider  
- Multiple locations with same score: lex smallest name should win.
- New location with rank above/between/below existing ones.
- Performing get() before any add() (shouldn’t happen in problem constraint, but worth considering).
- Add after several get()s: order of locations remains correct.
- Large number of duplicate names (if constraint allows).

### Solution

```python
import heapq

class SORTracker:
    def __init__(self):
        # Max heap for the left k locations: store negative score for max heap
        # Each entry: (-score, name)
        self.left = []   # Max heap: k best so far
        # Min heap for the rest: store (score, name)
        self.right = []  # Min heap: rest
        # k: number of times get() called so far
        self.k = 0

    def add(self, name: str, score: int) -> None:
        # First, push new location to left (as max-heap: -score)
        heapq.heappush(self.left, (-score, name))
        # Balance: if size of left > k, move one to right heap
        if len(self.left) > self.k + 1:
            sc, nm = heapq.heappop(self.left)
            # Right heap: min-heap uses (score, name) 
            heapq.heappush(self.right, (-sc, nm))

    def get(self) -> str:
        # Increment k: now looking for kᵗʰ best
        self.k += 1
        # Move one best from right to left to maintain k+1 in left
        if self.right:
            sc, nm = heapq.heappop(self.right)
            heapq.heappush(self.left, (-sc, nm))
        # Sought name is always at top of left heap
        return self.left[0][1]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Each add(): O(log k) as we heap-push and possibly pop-and-push between two heaps.
  - Each get(): O(log k) for balancing heaps.
  - So, operations are O(log k) time, where k is number of get() calls so far.

- **Space Complexity:**  
  - O(n) total for storing all added locations (left + right heaps).

### Potential follow-up questions (as if you’re the interviewer)  

- What if locations can be removed by name and score?  
  *Hint: Maintaining both heaps may need delayed deletions or additional mapping.*

- How do you handle duplicate names with possibly different scores?  
  *Hint: Clarify constraints, and use (name, score) pairs as unique keys if allowed.*

- If get() needs to provide not just the name, but the full info (name and score)?  
  *Hint: Heaps can simply return (name, score) tuples rather than names only.*

### Summary
This problem is a classic example of **online rank tracking** using the double heap pattern.  
By always keeping the best k elements (by score & lex order) in a max-heap and the rest in a min-heap, we can support fast incremental rank retrieval.  
This pattern is common in problems needing real-time top-k queries, like finding the kᵗʰ largest/smallest element or streaming median.  
The key insight is careful heap balancing on both add and get.


### Flashcard
Maintain two heaps: a min-heap for the top k locations and a max-heap for the rest; on each get(), return the root of the min-heap and rebalance as needed for O(log n) add and O(log n) get.

### Tags
Design(#design), Heap (Priority Queue)(#heap-priority-queue), Data Stream(#data-stream), Ordered Set(#ordered-set)

### Similar Problems
- Find Median from Data Stream(find-median-from-data-stream) (Hard)
- Kth Largest Element in a Stream(kth-largest-element-in-a-stream) (Easy)
- Finding MK Average(finding-mk-average) (Hard)