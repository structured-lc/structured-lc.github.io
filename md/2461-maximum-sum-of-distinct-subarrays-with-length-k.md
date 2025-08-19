### Leetcode 2461 (Medium): Maximum Sum of Distinct Subarrays With Length K [Practice](https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k)

### Description  
Given an array of integers `nums` and an integer `k`, find the maximum sum among all subarrays of length `k` where all elements in the subarray are *distinct*. If no such subarray exists, return 0.  
A subarray is a contiguous sequence of elements within the array.

### Examples  

**Example 1:**  
Input: `nums = [1,5,4,2,9,9,9], k = 3`  
Output: `15`  
*Explanation: The subarrays of length 3 are: [1,5,4] (sum=10, all unique), [5,4,2] (sum=11, all unique), [4,2,9] (sum=15, all unique), [2,9,9] (not all unique), [9,9,9] (not all unique). The max sum where all elements are unique is 15.*

**Example 2:**  
Input: `nums = [4,4,4], k = 3`  
Output: `0`  
*Explanation: Only one subarray [4,4,4], but all elements are the same (not unique), so the answer is 0.*

**Example 3:**  
Input: `nums = [4,2,4,5,6], k = 3`  
Output: `17`  
*Explanation: Subarrays: [4,2,4] (has duplicate), [2,4,5] (all unique, sum=11), [4,5,6] (all unique, sum=15). Maximum is 15.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try all subarrays of length `k`, check if all elements are unique, and keep track of the max sum.  
  This would be O(n × k): For each window, we have to scan k elements (for checking uniqueness and sum).
- **Optimized with Sliding Window + Hash Map:**  
  Since we need to check for uniqueness in a subarray of length k, use a sliding window of size k and track the counts of each element using a hash map.  
  - Slide the window: add new element at right, remove old element from left.
  - Update a running sum and a count map. If size of current window (after updating counts) equals k and all counts are 1, update max.
  - This approach is O(n) because each element is inserted and removed at most once.
- Chose the sliding window + map/hash set approach because of its linear time and reasonable space.

### Corner cases to consider  
- Array shorter than k (impossible to have k-length subarrays).
- k = 1 (every single element subarray is unique).
- All elements the same.
- All elements unique.
- Multiple max sum windows with the same sum.
- Negative numbers in nums.

### Solution

```python
def maximum_subarray_sum(nums, k):
    # Stores frequency of each number in the current window
    count = {}
    max_sum = 0
    curr_sum = 0
    left = 0

    for right in range(len(nums)):
        # Add next number to the window
        num = nums[right]
        count[num] = count.get(num, 0) + 1
        curr_sum += num

        # Shrink window if size > k
        if right - left + 1 > k:
            out_num = nums[left]
            count[out_num] -= 1
            if count[out_num] == 0:
                del count[out_num]
            curr_sum -= out_num
            left += 1

        # When window size == k, check if all are unique
        if right - left + 1 == k and len(count) == k:
            max_sum = max(max_sum, curr_sum)

    return max_sum
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  Each element is added and removed from the window at most once, and hash map operations are O(1) on average.
- **Space Complexity:**  
  O(k). The hash map at most contains k unique numbers (the window size).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need the starting index of the subarray as well?  
  *Hint: Add logic to track the window when a new max is found.*

- How would the approach change if elements can be extremely large or negative?  
  *Hint: It handles values regardless of their magnitude as long as dictionary works.*

- Could you generalize the approach for “at most k distinct elements” instead of “exactly k all unique”?  
  *Hint: Adjust window and checks for <= k unique and update sum accordingly.*

### Summary
We solved the problem with an efficient **sliding window+hash map** approach, a common pattern for finding properties in subarrays of fixed size with uniqueness constraints. This pattern is broadly useful for substring/subarray questions involving distinct/unique elements, such as “longest substring with k distinct chars” and similar interval problems.

### Tags
Array(#array), Hash Table(#hash-table), Sliding Window(#sliding-window)

### Similar Problems
- Max Consecutive Ones III(max-consecutive-ones-iii) (Medium)
- Longest Nice Subarray(longest-nice-subarray) (Medium)
- Optimal Partition of String(optimal-partition-of-string) (Medium)
- Count the Number of Good Subarrays(count-the-number-of-good-subarrays) (Medium)
- Maximum Good Subarray Sum(maximum-good-subarray-sum) (Medium)
- Find the Power of K-Size Subarrays I(find-the-power-of-k-size-subarrays-i) (Medium)
- Find the Power of K-Size Subarrays II(find-the-power-of-k-size-subarrays-ii) (Medium)