### Leetcode 3113 (Hard): Find the Number of Subarrays Where Boundary Elements Are Maximum [Practice](https://leetcode.com/problems/find-the-number-of-subarrays-where-boundary-elements-are-maximum)

### Description  
You are given an array of positive integers, nums.  
Find the number of subarrays where **the first and the last elements are equal to the maximum element in that subarray**.  
In other words, for a subarray nums[i..j], both nums[i] == nums[j] == max(nums[i..j]).

### Examples  

**Example 1:**  
Input: `nums = [1,4,3,3,2]`  
Output: `6`  
*Explanation:*  
Count the subarrays where the first and last elements are equal and both are the largest in that subarray.  
- [1] (max=1)  
- [4] (max=4)  
- [3] (max=3), starting and ending at each 3  
- [3,3] (max=3, both ends=3)  
There are 1 (ones), 1 (four), 2 (threes), 1 (two), plus [3,3] makes 6.

**Example 2:**  
Input: `nums = [5,5,5,5]`  
Output: `10`  
*Explanation:*  
Every possible subarray has 5 at both boundaries and as maximum.  
Subarrays are:  
[5], [5], [5], [5], [5,5], [5,5], [5,5], [5,5,5], [5,5,5], [5,5,5,5]  
Total: 10.

**Example 3:**  
Input: `nums = [2,1,2,2]`  
Output: `5`  
*Explanation:*  
Valid subarrays:  
- [2], [2], [2], [2] (each singleton 2)  
- [2,1,2] (max=2, starts and ends with 2s, nothing inside >2)  
Total: 5.

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  - Check all subarrays. For each, find its max, and see if both boundaries equal the max.  
  - Time: O(n³) (using three nested loops: start, end, scan max).  
  - Too slow for constraints.

- **Observation:**  
  - For any group of consecutive equal numbers, subarrays starting and ending at these equal numbers, and containing nothing bigger than them, are candidates.
  - For each number, look for its runs (contiguous sequences of same value) and expand outwards, but must stop if a larger number blocks.

- **Optimized approach:**  
  - For each occurrence of the maximum value, treat it as both left and right boundary of a valid subarray.
  - Use a stack (monotonic decreasing) or sliding window to quickly identify maximal segments where the boundary value is the maximum.
  - Monotonic stack can help compute, for each position, the range where current element is the largest (similar to Largest Rectangle in Histogram).

- **Final plan:**  
  - For each position i, find the distance to previous greater on the left (L) and next greater on the right (R). 
  - For elements with duplicate values, accumulation is needed—handle groups accordingly.
  - For each group of consecutive equal max elements, for each group, number of ways to pick pairs is len × (len+1) // 2.

- **Tradeoffs:**  
  - Monotonic stack, O(n) time and O(n) space.
  - Handles all edge-cases and is efficient enough for large inputs.

### Corner cases to consider  
- Empty array (should return 0)
- All elements equal (every subarray is valid)
- Distinct elements  
- Single element
- Multiple, separate runs of same maximum
- Large input (optimization necessary)
- Array with only one distinct value, or strictly increasing/decreasing

### Solution

```python
def count_subarrays(nums):
    n = len(nums)
    res = 0
    stack = []
    i = 0
    while i < n:
        # Group consecutive runs of same value
        val = nums[i]
        j = i
        while j < n and nums[j] == val:
            j += 1
        # Now nums[i:j] are equal to val
        left = i - 1
        right = j
        # Check that there is no larger value within [left+1 ... right-1]
        while left >= 0 and nums[left] <= val:
            if nums[left] == val:
                left -= 1
            else:
                break
        while right < n and nums[right] <= val:
            if nums[right] == val:
                right += 1
            else:
                break
        # How many subarrays where both boundaries are one of these equal elements, and nothing in between is greater
        count = j - i  # length of the run
        total_subarrays = count * (count + 1) // 2
        res += total_subarrays
        i = j
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - Each element is visited a constant number of times when expanding runs and checking boundaries.

- **Space Complexity:** O(1) extra  
  - Only primitive counters and pointers used.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose elements can be negative or zero instead of only positive?
  *Hint: Does "maximum" property still hold for zero/negative ranges?*

- What if you are only interested in subarrays of at least length 2?
  *Hint: Adjust counting formula: for k-length run, how many subarrays length ≥2?*

- What if you want the sum of the maximums for all valid subarrays instead of just the count?
  *Hint: For each found subarray, add the maximum value to total, instead of counting.*

### Summary
This problem is an example of the monotonic stack/sliding window pattern to efficiently count or aggregate information over subarrays that satisfy certain boundary and interior conditions. It's similar to classic interval-extension/stack enumeration problems (like Largest Rectangle in Histogram or Count Subarrays with Bounded Maximum). The idea of grouping identical runs and merging with monotonic constraints is broadly applicable in subarray and range-counting problems.


### Flashcard
For each position, find the longest run of equal values. Count subarrays within that run where both boundaries equal the run value and no larger value exists inside.

### Tags
Array(#array), Binary Search(#binary-search), Stack(#stack), Monotonic Stack(#monotonic-stack)

### Similar Problems
- Number of Subarrays with Bounded Maximum(number-of-subarrays-with-bounded-maximum) (Medium)
- Count Subarrays With Fixed Bounds(count-subarrays-with-fixed-bounds) (Hard)
- Count Subarrays Where Max Element Appears at Least K Times(count-subarrays-where-max-element-appears-at-least-k-times) (Medium)