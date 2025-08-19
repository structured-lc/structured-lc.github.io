### Leetcode 1187 (Hard): Make Array Strictly Increasing [Practice](https://leetcode.com/problems/make-array-strictly-increasing)

### Description  
Given two integer arrays `arr1` and `arr2`, return the minimum number of operations (possibly zero) needed to make `arr1` strictly increasing.  
In one operation, you can replace any element in `arr1` with any element from `arr2`. A strictly increasing array is one in which every element is greater than its previous element.  
If it is not possible to make `arr1` strictly increasing, return -1.

### Examples  

**Example 1:**  
Input: `arr1 = [1, 5, 3]`, `arr2 = [4, 2, 6]`  
Output: `2`  
*Explanation: Replace 5 with 2 and 3 with 6. The sequence becomes [1, 2, 6], which is strictly increasing.*

**Example 2:**  
Input: `arr1 = [1, 5, 3, 6, 7]`, `arr2 = [1, 3, 2, 4]`  
Output: `1`  
*Explanation: Replace 3 with 4 so you get [1, 5, 4, 6, 7]. No two adjacent numbers are equal, and each is greater than its predecessor.*

**Example 3:**  
Input: `arr1 = [1, 5, 3, 6, 7]`, `arr2 = [4, 3, 1]`  
Output: `2`  
*Explanation: Replace 5 with 3, and 3 with 4. The sequence becomes [1, 3, 4, 6, 7].*

### Thought Process (as if you’re the interviewee)  
Start by considering the brute-force approach:  
- Try every combination of replacements between `arr1` and elements from `arr2` at each index.  
- For each combination, check if the resulting array is strictly increasing.
- This is exponential because every `arr1` element can either be replaced by any `arr2` value or kept as is.

Clearly, this is too slow for larger arrays.

Instead, notice that this problem exhibits **optimal substructure** and **overlapping subproblems**, making it suitable for **dynamic programming**:
- At position i, keep track of all possible "previous values" that can appear (either kept from `arr1` or replaced from `arr2`), and the minimum operations needed to reach them.
- For each position, for each possible "last seen" value, try both:
  - Keeping `arr1[i]` if it is greater than the previous.
  - Replacing with the smallest available value in `arr2` that is greater than the previous value.
- Use a map to store the minimal operation count for each possible current value at every step.

Sort `arr2` first and remove duplicates for efficient binary searches when looking for replacements.

Trade-off:  
- This approach uses extra space and time proportional to all possible candidates per position, but it is necessary to avoid recomputation and keep the solution efficient.

### Corner cases to consider  
- Arrays with only 1 element in `arr1` (already strictly increasing)
- Duplicates in `arr2`
- `arr2` contains only smaller elements than in `arr1`
- No possible solution (should return -1)
- Replacing with same value as previous (must avoid: strictly increasing)
- Large arrays and repeated values

### Solution

```python
def makeArrayIncreasing(arr1, arr2):
    # Remove duplicates and sort arr2 for binary search
    arr2 = sorted(set(arr2))
    from bisect import bisect_right

    # dp: {prev_value: min_operations}
    dp = {-float('inf'): 0}

    for a in arr1:
        new_dp = {}
        for prev_val in dp:
            # Case 1: Keep arr1 value if strictly increasing
            if a > prev_val:
                new_ops = dp[prev_val]
                if a not in new_dp or new_dp[a] > new_ops:
                    new_dp[a] = new_ops
            # Case 2: Replace with something in arr2 (strictly increasing)
            idx = bisect_right(arr2, prev_val)
            if idx < len(arr2):
                b = arr2[idx]
                new_ops = dp[prev_val] + 1
                if b not in new_dp or new_dp[b] > new_ops:
                    new_dp[b] = new_ops
        # If new_dp is empty, it's impossible
        if not new_dp:
            return -1
        dp = new_dp

    return min(dp.values())
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Sorting `arr2`: O(m log m), m = len(arr2)
  - For each element of `arr1` (n), iterate possible previous values (up to O(m)), use binary search O(log m).
  - Overall: O(n × m × log m), where n = len(arr1), m = len(arr2)
- **Space Complexity:**  
  - O(m) per stage for the `dp` dictionaries (since possible "current values" are limited by arr2's unique values)

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could only replace at most k elements?
  *Hint: Track replacement count and prune impossible states.*

- How does the answer change if "strictly increasing" becomes "non-decreasing"?
  *Hint: Adjust the comparison operator; can we keep more values per step?*

- Can you reconstruct the sequence of changes made?
  *Hint: In addition to cost, track previous selections to build the solution path.*

### Summary
This problem is a classic example of **dynamic programming with state reduction**, where the state consists of both the index and last chosen value (state compression).  
Key patterns:
- State pruning with maps to reduce duplicate work
- Efficient candidate searching with sorted/unique lists and binary search  
Pattern can be applied to similar "make sequence X by minimal edits with constraints" problems.

### Tags
Array(#array), Binary Search(#binary-search), Dynamic Programming(#dynamic-programming), Sorting(#sorting)

### Similar Problems
- Make Array Non-decreasing or Non-increasing(make-array-non-decreasing-or-non-increasing) (Hard)