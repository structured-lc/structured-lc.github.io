### Leetcode 930 (Medium): Binary Subarrays With Sum [Practice](https://leetcode.com/problems/binary-subarrays-with-sum)

### Description  
Given a binary array (contains only `0`s and `1`s) and an integer `goal`, find how many contiguous subarrays have a sum equal to `goal`. A *subarray* is any consecutive sequence of elements in the original array. Only subarrays with sums exactly matching `goal` are counted; overlapping is allowed, but order must be maintained.

### Examples  

**Example 1:**  
Input: `nums = [1,0,1,0,1]`, `goal = 2`  
Output: `4`  
Explanation: The subarrays summing to 2 are: `[1,0,1], [0,1,0,1], [1,0,1] (from indices 2-4), [1,0,1] (indices 0-2)`.

**Example 2:**  
Input: `nums = [0,0,0,0,0]`, `goal = 0`  
Output: `15`  
Explanation: Every subarray of length ≥0 contains only zeros, so any subarray counts if its sum = 0 (total = n×(n+1)/2 for n=5).

**Example 3:**  
Input: `nums = [1,0,0,1,0,1,1,0]`, `goal = 3`  
Output: `5`  
Explanation: Subarrays: `[1,0,0,1,0,1], [0,0,1,0,1,1], [0,1,0,1,1], [1,0,1,1], [1,1,0]` all sum to 3.

### Thought Process (as if you’re the interviewee)  
The brute-force approach is to check every possible subarray (using two loops), sum the elements, and count if it equals `goal`. This is O(n²) time, which is too slow for large arrays.

A much better approach leverages properties of binary arrays:
- The sum of any subarray is just the count of `1`s, and all numbers are `0` or `1`.
- Use a prefix sum and a hashmap (dictionary) to count occurrences of each sum efficiently.

**Efficient approach:**
- Iterate through the array, keeping a running prefix sum.
- For each element, record how many times (current prefix sum - goal) has been seen so far; this counts how many subarrays ending here have sum equal to `goal`.
- Increment the count for the current prefix sum for future elements.

Alternative:  
A *sliding window* solution works only for `goal > 0` (since sum can't decrease with only 0s & 1s). But for all cases including `goal = 0`, prefix sum with hashmap is safer and easier to implement.

### Corner cases to consider  
- Empty array: should return 0.
- All 0s and goal = 0: should count all subarrays.
- Single element array.
- No subarrays sum to goal (e.g., all 0s, and goal = 1).
- Large arrays with repeated patterns.
- goal > sum(nums): should return 0.

### Solution

```python
def numSubarraysWithSum(nums, goal):
    # Dictionary to store frequency of prefix sums
    prefix_count = {0: 1}
    prefix_sum = 0
    result = 0
    
    for num in nums:
        prefix_sum += num

        # If (prefix_sum - goal) seen before, add its count to result
        result += prefix_count.get(prefix_sum - goal, 0)

        # Update the count for the current prefix_sum
        prefix_count[prefix_sum] = prefix_count.get(prefix_sum, 0) + 1
        
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) because each element is processed once in the loop; dictionary operations are O(1) amortized.
- **Space Complexity:** O(n) for the prefix_count dictionary in the worst case (if every prefix sum is unique).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array contains numbers other than 0 or 1?  
  *Hint: Can the prefix sum approach still be applied? Think about whether the sliding window technique still works.*

- Can you solve the problem using only O(1) space?  
  *Hint: Is there a way to manipulate pointers without extra storage?*

- How would you modify the algorithm if you had to return the actual subarrays instead of just the count?  
  *Hint: Track start and end indices as you calculate prefix sums.*

### Summary
This problem uses the prefix sum + hashmap pattern, a common and powerful approach for subarray-sum problems. This technique can be applied wherever we need to count the number of subarrays with a certain sum efficiently, particularly if the array contains only a few unique elements (like binary arrays). Recognizing the constraint of only 0s and 1s enables further optimization using sliding window in specific cases, but prefix sum with hashmap remains robust and general.