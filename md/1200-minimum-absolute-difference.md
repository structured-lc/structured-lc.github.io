### Leetcode 1200 (Easy): Minimum Absolute Difference [Practice](https://leetcode.com/problems/minimum-absolute-difference)

### Description  
Given an array of **distinct integers**, find all pairs of elements whose absolute difference equals the *minimum absolute difference* among all possible pairs in the array. Each output pair should be in the form [a, b] with a < b, and the list of pairs must be sorted in ascending order (by a, then b).

### Examples  

**Example 1:**  
Input: `[4,2,1,3]`  
Output: `[[1,2],[2,3],[3,4]]`  
*Explanation: Sort to [1,2,3,4]. The minimum absolute difference between consecutive elements is 1 (2−1, 3−2, 4−3). All such pairs are included.*

**Example 2:**  
Input: `[1,3,6,10,15]`  
Output: `[[1,3]]`  
*Explanation: Sorted array is [1,3,6,10,15]. The smallest gap is 2 (3−1 = 2), so only [1,3] is output.*

**Example 3:**  
Input: `[3,8,-10,23,19,-4,-14,27]`  
Output: `[[-14,-10],[19,23],[23,27]]`  
*Explanation: Sorted array is [-14, -10, -4, 3, 8, 19, 23, 27]. The minimum gap is 4: (-10)-(-14), 23-19, 27-23.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  - Try all possible pairs (i, j), compute absolute differences, find minimum, then collect all such pairs.
  - But this takes O(n²) time — too slow for large arrays.

- **Optimized Approach:**  
  - If we sort the array, the smallest absolute differences can only occur between **consecutive elements**.
  - Iterate once to find the minimum difference between any two consecutive numbers.
  - In a second pass, collect all consecutive pairs with this minimum difference.
  - Sorting takes O(n log n), scanning is O(n), so total is efficient.

- **Why this works:**  
  - Since the array is composed of distinct integers, the closest values are always neighbors when sorted.

### Corner cases to consider  
- Array has exactly 2 elements: always output that pair.
- Array contains negative, zero, positive values.
- Multiple pairs may have the same minimum absolute difference.
- Minimum and maximum possible input values (limits).
- Very large input size (test efficiency).

### Solution

```python
def minimumAbsDifference(arr):
    # Step 1: Sort the input array
    arr.sort()
    
    # Step 2: Initialize minimum difference to a very large value
    min_diff = float('inf')
    
    # Step 3: Find the minimum absolute difference between consecutive elements
    for i in range(1, len(arr)):
        diff = arr[i] - arr[i-1]
        if diff < min_diff:
            min_diff = diff
    
    # Step 4: Collect all pairs that have the minimum absolute difference
    result = []
    for i in range(1, len(arr)):
        if arr[i] - arr[i-1] == min_diff:
            result.append([arr[i-1], arr[i]])
    
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Sorting the array: O(n log n)
  - Linear pass to find min diff: O(n)
  - Linear pass to collect pairs: O(n)
  - **Overall:** O(n log n)

- **Space Complexity:**  
  - O(1) extra space (ignoring output), or O(n) if considering the output list.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input array contains duplicate values?  
  *Hint: The problem assumes all elements are distinct. If not, how would you handle duplicates and zero difference?*

- How would you modify the algorithm if you only needed to return *one* such pair?  
  *Hint: Stop after finding the first pair during the collecting phase.*

- How can the algorithm be adjusted to work if the numbers are presented in a stream?  
  *Hint: You’d need to keep track of seen values and the current minimum difference as the stream progresses. Consider using a data structure for fast neighbor search, e.g., a balanced BST.*

### Summary
This problem uses the **sorting** and **adjacent pair comparison** pattern, a common coding pattern for difference/gap problems with distinct values. It leverages the fact that after sorting, the minimum difference must exist between two consecutive numbers. This pattern can also apply to other problems involving closest or farthest pairs or detecting duplicates in a range.

### Tags
Array(#array), Sorting(#sorting)

### Similar Problems
- Minimum Cost of Buying Candies With Discount(minimum-cost-of-buying-candies-with-discount) (Easy)
- Minimize the Maximum Difference of Pairs(minimize-the-maximum-difference-of-pairs) (Medium)