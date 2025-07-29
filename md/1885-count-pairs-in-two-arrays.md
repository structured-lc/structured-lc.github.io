### Leetcode 1885 (Medium): Count Pairs in Two Arrays [Practice](https://leetcode.com/problems/count-pairs-in-two-arrays)

### Description  
Given two integer arrays **nums1** and **nums2**, both of length *n*, count the number of index pairs (**i, j**) such that **i < j** and  
**nums1[i] + nums1[j] > nums2[i] + nums2[j]**.  
In other words, for every pair where the index of the first element is smaller than the index of the second, and the sum of the elements from **nums1** at these indices is strictly greater than the sum of the corresponding elements from **nums2**, count that pair.

### Examples  

**Example 1:**  
Input: `nums1 = [3,2,5]`, `nums2 = [2,2,1]`  
Output: `3`  
*Explanation: Valid pairs are (0,1): 3+2 > 2+2, (0,2): 3+5 > 2+1, (1,2): 2+5 > 2+1. All pairs (i, j) with i < j satisfy the condition.*

**Example 2:**  
Input: `nums1 = [2,1,2,1]`, `nums2 = [1,2,1,2]`  
Output: `2`  
*Explanation: Valid pairs are (0,2): 2+2 > 1+1 and (1,3): 1+1 > 2+2.*

**Example 3:**  
Input: `nums1 = [1,1,1]`, `nums2 = [2,2,2]`  
Output: `0`  
*Explanation: No pair (i, j) has nums1[i] + nums1[j] > nums2[i] + nums2[j].*

### Thought Process (as if you’re the interviewee)  
First, let's restate the condition:  
nums1[i] + nums1[j] > nums2[i] + nums2[j] for 0 ≤ i < j < n.

By rearranging,  
(nums1[i] − nums2[i]) + (nums1[j] − nums2[j]) > 0.

Define diff[i] = nums1[i] − nums2[i].

So, the problem becomes: For how many pairs (i, j), i < j, does diff[i] + diff[j] > 0.

**Brute-force approach:**  
Check every i < j and compute diff[i] + diff[j], counting those > 0. Time complexity is O(n²).

**Optimization:**  
- Precompute diff array.
- **Sort diff.** For each i, look for the number of j > i where diff[i] + diff[j] > 0, i.e., diff[j] > −diff[i].
- Use **binary search** to find the first such j for each i, then sum up the counts.

This reduces time complexity to O(n log n): O(n log n) for sorting, and for each i, O(log n) for binary search.

**Trade-off:**  
Brute-force is simple but slow for large inputs. The optimized approach balances clarity, efficiency, and is standard for "pair sum" problems.

### Corner cases to consider  
- Arrays of length 0 or 1 (no pairs possible)
- All elements are the same in both arrays (no pairs will satisfy the condition)
- Negative numbers in arrays
- Large positive and negative values (to test sum overflow and sign)
- Repeated values in nums1 or nums2

### Solution

```python
def countPairs(nums1, nums2):
    n = len(nums1)
    # Step 1: Compute the difference array
    diff = [nums1[i] - nums2[i] for i in range(n)]
    
    # Step 2: Sort the difference array
    diff.sort()
    
    count = 0
    
    # For each i, count number of j > i such that diff[i] + diff[j] > 0
    for i in range(n - 1):
        # Target: diff[j] > -diff[i]
        left, right = i + 1, n
        while left < right:
            mid = left + (right - left) // 2
            if diff[mid] > -diff[i]:
                right = mid
            else:
                left = mid + 1
        count += n - left
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  - O(n) to build the diff array  
  - O(n log n) to sort  
  - For each i, binary search in O(log n), total O(n log n)  
  - So, total is O(n log n).

- **Space Complexity:** O(n)  
  - Extra space for the diff array and sorting it.

### Potential follow-up questions (as if you’re the interviewer)  

- If the arrays are very large (can’t fit into memory), how would you count pairs efficiently?  
  *Hint: Can you use streaming/partitioning or distributed processing?*

- Can you solve the problem **online** (as numbers arrive one by one)?  
  *Hint: Use data structures like Binary Indexed Tree or balanced BST.*

- How would you count pairs where the sum is at least zero instead of strictly greater than zero?  
  *Hint: Adjust your binary search and boundary handling.*

### Summary
The approach uses a common coding pattern: transform the sum condition into a problem about **pair sums** over a transformed array, then use sorting and binary search to count valid pairs efficiently (O(n log n)). This “reduce-to-sorted-array + binary search for pair counts” is a standard trick for problems like “count pairs satisfying X + Y > threshold”, and is useful in other contexts like 2-sum, reverse pairs, and range count problems.