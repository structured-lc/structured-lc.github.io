### Leetcode 3101 (Medium): Count Alternating Subarrays [Practice](https://leetcode.com/problems/count-alternating-subarrays)

### Description  
Given a binary array `nums`, count how many contiguous subarrays are **alternating**, i.e., no two adjacent elements in the subarray have the same value. Each subarray must have at least one element. Return the total count of such alternating subarrays.  
You need to consider every possible contiguous subarray. A subarray is alternating if, for every adjacent pair within that subarray, the values are different (i.e., it goes 0,1,0... or 1,0,1..., etc).

### Examples  

**Example 1:**  
Input: `nums = [0,1,1,1]`  
Output: `5`  
*Explanation: The alternating subarrays are: , [1], [1], [1] (the singles), and [0,1]. Other subarrays, like [1,1], are not alternating because adjacent `1`'s are the same.*

**Example 2:**  
Input: `nums = [1,0,1,0]`  
Output: `10`  
*Explanation: All subarrays of this array are alternating because every adjacent pair alternates: [1], , [1], , [1,0], [0,1], [1,0,1], [0,1,0], [1,0,1,0].*

**Example 3:**  
Input: `nums = [1,1,0]`  
Output: `4`  
*Explanation: Valid alternating subarrays: [1], [1],  (the singles), and [1,0]. E.g. [1,1] is not alternating since adjacent elements are the same.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  - For each possible subarray, check if it is alternating by comparing each adjacent element.  
  - Time: O(n³), which is too slow even for n=10⁵.

- **Optimized approach:**  
  - Notice that single elements are always alternating.  
  - Keep track of the start (`start`) of the current alternating segment. Move `end` forward as long as adjacent elements differ.  
  - If two equal adjacent elements are found at position `end`, count the number of alternating subarrays in the previous segment (`length = end - start`), using the formula:  
    - num_subarrays = length × (length + 1) // 2 (since each subarray starting at index within this segment is valid).
  - Reset `start` to current position and repeat.  
  - At the end, process the final alternating segment.
  - **Why it works:** Every maximal alternating run yields (length × (length + 1)) // 2 valid subarrays exactly.

- **Trade-offs:**  
  - Avoids quadratic checks.
  - Uses O(1) extra space and O(n) time.

### Corner cases to consider  
- Empty array (problem constraints say nums is non-empty but always check if necessary).
- All elements the same (e.g., [1,1,1,1]).
- Strictly alternating array (maximum possible subarrays).
- Array of length 1.
- Alternating only at the boundaries.

### Solution

```python
def countAlternatingSubarrays(nums):
    n = len(nums)
    count = 0
    start = 0  # Start index of current alternating segment

    for end in range(1, n):
        if nums[end] == nums[end - 1]:
            # Found same adjacent elements; count subarrays for segment [start, end - 1]
            segment_len = end - start
            count += segment_len * (segment_len + 1) // 2
            # Start a new segment
            start = end

    # Process the last segment
    segment_len = n - start
    count += segment_len * (segment_len + 1) // 2

    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since each element is visited once.  
  - Each segment is computed in constant time.
- **Space Complexity:** O(1), as only a few integer counters are used, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would the solution change if the nums array could contain more than two distinct integers?  
  *Hint: You'd need to just check that adjacent elements are not equal for any value, not just 0 or 1.*

- Can you modify the code to return all such alternating subarrays, not just their count?  
  *Hint: Collect the (start, end) pairs of each segment, then enumerate all subarrays in those intervals.*

- What if the array is very large and you need to process it in chunks (e.g., streaming)?  
  *Hint: You need to maintain the state between chunks (last value, segment info).*

### Summary
This problem uses the classic "run-length" or **sliding window** technique to identify and count maximal contiguous segments with a property (alternation). The pattern — track a segment until it breaks, tally results, reset — is common in substring and subarray problems, e.g., finding maximal sequences, runs, or properties. The approach is efficient and broadly applicable to many array/string scanning problems.

### Tags
Array(#array), Math(#math)

### Similar Problems
