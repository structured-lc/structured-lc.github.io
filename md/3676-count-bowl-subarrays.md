### Leetcode 3676 (Medium): Count Bowl Subarrays [Practice](https://leetcode.com/problems/count-bowl-subarrays)

### Description  
Given an integer array `nums`, a **bowl subarray** is defined as a subarray where:
- There exists a **unique minimum** at some index `m` (i.e., `nums[m]` is less than all other elements in the subarray).
- All elements to the **left** of `m` are **strictly decreasing** as you move towards `m`.
- All elements to the **right** of `m` are **strictly increasing** as you move away from `m`.

You need to **count the number of bowl subarrays** in `nums`.

Think of a "bowl" shape: the subarray slopes down to the minimum, then up after.

### Examples  

**Example 1:**  
Input: `nums = [3,2,1,2,3]`  
Output: `3`  
*Explanation: There are 3 bowl subarrays: `[3,2,1,2,3]` (center at 1), `[2,1,2]` (center at 1), and `[3,2,1]` (center at 1).*

**Example 2:**  
Input: `nums = [2,1,4,3]`  
Output: `1`  
*Explanation: Only `[2,1,4]` forms a bowl (minimum at index 1). `[1,4,3]` does not qualify (right side decreases).*

**Example 3:**  
Input: `nums = [1,2,3,4,5]`  
Output: `0`  
*Explanation: No subarray forms a bowl, since there's never a unique minimum with strictly decreasing left and strictly increasing right.*

### Thought Process (as if you’re the interviewee)  
Brute-force approach:  
- For every possible center index (potential minimum), consider all possible subarrays in which it’s the unique minimum.
- For each index `m`, expand outwards to the left as long as numbers strictly decrease, and to the right as long as numbers strictly increase.
- For each valid span, count the number of subarrays centered at `m`.

Optimization:  
- For each index, compute how many consecutive elements to the left are strictly decreasing (let’s call this `left`) and to the right are strictly increasing (`right`).
- For every center `m`, the number of bowl subarrays with center `m` is `left × right` (as you can pick any prefix of the decreasing part and any suffix of the increasing part along with the center).
- This approach runs in O(n) time with a single pass to compute lengths.

Trade-offs:
- Brute-force is O(n³), will TLE.
- Improved is O(n), uses two simple arrays, very efficient for interview.

### Corner cases to consider  
- Empty array (`[]`)
- All elements equal (`[2,2,2,2]`)
- Array with one element (`[1]`)
- Strictly increasing or strictly decreasing sequences
- Plateaus (duplicates next to each other)
- Multiple "minimums" in subarray (not allowed)

### Solution

```python
def countBowlSubarrays(nums):
    n = len(nums)
    if n == 0:
        return 0

    # left[i]: number of elements to the left of i forming strictly decreasing sequence including i
    left = [1] * n
    for i in range(1, n):
        if nums[i-1] > nums[i]:
            left[i] = left[i-1] + 1
        else:
            left[i] = 1

    # right[i]: number of elements to the right of i forming strictly increasing sequence including i
    right = [1] * n
    for i in range(n-2, -1, -1):
        if nums[i+1] > nums[i]:
            right[i] = right[i+1] + 1
        else:
            right[i] = 1

    result = 0
    for m in range(n):
        if left[m] > 1 and right[m] > 1:
            # For each combination of decreasing prefix and increasing suffix centered at m
            result += (left[m] - 1) * (right[m] - 1)

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because we make 3 passes through the array (calculate left, right, and then accumulate result).
- **Space Complexity:** O(n), for the two extra arrays of length n (`left`, `right`).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you count such subarrays if plateaus (adjacent equals) were allowed along one side?  
  *Hint: Carefully adapt the strictly decreasing/increasing condition to allow equals.*

- How would you extend this definition to higher dimensions?  
  *Hint: Think how a “bowl” generalizes to grids or matrices.*

- Can you do this in-place, or with O(1) extra space?  
  *Hint: Use two pointers and reuse the original array if result storage is not needed.*

### Summary
This problem is a good example of the **expansion-around-center** pattern and uses left/right extending sequences, which also applies in “peak” or “mountain” subarray problems.  
The O(n) approach is often found in problems involving strictly monotonic subarrays, and the technique of precomputing range lengths appears in histogram/stack problems, as well as center-expansion methods in palindromes and mountain arrays.


### Flashcard
For each index as potential minimum, expand left while strictly decreasing and right while strictly increasing; count subarrays within valid span.

### Tags
Array(#array), Stack(#stack), Monotonic Stack(#monotonic-stack)

### Similar Problems
