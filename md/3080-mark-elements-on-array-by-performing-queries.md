### Leetcode 3080 (Medium): Mark Elements on Array by Performing Queries [Practice](https://leetcode.com/problems/mark-elements-on-array-by-performing-queries)

### Description  
Given a 0-indexed array **nums** of size n (all positive integers), and an array **queries** of shape m × 2, where queries[i] = [indexᵢ, kᵢ]:  
- All nums elements start as **unmarked**.
- For each query:
  1. Mark nums[indexᵢ] if it’s not already marked.
  2. Mark kᵢ unmarked elements with the smallest values (ties by smallest index). If there are fewer than kᵢ unmarked elements, mark all.
- After each query, record the sum of currently **unmarked** elements.  
Return an array answer, where answer[i] is the sum of unmarked elements after the iᵗʰ query.

### Examples  

**Example 1:**  
Input: `nums = [1,4,2,3]`, `queries = [[0,1],[2,2],[1,1]]`  
Output: `[9, 6, 0]`  
*Explanation:*
- Query 1: Mark index 0 → [X,4,2,3]. Mark 1 unmarked with smallest value (index 2: value 2) → [X,4,X,3]. Unmarked sum: 4+3=7.
- *Start sum was 1+4+2+3=10, but marking index 0 only, then marking index 2 (the next smallest).*
- Return unmarked sum after each query.

**Example 2:**  
Input: `nums = [5,2,7]`, `queries = [[2,3],[1,0]]`  
Output: `[0,0]`  
*Explanation:*
- Query 1: Mark 2; mark 3 unmarked with smallest values: mark all (indexes 1 and 0). Unmarked sum: 0.
- Query 2: All already marked, sum is 0.

**Example 3:**  
Input: `nums = [8,6,5,1,7]`, `queries = [[2,1],[3,2],[1,2]]`  
Output: `[22, 13, 0]`  
*Explanation:*
- Query 1: Mark 2 → [8,6,X,1,7]. Mark 1 smallest unmarked (index 3: value 1) → [8,6,X,X,7]. Unmarked sum: 8+6+7=21.
- Query 2: Mark 3 already marked. Mark 2: 6,7 (indexes 1,4) → [8,X,X,X,X]. Unmarked sum: 8.
- Query 3: etc.

### Thought Process (as if you’re the interviewee)  
Brute-force Idea:  
- For each query, mark the specified index.
- Then loop through to find kᵢ smallest unmarked elements, update marked set.
- After each query, sum up all unmarked elements.

Optimization:  
- Finding the kᵢ smallest unmarked elements is the slow part.  
- Use a min-heap (priority queue) to always access the next-smallest unmarked element efficiently.
- Keep a boolean array (or set) to track which indices are marked.
- On each query:  
  1. Mark query index if not yet marked, adjust current unmarked sum.
  2. While kᵢ > 0, pop off the smallest (by value, then by index) from the heap—if it's still unmarked, mark it and decrement kᵢ.

Trade-offs:
- Heap gives O(log n) operations, but we may pop marked elements several times (if already marked).
- Simulation is acceptable as m, n are not huge (from context), and this is a medium-level problem.

Final: Use heap for efficient smallest extraction and set/array for fast marking check.  
Precompute total sum, decrement as elements get marked for efficient unmarked sum calculation.

### Corner cases to consider  
- All elements are marked before last query  
- kᵢ > available unmarked elements  
- Duplicate values and tiebreaking by smaller index  
- Query on already-marked index  
- nums length = 1  
- nums contains all the same value  
- Empty nums or queries (should not happen by constraints)  

### Solution

```python
import heapq

def unmarked_sum_after_queries(nums, queries):
    n = len(nums)
    m = len(queries)
    
    # Heap of (value, index) for unmarked status check and tiebreak
    heap = [(nums[i], i) for i in range(n)]
    heapq.heapify(heap)
    
    marked = [False] * n
    total_unmarked = sum(nums)
    
    res = []
    
    for index, k in queries:
        # Mark index if not already
        if not marked[index]:
            marked[index] = True
            total_unmarked -= nums[index]
        
        # Mark k unmarked smallest elements
        to_mark = k
        while to_mark > 0 and heap:
            # Get next min
            val, idx = heapq.heappop(heap)
            if marked[idx]:
                continue
            marked[idx] = True
            total_unmarked -= val
            to_mark -= 1
        
        res.append(total_unmarked)
    
    return res

```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Heap initialization: O(n)  
  - For each of m queries, in worst case could pop up to n elements (if k is large), but in total we pop at most n elements (each index pops at most once).  
  - So overall O(n + m + n log n) = O((n + m) log n)

- **Space Complexity:**  
  - O(n) for heap, O(n) for marked array, O(m) for output.  
  - So total O(n + m)

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle dynamic updates to nums (e.g., elements can be added or removed)?
  *Hint: Consider a data structure that allows efficient insertion/removal (e.g., balanced BST or Treap).*

- What if the queries had a range to mark, instead of a single index?
  *Hint: Would a segment tree help?*

- Can you modify the code to print the indices of the elements that were marked in each query?
  *Hint: Track the extra information as you mark elements.*

### Summary
This is a **heap-based simulation** problem, combining array scanning, marking, and efficient smallest retrieval.  
The key pattern is min-heap + boolean marking, which also appears in "Kth smallest in matrix," set/priority queue problems, and scenarios where frequent queries require efficiently updating/removing/selecting minimal elements under constraints.

### Tags
Array(#array), Hash Table(#hash-table), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue), Simulation(#simulation)

### Similar Problems
