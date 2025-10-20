### Leetcode 307 (Medium): Range Sum Query - Mutable [Practice](https://leetcode.com/problems/range-sum-query-mutable)

### Description  
You are given an integer array nums. Your task is to design a class that efficiently supports two types of operations:  
- **update(index, val):** Update the value of nums at the given index to val.  
- **sumRange(left, right):** Return the sum of the elements of nums within the indices left and right inclusive.

Both operations need to be efficient because there can be a lot of updates and queries, and the array size can be large.  
This is a classic case for efficiently handling dynamic range queries and updates, such as in financial time series, gaming leaderboards, or sensor streams.  

### Examples  

**Example 1:**  
Input:  
`NumArray numArray = NumArray([1, 3, 5]);`  
`numArray.sumRange(0, 2);`  
Output:  
`9`  
*Explanation: The sum from index 0 to 2 is 1 + 3 + 5 = 9.*

**Example 2:**  
Input:  
`numArray.update(1, 2);`  
Output:  
`-`  
*Explanation: The value at index 1 is now changed from 3 to 2.*

**Example 3:**  
Input:  
`numArray.sumRange(0, 2);`  
Output:  
`8`  
*Explanation: The sum from index 0 to 2 after the update is 1 + 2 + 5 = 8.*

### Thought Process (as if you’re the interviewee)  
Brute-force:  
- I could recalculate the sum each time for sumRange(left, right) using a loop, which is O(n) for query, and O(1) for update.  
- This is slow if the array is large or there are many queries.

Prefix sum:  
- If array was immutable, I’d precompute prefix sums in O(n), and each sumRange query would be O(1). But with updates, prefix sums get invalidated, so we’d need to update the entire prefix sum array for each update, which is O(n) per update.

Optimized:   
- We need something that supports both range sums and updates in O(log n).
- **Segment Tree**: Good for range queries and point updates—both are O(log n).
- **Binary Indexed Tree (Fenwick Tree)**: Works for prefix sums and point updates—also O(log n).
- Both methods are viable; in Python, a BIT is usually simpler to code for sum queries.

For this problem, I would use a Binary Indexed Tree (Fenwick Tree) to store prefix sums.  
- When updating, calculate the difference and propagate the delta.
- For sumRange, use prefix sum queries: sum(right) - sum(left - 1).

### Corner cases to consider  
- Empty array (shouldn’t happen with constraints, but check initialization).
- Queries where left == right (single element query).
- Updates at the first or last index.
- Negative numbers in the array.
- Multiple updates on same index.
- Very large number of updates and queries to test performance.

### Solution

```python
class NumArray:
    def __init__(self, nums):
        # Original nums needed for delta calculations during update
        self.nums = nums[:]   
        n = len(nums)
        # 1-indexed BIT/Fenwick tree structure
        self.bit = [0] * (n + 1)
        for i, val in enumerate(nums):
            self._add(i + 1, val)
    
    def update(self, index, val):
        # Compute difference 
        delta = val - self.nums[index]
        self.nums[index] = val
        # Apply difference to Fenwick Tree
        self._add(index + 1, delta)
    
    def sumRange(self, left, right):
        # sum(0..right) - sum(0..left-1)
        return self._prefix_sum(right + 1) - self._prefix_sum(left)
    
    def _add(self, i, delta):
        # Update Fenwick Tree with delta at index i
        n = len(self.bit)
        while i < n:
            self.bit[i] += delta
            i += i & -i
    
    def _prefix_sum(self, i):
        # Returns prefix sum from 1..i-1
        res = 0
        while i > 0:
            res += self.bit[i]
            i -= i & -i
        return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - update: O(log n) — BIT update propagates up the tree.
  - sumRange: O(log n) — BIT query is O(log n).
- **Space Complexity:** O(n) — for nums and the BIT array.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you were asked to support range updates and range sum queries?
  *Hint: Segment Trees with lazy propagation or Binary Indexed Trees with special tricks.*

- Can you handle multiply/divide/maximum/minimum queries over a range, not just sum?
  *Hint: Requires augmenting the Segment Tree or a specialized data structure.*

- How would you handle dynamic array size (insertions/deletions)?
  *Hint: Balanced binary search trees or advanced dynamic segment trees.*

### Summary
This problem uses the classic **prefix sum + update** pattern, commonly solved using a Fenwick Tree (Binary Indexed Tree) or Segment Tree for efficient range query and point updates. The BIT provides logarithmic time for both operations, balancing speed with straightforward implementation. The pattern is widely applicable in scenarios where you need frequent updates and fast range aggregations, such as time series analytics, real-time data dashboards, and many competitive programming problems.


### Flashcard
Use a segment tree or similar data structure to efficiently update and query mutable arrays.

### Tags
Array(#array), Divide and Conquer(#divide-and-conquer), Design(#design), Binary Indexed Tree(#binary-indexed-tree), Segment Tree(#segment-tree)

### Similar Problems
- Range Sum Query - Immutable(range-sum-query-immutable) (Easy)
- Range Sum Query 2D - Mutable(range-sum-query-2d-mutable) (Medium)
- Shifting Letters II(shifting-letters-ii) (Medium)