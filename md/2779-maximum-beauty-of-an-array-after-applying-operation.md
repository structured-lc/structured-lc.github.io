### Leetcode 2779 (Medium): Maximum Beauty of an Array After Applying Operation [Practice](https://leetcode.com/problems/maximum-beauty-of-an-array-after-applying-operation)

### Description  
Given a 0-indexed array of integers, nums, and a non-negative integer k, you can perform the following operation on each element at most once: pick an index i (that hasn't been picked before) and replace nums[i] with any integer in the range [nums[i] - k, nums[i] + k].  
The beauty of an array is the length of the longest subsequence where all elements are equal (not necessarily contiguous).  
Return the maximum possible beauty of the array after all possible such operations.

### Examples  

**Example 1:**  
Input: `nums = [4,6,1,2]`, `k = 2`  
Output: `3`  
*Explanation:  
- We can adjust 4 to any value from 2 to 6, 6 to 4-8, 1 to -1 to 3, and 2 to 0-4.
- All of 4, 6, and 2 can be set to 4, so we get a subsequence [4,4,4] (length 3).*

**Example 2:**  
Input: `nums = [1,1,1,1], k = 10`  
Output: `4`  
*Explanation:  
- Each element can be set anywhere from -9 to 11, so all elements can easily be made equal.
- The whole array can become [x,x,x,x] (any x), so max beauty is 4.*

**Example 3:**  
Input: `nums = [10, 15, 7, 8, 20], k = 2`  
Output: `2`  
*Explanation:  
- Each element can vary by ±2.
- 7 and 8 overlap at [7,9], so can both become 8.
- 15 and 20, or 20 and 15, can't overlap; max subsequence where two intervals overlap is of length 2.*

### Thought Process (as if you’re the interviewee)  

- **Brute force:**  
  For each unique number x, try to convert as many elements as possible to x using at most one operation per element (change within [nums[i]-k, nums[i]+k]). Count for each x how many elements can be converted.  
  But x could be any integer in a large range, and brute forcing for every x is inefficient.

- **Optimized Approach:**  
  We realize that for nums[i], the possible values it can become are [nums[i]-k, nums[i]+k].  
  So for every nums[i], mark this interval.  
  The problem reduces to:  
  “Given n intervals, what is the maximum number of intervals overlapping at any integer point?”  
  This is a classic sweep line (prefix sum) or two pointers problem.

  1. For each interval [l, r], "add" +1 at l, and "remove" -1 at r+1 (using an array/map for prefix sum).
  2. Sweep through all points where intervals start or end, keep a running total of active intervals.
  3. The maximum running total is your answer.

  This technique avoids brute-forcing all possible x and leverages interval overlap.  
  Trade-off: We use O(n + range) time and O(range) space, where range is the difference between min(nums)-k and max(nums)+k.

### Corner cases to consider  
- Empty array → output 0.
- All elements equal, any k → entire array.
- k = 0: No changes, so answer is the count of the most frequent element.
- Large k: Any element can become any other, so answer is length of the array.
- Single element → answer is 1.
- Negative numbers: Handled same as positive due to integer range.

### Solution

```python
def maximumBeauty(nums, k):
    # Step 1: Build all intervals [num - k, num + k] for each number
    events = []
    for num in nums:
        left = num - k
        right = num + k
        # At left, +1 (interval starts)
        # At right+1, -1 (interval ends)
        events.append((left, 1))
        events.append((right + 1, -1))

    # Step 2: Sort the events by coordinate
    events.sort()

    # Step 3: Sweep line: track maximum overlap
    cur = 0
    max_beauty = 0
    for _, delta in events:
        cur += delta
        if cur > max_beauty:
            max_beauty = cur

    return max_beauty
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) for sorting the 2\*n events. Each other step is O(n).
- **Space Complexity:** O(n), storing 2\*n events. No extra large data structures used compared to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if k is very large (e.g., larger than any difference between numbers)?  
  *Hint: What does the interval for each element cover in the global range?*

- How would your solution change if only a contiguous *subarray* (not a subsequence) were allowed?  
  *Hint: Is sweep line or prefix sum still valid for subarrays?*

- Suppose the array is read-only and you can only use extra O(1) space. What approach would you use?  
  *Hint: Is this possible or do you always need to sweep or count in some way?*

### Summary
This problem uses the **sweep line / event (prefix sum) over interval endpoints** pattern to solve the "maximum overlap" problem. The reduction to overlapping intervals is very common, and the method avoids brute forcing for every integer value. This approach applies to other problems involving maximum overlapping intervals, booking, calendar meeting conflicts, or interval intersection counting.

### Tags
Array(#array), Binary Search(#binary-search), Sliding Window(#sliding-window), Sorting(#sorting)

### Similar Problems
- Maximum Size Subarray Sum Equals k(maximum-size-subarray-sum-equals-k) (Medium)
- Partition Array Such That Maximum Difference Is K(partition-array-such-that-maximum-difference-is-k) (Medium)