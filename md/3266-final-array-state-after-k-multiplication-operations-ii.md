### Leetcode 3266 (Hard): Final Array State After K Multiplication Operations II [Practice](https://leetcode.com/problems/final-array-state-after-k-multiplication-operations-ii)

### Description  
You’re given an integer array **nums**, an integer **k**, and an integer **multiplier**.  
You must perform **k** operations on **nums**:  
- In each operation, find the **minimum** value in **nums** (if multiple, pick the earliest—smallest index).
- Multiply that element by **multiplier** and replace it in **nums**.
- Do this for **k** times.
After all **k** operations, **apply modulo 10⁹+7 to every value** in **nums**.  
Return the final array.

### Examples  

**Example 1:**  
Input: `nums = [2, 1, 3, 5, 6], k = 5, multiplier = 2`  
Output: `[8, 4, 6, 5, 6]`  
*Explanation:*
1. Minimum is 1 (index 1): 1 × 2 = 2, nums → [2, 2, 3, 5, 6]
2. Minimum is 2 (index 0): 2 × 2 = 4, nums → [4, 2, 3, 5, 6]
3. Minimum is 2 (index 1): 2 × 2 = 4, nums → [4, 4, 3, 5, 6]
4. Minimum is 3 (index 2): 3 × 2 = 6, nums → [4, 4, 6, 5, 6]
5. Minimum is 4 (index 0/1, choose 0): 4 × 2 = 8, nums → [8, 4, 6, 5, 6]  
Apply mod 10⁹+7 to each (no change needed).

**Example 2:**  
Input: `nums = [1, 1, 1], k = 3, multiplier = 2`  
Output: `[2, 2, 2]`  
*Explanation:*
1. Index 0: 1 × 2 = 2 → [2, 1, 1]
2. Index 1: 1 × 2 = 2 → [2, 2, 1]
3. Index 2: 1 × 2 = 2 → [2, 2, 2]

**Example 3:**  
Input: `nums = [5], k = 4, multiplier = 3`  
Output: ``  
*Explanation:*
(num = 5, multiply by 3 four times: 5 × 3⁴ = 405)

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Simulate the process: For each operation, scan the array for the minimum (O(n)), multiply it, repeat K times. This is O(k×n), which is too slow for large k.

- **Better:**  
  Instead, use a **min-heap (priority queue)**—each time, pop the tiniest value and push back the multiplied result along with its index. This gives O(k log n).  
  However, for large k, that's still expensive.

- **Optimize further:**  
  Notice the heap cycles through all indices. Every n operations, each index is the minimum once. So:  
  - Each index is picked floor(k/n) times.
  - The first k % n indices (in sorted value, then index order) get one extra multiplication.
  So, sort by value then index, and for each i, multiply by multiplier ^ (k // n + (i < k % n)).  
  This is O(n log n) time.

- **Final approach chosen:**  
  For efficiency, sort, precompute the number of times each index gets multiplied, and apply it in one pass.

### Corner cases to consider  
- Empty array (`nums = []`)
- k = 0 (no operation)
- multiplier = 1 (no effect; final state == initial)
- Single-element array
- All elements the same
- k < n and k ≫ n

### Solution

```python
def getFinalState(nums, k, multiplier):
    MOD = 10**9 + 7
    n = len(nums)
    if multiplier == 1 or k == 0:
        # No change necessary
        return [x % MOD for x in nums]
    
    # Pair: (value, orig_index)
    arr = sorted([(val, idx) for idx, val in enumerate(nums)])
    
    base_times = k // n
    extra = k % n
    
    # For each original index, track power
    pow_times = [base_times] * n
    # The first 'extra' elements in value/index order get one extra
    for i in range(extra):
        _, idx = arr[i]
        pow_times[idx] += 1

    res = []
    for i, x in enumerate(nums):
        total_times = pow_times[i]
        new_val = x * pow(multiplier, total_times, MOD)
        res.append(new_val % MOD)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) (for sorting by value/index; all subsequent steps are O(n))
- **Space Complexity:** O(n) (arrays `arr`, `pow_times`, and `res` are all size n; only a constant number of extra variables are used)

### Potential follow-up questions (as if you’re the interviewer)  

- What if multiplier can be 0 or negative?  
  *Hint: Carefully handle 0 (all become 0 after first time), negative (sign flips with odd/even exponent).*

- Can this work for very large k (10¹² or more)?  
  *Hint: pow(multiplier, t, MOD) in Python is efficient even for large exponents.*

- How to handle duplicate values, or multiple minimums?  
  *Hint: Always prefer the lesser index when breaking ties.*

### Summary
This problem is a classic example of a **priority queue optimization**, but the real trick is seeing the *batching* opportunity: since the process cycles through all indices repeatedly, you only need to count how many times each index is chosen and apply all the multiplications at once. This pattern (grouping repeated operations instead of simulating them) comes up often in **process simulation**, **heap cycling**, and **lazy propagation** scenarios, where large numbers of repeated or uniform operations can be mathematically collapsed for efficiency.