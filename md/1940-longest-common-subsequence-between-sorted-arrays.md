### Leetcode 1940 (Medium): Longest Common Subsequence Between Sorted Arrays [Practice](https://leetcode.com/problems/longest-common-subsequence-between-sorted-arrays)

### Description  
Given an array of integer arrays, each being sorted in strictly increasing order, return the longest subsequence (elements in order, not necessarily consecutive) that is present in every array.  
A subsequence is a sequence that can be derived from another sequence by deleting some elements (possibly none) without changing the order of the remaining elements.

### Examples  

**Example 1:**  
Input: `arrays = [[1,3,4], [1,4,7,9]]`  
Output: `[1,4]`  
Explanation: Both arrays contain 1 and 4, in order.

**Example 2:**  
Input: `arrays = [[2,3,6,8], [1,2,3,5,6,7,10], [2,3,4,6,9]]`  
Output: `[2,3,6]`  
Explanation: 2, 3, and 6 appear in all three arrays, and in order.

**Example 3:**  
Input: `arrays = [[1,2,3,4,5], [6,7,8]]`  
Output: `[]`  
Explanation: No element is present in both arrays.

### Thought Process (as if you’re the interviewee)  
- **Naive approach:**  
  Try all possible subsequences of one array, and check for each if they exist (in order) as subsequences in every other array.  
  This has exponential time complexity and is not practical due to the constraints.

- **Observation and optimization:**  
  Because every array is strictly increasing and contains no duplicates, any common element must appear at most once in each array.  
  The only possible common subsequence is simply the set of elements that appears in all arrays, in their natural order.

- **Efficient approach:**  
  - Count how many arrays each element appears in, using a hashmap (or a counter array).
  - For each element, if it appears in all arrays (count == number of arrays), include it in the answer.  
  - Since order is preserved and there are no duplicates within the same array, this guarantees correctness.  
  - This method runs in O(total number of elements) time.

### Corner cases to consider  
- One or more empty arrays: answer must be `[]`.
- Only one array: the answer is the array itself.
- Arrays with no common elements: answer is `[]`.
- All arrays are exactly the same: answer is that array.
- Only one common element existing.
- Array elements are at the boundary (min/max values).

### Solution

```python
def longestCommonSubsequence(arrays):
    # Count how many arrays each number appears in
    from collections import defaultdict

    count = defaultdict(int)
    n_arrays = len(arrays)

    for arr in arrays:
        # Use a set here to avoid double counting within a single array
        for num in set(arr):
            count[num] += 1

    # Output numbers that appear in all arrays, sorted in increasing order
    result = []
    for num in sorted(count):
        if count[num] == n_arrays:
            result.append(num)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the total number of elements in all arrays.  
  - Each element is visited once, and sorting is over at most 100 different numbers (since 1 ≤ arrays[i][j] ≤ 100).
- **Space Complexity:** O(M), where M is the number of distinct numbers across all arrays (at most 100 due to constraints).  
  - Extra storage for counting and for the output array.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the arrays are not sorted?  
  *Hint: How does element order change your approach?*

- What if the arrays can have duplicate numbers?  
  *Hint: Would you need to track counts differently?*

- How would your solution change if input size increases dramatically (e.g., much larger arrays, possibly not all integers 1..100)?  
  *Hint: Focus on reducing memory or using disk-based processing.*

### Summary
This problem uses the **hash counting** or **frequency map** pattern, capitalizing on the property that all arrays are strictly increasing and have no duplicates within themselves. The approach scans each array and notes how often each number appears across all arrays, then extracts those appearing in all arrays (i.e., count == number of arrays) in sorted order. This technique is broadly applicable for intersection problems, especially when the range of possible values is constrained and elements are unique per list.