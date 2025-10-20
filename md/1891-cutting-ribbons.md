### Leetcode 1891 (Medium): Cutting Ribbons [Practice](https://leetcode.com/problems/cutting-ribbons)

### Description  
You are given an integer array **ribbons**, where ribbons[i] represents the length of the iᵗʰ ribbon, and an integer **k**. You may cut any ribbon into any number of segments of positive integer lengths (or not cut at all).  
Your goal: obtain exactly **k** ribbons of the **same positive integer length**. Extra leftover ribbon can be discarded.  
Return the **maximum possible length** of ribbon segments such that you get at least **k** equal-length ribbons, or **0** if not possible.

### Examples  

**Example 1:**  
Input: `ribbons=[9,7,5]`, `k=3`  
Output: `5`  
*Explanation: Cut the first ribbon into one segment of length 5 and discard the leftover 4. Second: one segment 5, leftover 2. Third: one segment 5, zero left. Total: 3 ribbons of length 5.*

**Example 2:**  
Input: `ribbons=[7,5,9]`, `k=4`  
Output: `4`  
*Explanation:  
- 7 → 1×4 (remains 3), 5 → 1×4 (remains 1), 9 → 2×4 (remains 1)  
Total: 4 ribbons of length 4 (1 from first, 1 from second, 2 from third).*

**Example 3:**  
Input: `ribbons=[1,2,3,4,9]`, `k=5`  
Output: `3`  
*Explanation:  
- 9 → 3×3, 4 → 1×3, 3 → 1×3, 1 → 0, 2 → 0  
Total: 5 ribbons of length 3.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  Try all possible lengths from 1 up to the maximum ribbon, check for each if you can get at least k parts. But this is O(n × max_ribbon), which is too slow for large arrays and ribbon lengths.
- **Optimization:**  
  We notice that if we can cut k ribbons of length x, then for any smaller length x', we can cut at least k ribbons as well (monotonic property).  
  This means we can **binary search** over the possible ribbon lengths. For each candidate length, count how many segments can be made.
- **Why binary search:**  
  - Search space is sorted: as length increases, number of ribbons you can cut decreases.
  - This fits the pattern: find the *maximum* (largest) length such that the count is still **≥ k**.
- **Trade-off:**  
  - Brute-force: simple, but inefficient.
  - Binary search: time-efficient (O(n × log(max_ribbon))), simple to code, uses a helper function for the count.

### Corner cases to consider  
- Empty ribbons array (`[]`)
- Any ribbon shorter than the test segment length
- One ribbon only
- k is 0 or negative (not meaningful per problem)
- Not enough total material to make k segments of any length (>total_sum)
- All ribbons of equal size

### Solution

```python
def maxLength(ribbons, k):
    # Helper: can we cut at least k ribbons of length 'length'?
    def can_cut(length):
        return sum(ribbon // length for ribbon in ribbons) >= k
    
    left, right = 1, max(ribbons) # Start at 1, since size 0 is not allowed
    answer = 0
    
    while left <= right:
        mid = left + (right - left) // 2
        if can_cut(mid):
            answer = mid      # mid is feasible, try to go larger
            left = mid + 1
        else:
            right = mid - 1   # mid too large, must reduce
            
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n × log(max_ribbon)),  
  where n = len(ribbons), max_ribbon = largest ribbon length.  
  For each binary search (log(max_ribbon)), we scan ribbons (O(n)) to count possible segments.
- **Space Complexity:**  
  O(1) extra space — no extra storage except variables; not using recursion or large data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you must split the ribbons to **exactly** k pieces (not just at least k)?
  *Hint: How does discarding leftover ribbon affect the logic? Do you need to check for "exact" equality?*

- What if each ribbon has a different **cutting cost** and you want to minimize total cost for k pieces?
  *Hint: You might want to modify the check function to account for additional cost constraints.*

- How would you solve it if the number of ribbons is up to 10⁶ but their maximum length is small?
  *Hint: Try using a counting array instead of iterating for every length.*

### Summary
This problem uses the **binary search on answer** pattern — a powerful technique when the answer lies in a numeric range and you can check feasibility in O(n) per test.  
Classic applications include cutting objects into k parts (paper, wood, cable, etc), maximizing the minimum or minimizing the maximum, etc.  
The helper function checks for feasibility, and binary search efficiently narrows down the optimal value. This approach works whenever the problem exhibits monotonicity (if a solution is possible for x, also possible for x-1), which is common in resource allocation and partitioning problems.


### Flashcard
Use binary search to find the maximum length that can cut at least k ribbons.

### Tags
Array(#array), Binary Search(#binary-search)

### Similar Problems
- Capacity To Ship Packages Within D Days(capacity-to-ship-packages-within-d-days) (Medium)
- Add Minimum Number of Rungs(add-minimum-number-of-rungs) (Medium)