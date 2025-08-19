### Leetcode 406 (Medium): Queue Reconstruction by Height [Practice](https://leetcode.com/problems/queue-reconstruction-by-height)

### Description  
Given a shuffled array `people` where each person is described as `[h, k]`:
- `h` — the person's height,
- `k` — the number of people in front of them who have a height greater than or equal to `h`,

reconstruct the original queue. You must return the queue as a list ordered by these constraints, so for every person, there are exactly `k` people in front with height ≥ `h`.

### Examples  

**Example 1:**  
Input: `[[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]`  
Output: `[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]`  
*Explanation:  
- Place tallest people first (so their position isn't affected by shorter ones).
- Insert each person at the index matching their 'k' value.
- Step by step insertions:  
  Start with [], insert [7,0] → [[7,0]]  
  Insert [7,1] at index 1 → [[7,0],[7,1]]  
  Insert [6,1] at index 1 → [[7,0],[6,1],[7,1]]  
  Insert [5,0] at index 0 → [[5,0],[7,0],[6,1],[7,1]]  
  Insert [5,2] at index 2 → [[5,0],[7,0],[5,2],[6,1],[7,1]]  
  Insert [4,4] at index 4 → [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]  
  The queue matches the conditions for each [h, k].  
*

**Example 2:**  
Input: `[[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]`  
Output: `[[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]`  
*Explanation:  
- Tallest is [6,0] → insert at index 0.  
- Next, [5,0] → insert at index 0.  
- [4,0] → insert at index 0.  
- [3,2] → insert at index 2.  
- [2,2] → insert at index 2.  
- [1,4] → insert at index 4.  
  Each person ends up with the correct number of taller/equal people in front.  
*

**Example 3:**  
Input: `[[5,0]]`  
Output: `[[5,0]]`  
*Explanation: Only one person, so the queue is unchanged.*

### Thought Process (as if you’re the interviewee)  
Brute-force:  
- Try all possible permutations; for each, count for every person if there are exactly `k` taller or equally tall people in front.  
- Clearly infeasible (factorial time).

Optimized/Greedy:  
- **Sort people by height descending, and for equal heights, by `k` ascending.**
  - Why? Tallest people's final position doesn't depend on shorter people's positions.
- Build queue by inserting each person at the index specified by their `k` value.
  - This ensures for any current person, in the partial queue, there are exactly `k` people >= their height before them.

Trade-offs:
- Inserting into a list at arbitrary indices is O(n), but total is acceptable for n ≤ 2000.

### Corner cases to consider  
- Empty input array (should return empty queue).
- Only one element.
- All persons have the same height (sorting fallback on `k`).
- All persons have `k=0`.
- High duplication in `[height, k]`.
- Maximum constraints (test performance).

### Solution

```python
def reconstructQueue(people):
    # Sort: Tallest first; for ties, smallest k first
    people.sort(key=lambda x: (-x[0], x[1]))
    queue = []
    for person in people:
        # Insert person at index = person's k
        queue.insert(person[1], person)
    return queue
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  - Sorting takes O(n log n).
  - Each insert into the list at an index may cost O(n), repeated n times → O(n²).
- **Space Complexity:** O(n)  
  - Output queue and input space.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could not use list insertions (for linked-list or immutable structures)?  
  *Hint: Think of segment trees or BITs for efficient placement by index.*

- Can this be done in O(n log n) time?  
  *Hint: Consider balancing insertions or alternative data structures.*

- How would you prove correctness or provide invariants for this approach?  
  *Hint: Tallest people never get extra taller people in front by being inserted first; the induction step preserves conditions.*

### Summary
This problem uses a **Greedy / Insertion sort** pattern: sort an array by main criteria, then insert each element at a position satisfying problem-specific invariants.  
The trick is to sort to decouple dependencies (tallest-first) and handle insertion placements accordingly.  
Similar ideas can be applied in other order-reconstruction problems where later elements' positions depend on the prior state, like building paper stacks, schedule synthesizing, or stable seating plans.

### Tags
Array(#array), Binary Indexed Tree(#binary-indexed-tree), Segment Tree(#segment-tree), Sorting(#sorting)

### Similar Problems
- Count of Smaller Numbers After Self(count-of-smaller-numbers-after-self) (Hard)
- Reward Top K Students(reward-top-k-students) (Medium)