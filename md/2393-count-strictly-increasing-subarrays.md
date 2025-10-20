### Leetcode 2393 (Medium): Count Strictly Increasing Subarrays [Practice](https://leetcode.com/problems/count-strictly-increasing-subarrays)

### Description  
Given an array of positive integers, count how many contiguous subarrays are **strictly increasing**.  
A subarray consists of consecutive elements; “strictly increasing” means for any two consecutive elements, the next one is strictly greater than the previous.  
Return the total number of such strictly increasing subarrays (length 1 counts as strictly increasing).  

### Examples  

**Example 1:**  
Input: `nums = [1,3,5,4,4,6]`  
Output: `10`  
*Explanation:  
Single-element subarrays: [1], [3], [5], [4], [4],  (6 in total).  
Length 2: [1,3], [3,5], [4,6] (3 in total).  
Length 3: [1,3,5] (1 in total).  
Total: 6 + 3 + 1 = 10.*

**Example 2:**  
Input: `nums = [1,2,3,4,5]`  
Output: `15`  
*Explanation:  
Every subarray is strictly increasing.  
There are 5 single-element subarrays, 4 of length 2, 3 of length 3, 2 of length 4, and 1 of length 5.  
Sum: 5 + 4 + 3 + 2 + 1 = 15.*

**Example 3:**  
Input: `nums = [5,4,3,2,1]`  
Output: `5`  
*Explanation:  
Only single-element subarrays are strictly increasing: [5], [4], [3], [2], [1].*


### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Iterate over all possible subarrays, check if each is strictly increasing.  
  This takes O(n²) time, which will be too slow for large arrays.

- **Optimized Approach:**  
  - Notice that **for every contiguous strictly increasing run**,  
    if the length is L, there are (L × (L + 1)) ⁄ 2 subarrays (each starting/ending inside the run).  
  - Only need to process the array once, tracking the increasing runs.
  - For each position, if nums[i] > nums[i-1], extend the current run. Otherwise, end run and sum subarrays for that run.
  - This is a **two-pointer/gap tracking** or a prefix method, and it gives O(n) time.

- **Trade-offs:**  
  - O(n) is optimal (each element processed once).
  - Constant extra space; no need for complex data structures.

  
### Corner cases to consider  
- Empty array (should output 0).
- Single-element array (output 1).
- All equal elements (output = len(nums); only single-element subarrays).
- Strictly decreasing array (similarly only length-1 subarrays).
- Mixed runs: [1, 2, 1, 2, 3, 0, 1]
- Large array (test efficiency).


### Solution

```python
def count_strictly_increasing_subarrays(nums):
    # Handle the empty array case
    if not nums:
        return 0

    total = 0
    curr_length = 1  # At each position, length of current increasing run

    for i in range(len(nums)):
        if i == 0 or nums[i] > nums[i - 1]:
            # Continue or start a new increasing subarray
            # (single-item always counts)
            if i != 0:
                curr_length += 1
        else:
            # Previous run ended, reset length
            curr_length = 1
        total += curr_length
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Single pass through array; each element checked once.
- **Space Complexity:** O(1) — Only a fixed number of extra variables used regardless of input size.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt the algorithm to count **strictly decreasing** subarrays?  
  *Hint: Replace the "nums[i] > nums[i - 1]" comparison with "nums[i] < nums[i - 1]".*

- What if you needed to return the actual subarrays, not just the count?  
  *Hint: Store start and end indices of each run, enumerate subarrays explicitly.*

- How can you generalize the approach for "subarrays with no equal adjacent elements"?  
  *Hint: Change to "nums[i] != nums[i - 1]", and update logic similarly.*

### Summary
This problem uses a classic **sliding window/run tracking** pattern to efficiently count strictly increasing subarrays. It’s closely related to problems counting runs, monotonic subarrays, and prefix sums. The O(n) enumeration is widely applicable to any problem where a property must hold on all adjacent elements in a contiguous block.


### Flashcard
Track length L of each strictly increasing run; for each run contribute L × (L + 1) / 2 subarrays in single O(n) pass.

### Tags
Array(#array), Math(#math), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Maximum Ascending Subarray Sum(maximum-ascending-subarray-sum) (Easy)