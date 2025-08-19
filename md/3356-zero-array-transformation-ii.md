### Leetcode 3356 (Medium): Zero Array Transformation II [Practice](https://leetcode.com/problems/zero-array-transformation-ii)

### Description  
Given an integer array **nums** of length n and a list of **queries**, where each query is of the form [l, r, val], each query means for the range l to r, *each value* in nums at index i (l ≤ i ≤ r) can be decremented by *at most* val (but you can choose any amount ≤ val per position, including 0, and choices are independent). After applying *k* queries in order, what is the smallest k so that nums is transformed into a **zero array** (every element is zero)? If impossible, return -1.

### Examples  

**Example 1:**  
Input: `nums = [2,0,2]`, `queries = [[0,2,1],[0,2,1],[1,1,3]]`  
Output: `2`  
*Explanation:*
- After 1st query: nums = [1,0,1] (decremented by 1 where possible)
- After 2nd query: nums = [0,0,0]
- Now all elements are 0 after 2 queries.

**Example 2:**  
Input: `nums = [3,4,5]`, `queries = [[0,1,3],[1,2,2],[0,2,1]]`  
Output: `3`  
*Explanation:*  
- After first query: nums = [0,1,5]
- After second query: nums = [0,0,3]
- After third query: nums = [0,0,2] (cannot get all zeros by 3rd query)
- Actually, with optimal choices:  
  1st: [0,1,5]  
  2nd: [0,0,3]  
  3rd: [0,0,2]  
- Since you can never get all zeros, answer is -1. *(Note: output from example walkthrough is ambiguous; see code for details.)*

**Example 3:**  
Input: `nums = [1]`, `queries = [[0,0,5]]`  
Output: `1`  
*Explanation:*
- Apply the first query: nums = . Done.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try every possible set of decrements at each step, but too slow (exponential).
- **Better (Simulation):** For each k = 1...len(queries), simulate all queries in order. For each, greedily decrement as much as possible (up to the maximum allowed).
- But simulation over the entire array for each query is too slow (O(n \* m)).
- **Optimized:** Since each range update only allows decrement per query, and decrements can be independent, use a **difference array** to efficiently apply "at most" decrements per range:
    - For a given k, can we choose the decrements to reach all zeros?
    - Use **binary search** over k: for each k, simulate the k queries with difference array (so that per-index constraint is not exceeded).
    - At each step, ensure for all i: sum of val at [l, r] (over first k queries) is ≥ nums[i].
    - So, for each position, calculate total allowed decrement after k queries and check if nums[i] ≤ sum for each i.
- **Conclusion:** Use binary search on k. For each k, build a per-index max decrement array by adding up all max decrements from first k queries that affect that index.

### Corner cases to consider  
- Empty nums or queries.
- nums already all zero.
- Impossible to reduce (insufficient total decrements).
- Overlapping or non-overlapping queries.
- One large query that covers all indices.
- Single-element array.

### Solution

```python
def minQueriesToZeroArray(nums, queries):
    n = len(nums)
    m = len(queries)
    
    # Helper: For first k queries, can we reach all zero?
    def can_achieve(k):
        decrements = [0] * (n + 1)  # difference array
        for i in range(k):
            l, r, val = queries[i]
            decrements[l] += val
            if r+1 < len(decrements):
                decrements[r+1] -= val
        applied = [0] * n
        curr = 0
        for i in range(n):
            curr += decrements[i]
            applied[i] = curr
        # For each index, allowed total decrement is applied[i]
        # If any nums[i] > applied[i], impossible in these k queries
        return all(nums[i] <= applied[i] for i in range(n))
    
    left, right = 0, len(queries)
    answer = -1
    while left < right:
        mid = (left + right) // 2
        if can_achieve(mid + 1):  # queries are 0-based, need at least k=1 means 1 query
            answer = mid + 1
            right = mid
        else:
            left = mid + 1
    if answer == -1 and can_achieve(len(queries)):
        return len(queries)
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n \* log m), where n = len(nums), m = len(queries).
    - Each binary search step (O(log m)) involves a difference array pass (O(n)).
- **Space Complexity:** O(n), for difference and applied arrays (input not counted as extra).

### Potential follow-up questions (as if you’re the interviewer)  

- What if each query *must* decrement by exactly val (not up to val)?
  *Hint: Consider what new constraints that imposes—can you still use a difference array?*

- What if queries can be processed in any order?
  *Hint: Can you rearrange to minimize k, or is it always the same as sequential?*

- What if you want to know for all k from 1 to m, which states are reachable?
  *Hint: Consider cumulative sums per prefix of queries and build an answer array for all k efficiently.*

### Summary
This problem is a classic application of **difference arrays** for efficient range updates, layered with **binary search** over queries for optimal k finding. The coding pattern—using cumulative prefix-sum techniques with binary search over an "answer boundary"—is common in problems that ask for the "minimum number of steps/operations" given some prefix properties. This exact trick (binary search on answer, difference array for range update sim) is widely useful in array update and transformation problems.

### Tags
Array(#array), Binary Search(#binary-search), Prefix Sum(#prefix-sum)

### Similar Problems
- Corporate Flight Bookings(corporate-flight-bookings) (Medium)
- Minimum Moves to Make Array Complementary(minimum-moves-to-make-array-complementary) (Medium)
- Zero Array Transformation IV(zero-array-transformation-iv) (Medium)