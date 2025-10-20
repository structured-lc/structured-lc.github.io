### Leetcode 2294 (Medium): Partition Array Such That Maximum Difference Is K [Practice](https://leetcode.com/problems/partition-array-such-that-maximum-difference-is-k)

### Description  
Given an integer array **nums** and an integer **k**, partition the array into the minimum number of **subsequences** such that for every subsequence, the difference between its maximum and minimum value is at most **k**.  
Each element in **nums** must be part of exactly one subsequence.
Return the minimum number of such subsequences needed.

*A subsequence is a sequence derived from the array by deleting some (or no) elements without changing the order of the remaining elements.*

### Examples  

**Example 1:**  
Input: `nums = [3,6,1,2,5], k = 2`  
Output: `2`  
Explanation: We can partition nums into `[3,1,2]` and `[6,5]`.  
- max-min of [3,1,2] is 3-1=2 (valid).
- max-min of [6,5] is 6-5=1 (valid).
- Minimum number of subsequences is 2.

**Example 2:**  
Input: `nums = [1,2,3], k = 1`  
Output: `2`  
Explanation: [1,2], [3] is the optimal grouping. [1,2] has a difference of 1, [3] is alone. All other groupings require at least 2 subsequences.

**Example 3:**  
Input: `nums = [2,2,4,5], k = 0`  
Output: `3`  
Explanation: Possible grouping: [2,2], [4], [5]. [2,2] difference is 0, [4] and [5] each are by themselves.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all partitions and check max-min difference in each group. This is clearly infeasible, as the number of partitions is exponential.
- **Observation:** Since difference only depends on max and min, if we sort the array, adjacent numbers are closest.
- **Greedy idea:**  
  - Sort the array.
  - Start a new group whenever the current number is more than k greater than the min of the current group.
  - This works because, once the difference exceeds k, adding the number to this group will violate the requirement.
- **Why sorting + greedy is correct:**  
  - If two elements are more than k apart in the sorted order, they cannot be in the same group.
  - Group numbers as tightly as possible, create a new group only when needed.
- This is both optimal and efficient.

### Corner cases to consider  
- Empty array (nums = []): Should return 0.
- All elements the same: Only one subsequence needed.
- Single element: Should return 1.
- k = 0: Only identical elements can be grouped together.
- Large array with all differences > k: Each in its own group.
- Unsorted input.

### Solution

```python
def partitionArray(nums, k):
    # Edge case: empty array
    if not nums:
        return 0
    
    # Sort array first
    nums.sort()
    # Initialize number of subsequences
    count = 1
    # Start of current group
    group_min = nums[0]
    
    for num in nums:
        # If num is too far from group_min, start new group
        if num - group_min > k:
            count += 1
            group_min = num
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n is the length of nums, due to sorting.
- **Space Complexity:** O(1) extra space (if we ignore input sorting in-place), otherwise O(n) if sort is not in-place.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you must return the actual groups?
  *Hint: Keep track of each group as you partition in the loop. Build a list of lists of grouped numbers.*
  
- Can you solve it if nums is too large to fit in memory?
  *Hint: Process sorted chunks sequentially, maybe using a min-heap and/or external sorting.*

- What if elements can be assigned to multiple groups? How does your approach change?
  *Hint: Problem becomes ambiguous, need clear constraints or optimize for overlapping groupings (not this problem).*

### Summary
This problem uses the classic **greedy with sorting** pattern. Sort, then greedily extend groups as far as the rule allows, minimizing the number of groups. The same pattern is often seen in interval covering, scheduling, and grouping problems where "tight packing" is optimal. The greedy approach is provably optimal here due to the sorted structure and local optimality leading to global optimality.


### Flashcard
Sort the array, then greedily start a new group whenever current element exceeds group min by more than k.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
- Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit(longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit) (Medium)
- Maximum Beauty of an Array After Applying Operation(maximum-beauty-of-an-array-after-applying-operation) (Medium)