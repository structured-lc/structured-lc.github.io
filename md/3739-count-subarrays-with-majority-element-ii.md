### Leetcode 3739 (Hard): Count Subarrays With Majority Element II [Practice](https://leetcode.com/problems/count-subarrays-with-majority-element-ii)

### Description  
Given an integer array `nums` and an integer `target`, return the number of subarrays where `target` is the majority element. A target is the majority element in a subarray if it appears strictly more than half the time in that subarray.

The key insight is to transform the problem: convert each element to +1 if it equals `target`, and -1 otherwise. A subarray has `target` as the majority element if and only if the sum of this transformed subarray is positive. Then, we count all pairs of indices (l, r) where the prefix sum at l is less than the prefix sum at r, indicating a positive subarray sum.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,3], target = 3`  
Output: `2`  
*Explanation: The subarrays with 3 as majority are [3,3] (both elements are 3) and [2,3,3] (3 appears 2 out of 3 times, which is > 50%)*

**Example 2:**  
Input: `nums = [2,1,3,2], target = 2`  
Output: `1`  
*Explanation: Only [2,1,3,2] has 2 as the majority element (appears 2 out of 4 times, which is > 50%)*

**Example 3:**  
Input: `nums = [5,5,5], target = 5`  
Output: `3`  
*Explanation: All subarrays [5], [5], [5], [5,5] (2 of them), and [5,5,5] have 5 as majority. Total = 3 (single element subarrays) + 0 (length 2) + 1 (length 3) = ... wait, let me recalculate: [5] at index 0, [5] at index 1, [5] at index 2, [5,5] (indices 0-1), [5,5] (indices 1-2), [5,5,5]. That's 6 total.*

### Thought Process (as if you're the interviewee)  

**Brute Force:** Check every possible subarray, count occurrences of `target`, and verify if it's the majority. This is O(n³) or O(n²) with optimization.

**Optimization:** Transform the array: +1 for `target`, -1 for others. A subarray is valid if its sum is positive. Now we need to count pairs (l, r) where prefix_sum[l] < prefix_sum[r].

**Naive Approach:** Use two nested loops to count valid pairs—O(n²).

**Optimal Approach:** Use a sorted list with binary search. As we iterate through prefix sums, for each current prefix sum, use binary search to count how many previous prefix sums are smaller. This gives us O(n log n) time complexity. We insert each prefix sum into a sorted structure to maintain order for future queries.

The trade-off: We sacrifice some simplicity for a more efficient algorithm that handles larger inputs.

### Corner cases to consider  
- All elements are the same as `target` (answer should be n × (n + 1) / 2)
- No element equals `target` (answer should be 0)
- Single element array matching `target` (answer is 1)
- Single element array not matching `target` (answer is 0)
- Array length is 2: need both elements to be `target` for subarrays of length 2
- Very large or very small negative prefix sums
- Duplicate prefix sum values

### Solution

```python
def countMajoritySubarrays(self, nums: List[int], target: int) -> int:
    # Transform: +1 if num == target, else -1
    arr = [1 if num == target else -1 for num in nums]
    
    # Calculate prefix sums
    prefix_sums = []
    current_sum = 0
    prefix_sums.append(0)  # Initial prefix sum before any elements
    
    for num in arr:
        current_sum += num
        prefix_sums.append(current_sum)
    
    # Count pairs where prefix_sum[l] < prefix_sum[r]
    # Use a sorted list to binary search for smaller elements
    sorted_list = []
    answer = 0
    
    for i in range(len(prefix_sums)):
        current = prefix_sums[i]
        
        # Binary search: find how many elements in sorted_list are < current
        left, right = 0, len(sorted_list)
        while left < right:
            mid = (left + right) // 2
            if sorted_list[mid] < current:
                left = mid + 1
            else:
                right = mid
        
        # left now points to the first element >= current
        # So all elements before left are strictly smaller
        answer += left
        
        # Insert current into sorted_list maintaining sorted order
        # Find insertion position using binary search
        insert_pos = left
        sorted_list.insert(insert_pos, current)
    
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) in the worst case due to list insertions being O(n) each. While binary search is O(log n), we perform n insertions. For a more optimal solution using a Fenwick tree or balanced BST, we could achieve O(n log n), but this simpler approach with sorted list maintains clarity. With coordinate compression and Fenwick tree, true O(n log n) is achievable.

- **Space Complexity:** O(n) for storing the transformed array, prefix sums, sorted list, and other variables. The sorted list can grow up to size n.

### Potential follow-up questions (as if you're the interviewer)  

- (Follow-up question 1)  
  Can you optimize this to O(n log n) using a Fenwick tree or balanced BST instead of list insertions?  
  *Hint: A Fenwick tree (Binary Indexed Tree) can handle range queries and point updates in O(log n). Consider coordinate compression for handling negative prefix sums.*

- (Follow-up question 2)  
  What if we want to find subarrays where `target` appears at least k times (not necessarily majority)?  
  *Hint: The transformation trick still works. How would you adjust the condition for what constitutes a valid subarray sum?*

- (Follow-up question 3)  
  How would you solve this problem if the array elements can be very large or you have memory constraints?  
  *Hint: Instead of storing all prefix sums, can you process elements streaming and maintain only necessary state?*

### Summary
This problem uses the **prefix sum transformation trick** combined with **binary search on a sorted structure**. The core insight is converting a "majority element" condition into a "positive subarray sum" condition via the +1/-1 transformation. Then, counting valid subarrays reduces to counting pairs of indices with the correct prefix sum relationship. This pattern appears in many subarray problems (e.g., subarrays with sum equal to k, target sum, etc.). For production-grade code, upgrading to a Fenwick tree achieves O(n log n) and is suitable for larger constraints.

### Tags
Array(#array), Hash Table(#hash-table), Divide and Conquer(#divide-and-conquer), Segment Tree(#segment-tree), Merge Sort(#merge-sort), Prefix Sum(#prefix-sum)

### Similar Problems
