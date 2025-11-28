### Leetcode 3026 (Medium): Maximum Good Subarray Sum [Practice](https://leetcode.com/problems/maximum-good-subarray-sum)

### Description  
Given an array of integers `nums` and a positive integer `k`, find the subarray with the **maximum sum** such that the absolute difference between the **first and last elements** of the subarray is exactly `k`. The subarray must be contiguous. If there are multiple such subarrays, return the largest sum among them. If none exists, return `0`.

### Examples  

**Example 1:**  
Input: `nums = [1, 2, 3, 4], k = 2`  
Output: `6`  
*Explanation:*
Possible good subarrays:
- [1, 3] (because |1 - 3| = 2, sum = 4)
- [2, 4] (because |2 - 4| = 2, sum = 6) ← maximum

**Example 2:**  
Input: `nums = [5, 3, 8, 3, 5], k = 5`  
Output: `16`  
*Explanation:*  
Possible good subarrays:
- [3, 8] (|3 - 8| = 5, sum = 11)
- [8, 3, 5] (|8 - 5| = 3, not good)
- [5, 3, 8, 3, 5] (|5 - 5| = 0, not good)
- [5, 3, 8] (|5 - 8| = 3, not good)
- [5, 3, 8, 3, 5] spanning both ends, (|5 - 5|=0, not good)

But only [3, 8] and [8, 3, 5] start and end with abs diff 5.  
Best sum = 16 for subarray [3, 8, 3, 5].

**Example 3:**  
Input: `nums = [2, 2, 2], k = 1`  
Output: `0`  
*Explanation:*
No subarray where the absolute difference between first and last elements is 1.

### Thought Process (as if you’re the interviewee)  
First, consider the brute-force approach:  
- Enumerate all possible subarrays: for every (i, j), check if |nums[i] - nums[j]| == k, then calculate and track the sum.
- This is O(n²) since we’d need to check every pair.

To optimize:  
- Notice we only care about subarrays where the ends differ by exactly k.
- If we fix `j` (right end), we can look up for possible `i` (left ends) where nums[i] == nums[j] + k or nums[i] == nums[j] - k.
- Use prefix sums to calculate subarray sums in O(1).
- Use a hashmap to record the *minimum prefix sum* so far for positions where nums[x] is nums[j]-k or nums[j]+k.

Final approach:
- Traverse through the array, maintaining prefix sum.
- For each index, check if nums[j] - k or nums[j] + k has been seen before (and record the *minimum prefix sum* at those positions).
- Maximize the subarray sum = current_prefix_sum - earlier_prefix_sum.

This converts the problem to O(n) time using hashmaps.

### Corner cases to consider  
- nums has all identical elements.
- k > max(nums) - min(nums).
- No qualifying subarray exists (should return 0).
- nums of length 1.
- k = 0 (would check for duplicate elements at i and j).
- Negative values in nums.

### Solution

```python
def maximum_good_subarray_sum(nums, k):
    n = len(nums)
    prefix_sum = 0
    # Store the first occurrence (and minimal prefix_sum) of each number
    first_seen = {}
    max_sum = float('-inf')
    
    # For base case: subarrays starting at index 0
    first_seen[nums[0]] = 0  # prefix_sum before index 0 is 0
    
    for i in range(n):
        # Update max_sum using previously seen starts
        for target in (nums[i] - k, nums[i] + k):
            if target in first_seen:
                prev_prefix_sum = first_seen[target]
                sub_sum = prefix_sum + nums[i] - prev_prefix_sum
                if sub_sum > max_sum:
                    max_sum = sub_sum
        prefix_sum += nums[i]
        # Only store the first (or minimal) prefix_sum for each number
        if nums[i] not in first_seen:
            first_seen[nums[i]] = prefix_sum - nums[i]
    # If no "good" subarray exists, return 0
    return max_sum if max_sum != float('-inf') else 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Iterate through `nums` once; each lookup and update in the hashmap is O(1).
- **Space Complexity:** O(n)  
  Hashmap stores at most one entry for each distinct value in `nums`; prefix sums are scalar.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the solution if you wanted the actual subarray, not just the sum?  
  *Hint: Keep track of the start and end indices corresponding to prefix sums in the hashmap.*

- What if instead of a fixed k, the problem asks for max sum with |nums[i] - nums[j]| ≤ k?  
  *Hint: Now you would need to check a range of values efficiently—use a segment tree or BST.*

- How would you handle the problem if you must find the count of all "good" subarrays, not just the maximum sum?  
  *Hint: Modify the approach to count valid occurrences per step rather than just maximizing.*

### Summary
This problem is solved efficiently with the **prefix sum + hashmap** technique, a common coding pattern for “maximum subarray” and “matching endpoints” problems.  
Recognizing that only certain endpoints matter (those differing by ±k) allows for linear time. This pattern is widely applicable in subarray sum and difference-based windowed problems.


### Flashcard
Maximum Good Subarray Sum (Medium)

### Tags
Array(#array), Hash Table(#hash-table), Prefix Sum(#prefix-sum)

### Similar Problems
- Maximum Subarray(maximum-subarray) (Medium)
- Maximum Sum of Distinct Subarrays With Length K(maximum-sum-of-distinct-subarrays-with-length-k) (Medium)