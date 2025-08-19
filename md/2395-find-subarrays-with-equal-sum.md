### Leetcode 2395 (Easy): Find Subarrays With Equal Sum [Practice](https://leetcode.com/problems/find-subarrays-with-equal-sum)

### Description  
Given a 0-indexed integer array nums, determine if there exist two subarrays of length 2 with the same sum. The two subarrays must begin at different indices, but can overlap. Return true if such subarrays exist, false otherwise.  
A subarray in this context is any two consecutive elements in nums, i.e., nums[i] and nums[i+1] for some i.

### Examples  

**Example 1:**  
Input: `[4,2,4]`,  
Output: `true`  
*Explanation: The subarrays [4,2] (sum 6) and [2,4] (sum 6) have the same sum.*

**Example 2:**  
Input: `[1,2,3,4,5]`,  
Output: `false`  
*Explanation: No two subarrays of size 2 have the same sum.*

**Example 3:**  
Input: `[0,0,0]`,  
Output: `true`  
*Explanation: The subarrays [0,0] and [0,0] both sum to 0. They start at different indices (0 and 1), so they are considered different.*

### Thought Process (as if you’re the interviewee)  
The brute-force approach is to check the sum of every pair of consecutive elements, and compare each possible pair with every other possible pair. For n elements, there are (n-1) pairs, and comparing each pair to every other takes O(n²) time.

To optimize, we can notice that we only care whether any sum repeats among these pairs. We can loop through the array once, calculate each pair’s sum, and store it in a set. If we ever see a sum that’s already in the set, we immediately return true. This reduces time to linear O(n) and space O(n) for the set.

The set approach is the best balance of efficiency and simplicity for interview code.

### Corner cases to consider  
- Arrays with less than 2 elements (not possible, as per constraints, always at least 2 elements)
- All elements are the same (e.g., [7,7,7]): sums are equal
- Only two elements: only one subarray, so always false
- Large negative and positive values
- Overlapping subarrays, e.g., [1,1,1] — allowed and considered different

### Solution

```python
def findSubarrays(nums):
    # Set to keep track of all unique sums of subarrays of length 2
    seen_sums = set()
    # Iterate through the array, considering subarrays nums[i], nums[i+1]
    for i in range(len(nums) - 1):
        current_sum = nums[i] + nums[i + 1]
        # If we've already seen this sum, return True
        if current_sum in seen_sums:
            return True
        # Otherwise, add the sum to the set
        seen_sums.add(current_sum)
    # If no duplicate sums were found
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the input array. We iterate once through the list, doing O(1) work per step.
- **Space Complexity:** O(n), in the worst case all the sums are unique and stored in the set.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want to find *all* such pairs of subarrays with the same sum?
  *Hint: Instead of returning early, store pairs of indices or subarrays for reporting later.*

- How would you extend this approach for subarrays of length k instead of 2?
  *Hint: Use a sliding window of size k and compute sums on the fly.*

- Can you solve the problem in constant space if you can change the input or make certain assumptions?
  *Hint: If modifying input is allowed, you might consider in-place marking, but for large ranges or collisions, this is not trivial.*

### Summary
This problem uses the classic “detect duplicate with a set” pattern, with a sliding window of size 2 to generate subarray sums. It’s a simple form of the hash set deduplication trick, commonly found in array and window-based coding questions, such as detecting duplicates in a window, finding repeated sums, or two-sum style problems. The general approach applies broadly to issues involving running duplicates or overlaps in linera scans.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems
- Two Sum(two-sum) (Easy)
- Partition Equal Subset Sum(partition-equal-subset-sum) (Medium)
- Find Two Non-overlapping Sub-arrays Each With Target Sum(find-two-non-overlapping-sub-arrays-each-with-target-sum) (Medium)