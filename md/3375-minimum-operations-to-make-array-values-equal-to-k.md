### Leetcode 3375 (Easy): Minimum Operations to Make Array Values Equal to K [Practice](https://leetcode.com/problems/minimum-operations-to-make-array-values-equal-to-k)

### Description  
Given an array `nums` and an integer `k`, the task is to determine the minimum number of operations needed to make **all** array values equal to `k`. In each operation, you can select any number (greater than `k`) and decrease it to another number (also greater or equal to `k`).  
- **You cannot increase a value**, and you cannot make values less than `k` become `k`.
- If any value in `nums` is already less than `k`, it is impossible—return `-1`.

### Examples  

**Example 1:**  
Input: `nums = [5, 2, 5, 4, 5]`, `k = 2`  
Output: `2`  
*Explanation: Only values greater than 2 need reductions. Here, the unique values above 2 are 4 and 5.  
→ Minimum 2 operations:  
1. Reduce all 5's to 4  
2. Reduce all 4's to 2  
Now all elements are 2.*

**Example 2:**  
Input: `nums = [2, 1, 2]`, `k = 2`  
Output: `-1`  
*Explanation: 1 < 2. Since you can only decrease values (never increase), impossible to make all values become 2.*

**Example 3:**  
Input: `nums = [9, 7, 5, 3]`, `k = 1`  
Output: `4`  
*Explanation: Unique numbers are [3, 5, 7, 9] (all > 1).  
Each unique greater value must be reduced in steps down to 1.  
Minimum required operations = 4.*

### Thought Process (as if you’re the interviewee)  
My first thought is brute force: repeatedly find the largest element > k, reduce it, and count steps until everything reaches k.  
But that's inefficient, especially with repeated values.

I quickly notice that reductions to reach k depend on how many **unique values greater than k** exist.  
- Each unique value above k requires at least one operation to bring it down.
- For efficiency:  
    - If any value < k exists, it's impossible (`-1`).
    - Otherwise, count distinct numbers > k.
    - If `k` is present, one less operation (no need to reduce it).
    - If `k` is NOT present, still need to "cover" all distinct values.

So, the optimal approach is **set deduction** (greedy): count distinct numbers in `nums` which are greater than `k`.  
This is O(n) and covers all edge cases.  
Tradeoff: if the set is large, the count of operations increases, but this is the minimal possible.

### Corner cases to consider  
- Empty array (should return 0: nothing to reduce).
- All elements already equal to k (return 0).
- Some elements < k (impossible, return -1).
- Only one element (check directly, either 0 or -1).
- Array with duplicate values greater than k (only unique values matter).
- Negative values (as long as comparison to k is handled).

### Solution

```python
def minOperations(nums, k):
    # Edge case: empty array (nothing to do)
    if not nums:
        return 0
    
    # Check if any element is less than k
    for num in nums:
        if num < k:
            return -1
    
    # Use a set to identify unique values
    unique_vals = set(nums)
    
    # If all values already equal to k
    if unique_vals == {k}:
        return 0
    
    # Count unique values > k
    greater_vals = {num for num in unique_vals if num > k}
    
    return len(greater_vals)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of `nums`.  
  Justification: One pass to check for impossibility, one pass to create the set, one more to count values > k.
- **Space Complexity:** O(u), where u is the number of unique values in `nums`.  
  Justification: The set stores all unique values, and an extra set for those > k.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could **increase** numbers as well as decrease?
  *Hint: Can you treat numbers both above and below k? Does the answer change?*

- How would you solve this if you needed to minimize the **total sum of changes** (cost), not just number of operations?
  *Hint: Consider the cost as the difference for all numbers ≠ k.*

- How would the approach change if there were a **cost associated with each reduction** (i.e., reducing by 1 costs 1 point)?
  *Hint: Count total reductions, not just distinct numbers.*

### Summary
This problem uses the **set** and **greedy reduction** pattern—track unique values that need to be operated upon and handle impossible cases early.  
The solution is efficient thanks to direct use of sets for tracking disturbed values, and it's a typical application of "count distinct states needing conversion."  
The approach, and recognizing impossible configurations early, shows up in a variety of problems where only monotonic changes (increase or decrease) are allowed.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems
