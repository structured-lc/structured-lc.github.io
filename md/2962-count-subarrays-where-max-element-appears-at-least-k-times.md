### Leetcode 2962 (Medium): Count Subarrays Where Max Element Appears at Least K Times [Practice](https://leetcode.com/problems/count-subarrays-where-max-element-appears-at-least-k-times)

### Description  
You're given an integer array `nums` and an integer `k`.  
A subarray is a contiguous portion of the array.  
Find **the number of subarrays where the maximum element of `nums` appears at least `k` times**.  
In other words, count how many subarrays have the global max value and this max occurs ≥ k times in that subarray.

### Examples  

**Example 1:**  
Input: `nums = [1,3,2,3,3], k = 2`  
Output: `6`  
*Explanation:*
- The maximum element is 3.
- Subarrays where 3 appears at least 2 times:  
  `[1,3,2,3,3]`, `[3,2,3,3]`, `[2,3,3]`, `[3,3]`, `[3,2,3]`, `[3,3]`
- Total = 6.

**Example 2:**  
Input: `nums = [1,4,2,1], k = 1`  
Output: `7`  
*Explanation:*  
- Maximum is 4.
- Any subarray containing the 4 suffices. These are:  
  `[4]`, `[1,4]`, `[4,2]`, `[1,4,2]`, `[1,4,2,1]`, `[4,2,1]`, `[2,1,4]`
- Total = 7.

**Example 3:**  
Input: `nums = [2,2,2], k = 2`  
Output: `2`  
*Explanation:*
- Maximum is 2.
- Subarrays where 2 appears at least 2 times:  
  `[2,2]`, `[2,2,2]`

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  - Enumerate all subarrays (start, end), check maximum and count occurrences.  
  - For each subarray:  
    - Find the max — O(n)  
    - Count how many times max shows up — O(n)  
    - Total O(n³)
  - Way too slow for large inputs.

- **Optimize:**  
  - Notice: Only care about subarrays where the max is the overall max in `nums`  
  - So, let `max_val = max(nums)`  
  - Store positions (indices) of all `max_val`  
  - The question becomes: For how many subarrays does `max_val` appear at least k times?

- **Sliding window / Two pointers:**  
  - Track a window `[i, j)` where the window contains at least k occurrences of max_val
  - For each starting index `i`, move `j` so that there are at least k max_val's between i and j (exclusive).  
  - For every valid `i`, every subarray ending at j, j+1, ..., n, is valid (because adding more to right can't lose max or reduce #occurrences).  
  - Total subarrays from i: `n - (j - 1)`
  - Move window: If nums[i] is max_val, decrement count when i moves forward  
  - Continue until j past end or not enough max_vals left.

- **Why this works:**  
  - Each valid window is counted, every subarray extension rightward remains valid as more max_vals can only help.
  - Time is O(n): each pointer only moves forward.

### Corner cases to consider  
- Empty array: nums = [], k = any  
- k > count of max_val in entire array: 0 valid subarrays  
- k = 1 (smallest case, special handling—every subarray containing max_val counts)  
- All elements equal: Every subarray with at least k elements
- No max_val at all? Not possible, since it's always the max somewhere.
- k == length of nums: Only whole array if every element is max.

### Solution

```python
def count_subarrays(nums, k):
    max_val = max(nums)
    n = len(nums)

    ans = 0
    cnt = 0  # Number of max_val's in current window
    j = 0    # End of window

    for i in range(n):
        # Extend window to ensure at least k max_vals
        while j < n and cnt < k:
            if nums[j] == max_val:
                cnt += 1
            j += 1

        # If enough max_vals, all windows ending at >= j are valid
        if cnt >= k:
            ans += n - (j - 1)
        
        # Shrink window from left: decrease cnt if nums[i] is max_val
        if nums[i] == max_val:
            cnt -= 1

    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - Both i and j pointers scan at most n steps forward.
  - All operations inside the loop are O(1).
- **Space Complexity:** O(1)  
  - Only variables; no data structures proportional to n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to count subarrays for *all possible* k (for fixed `nums`)?
  *Hint: Think about precomputing counts or using prefix sums at max_val positions.*

- How would you solve it if "max element appears *exactly* k times" is required?
  *Hint: Inclusion-exclusion using two sliding windows; count subarrays with at least k and subtract those with at least k+1.*

- Can you generalize for "top-m" largest elements appearing at least k times?
  *Hint: Track more than one candidate, will need more complicated counters.*

### Summary
This problem uses the **two pointer / sliding window** technique to efficiently count subarrays meeting frequency criteria for the max.  
It's a common pattern for subarray problems where extensions to the right preserve some monotonic property.  
This pattern is widely used for "number of subarrays with at least at most/exactly K (...) elements" and is efficient for large arrays.