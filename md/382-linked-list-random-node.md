### Leetcode 382 (Medium): Linked List Random Node [Practice](https://leetcode.com/problems/linked-list-random-node)

### Description  
You're given the head of a singly linked list. You need to implement a class with two methods:
- `__init__(head)`: initializes the object with the head of the linked list.
- `getRandom()`: returns a random node’s value from the list. Each node must have an equal probability of being chosen, and the function may be called many times.

This problem tests your ability to generate uniform randomness efficiently using only the linked list structure (with no array conversion).

### Examples  

**Example 1:**  
Input: `head = [1,2,3]`, then several calls to `getRandom()`  
Output: `1` or `2` or `3`  
Explanation. Each call should randomly return any node value with a 1/3 chance.

**Example 2:**  
Input: `head = `, single call to `getRandom()`  
Output: `42`  
Explanation. Only one node exists, so it’s always chosen.

**Example 3:**  
Input: `head = [7,7,7,7]`, call `getRandom()`  
Output: `7`  
Explanation. All node values are the same, so whatever node is picked, the output is always 7.

### Thought Process (as if you’re the interviewee)  

- **Naive (Brute-force) solution:**  
  At first, convert the linked list into an array and each `getRandom()` just picks a random index in that array. The benefit is fast `O(1)` access; however, this uses `O(n)` extra space, which can be suboptimal if the list is huge.

- **Optimized Solution — Reservoir Sampling:**  
  Instead, we can use *reservoir sampling* to select a random node in a single pass and `O(1)` space.  
  The idea:  
    - Start traversing the list.
    - For every iᵗʰ node (starting at 1), choose its value with probability 1/i.
    - At the end, the last value picked is uniformly random over all nodes.
  - This elegant approach only needs to keep track of the current candidate and the number of nodes traversed.

  **Why not store the length and use it?**  
  If you precompute the length, you can generate a random index and do one more traversal to pick that node. But this also costs an extra pass for each random selection, or you need to store the length up front.

  **Trade-offs:**  
  - Converting to array gives O(1) queries but uses O(n) extra space.
  - Reservoir sampling: O(n) time per query, O(1) space, no prior knowledge of n needed.

### Corner cases to consider  
- The list contains only one node.
- All elements in the list are the same value.
- List contains negative, zero, or very large/small values.
- The random generator is called a very large number of times (repeated uniformity).
- Many calls to `getRandom()` without modifying the list between calls.

### Solution

```python
import random

class Solution:
    def __init__(self, head):
        # Store the head of the linked list
        self.head = head

    def getRandom(self):
        # Reservoir sampling: one-pass, O(1) space
        curr = self.head
        result = curr.val  # Initial selection is head's value
        count = 1

        while curr:
            # Pick with 1/count probability
            if random.randint(1, count) == 1:
                result = curr.val
            curr = curr.next
            count += 1

        return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  Each call to `getRandom()` traverses the list once: O(n), where n is the number of nodes.

- **Space Complexity:**  
  O(1) extra space. Only a few variables are used, regardless of the list size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify your code if the linked list is extremely long, but you need much faster (constant-time) random queries?
  *Hint: Consider trading space for speed; maybe store nodes in an array.*

- What if insertions and deletions happen frequently in the list? How would you still support random node selection efficiently?
  *Hint: You may need a different data structure or update your storage strategy after each list change.*

- Can you generalize your approach to select k random nodes (sampling without replacement)?
  *Hint: Research k-reservoir sampling.*

### Summary
The main coding pattern here is **reservoir sampling**, which is ideal for uniform random selection from a stream (or linked list) without knowing the length up front. This pattern is extremely useful in single-pass algorithms, especially with big data, where storing the entire data in memory isn't feasible (e.g. streaming data, sampling huge logs, shuffling playlists, etc.). Reservoir sampling ensures all elements are equally likely to be picked with only O(1) space.


### Flashcard
Use reservoir sampling to select a random node in one pass with O(1) space, ensuring each node is equally likely.

### Tags
Linked List(#linked-list), Math(#math), Reservoir Sampling(#reservoir-sampling), Randomized(#randomized)

### Similar Problems
- Random Pick Index(random-pick-index) (Medium)