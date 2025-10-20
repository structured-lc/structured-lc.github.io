### Leetcode 334 (Medium): Increasing Triplet Subsequence [Practice](https://leetcode.com/problems/increasing-triplet-subsequence)

### Description  
Given an integer array, find out if there exists a **subsequence of three indices** \(i < j < k\) such that the values are **strictly increasing**:  
nums\[i\] < nums\[j\] < nums\[k\].  
You should return `True` if such a *triplet* exists in order; otherwise, return `False`.  
The sequence must use the original indices (you cannot reorder the array)[1][2].

### Examples  

**Example 1:**  
Input: `nums = [1, 2, 3, 4, 5]`  
Output: `True`  
*Explanation: The subsequence 1, 2, 3 (indices 0, 1, 2) is strictly increasing. Any triplet like 2, 3, 4 or 3, 4, 5 also works.*

**Example 2:**  
Input: `nums = [5, 4, 3, 2, 1]`  
Output: `False`  
*Explanation: The numbers are strictly decreasing, so no such triplet exists.*

**Example 3:**  
Input: `nums = [2, 1, 5, 0, 4, 6]`  
Output: `True`  
*Explanation: The subsequence 1, 4, 6 (indices 1, 4, 5) is strictly increasing. 0, 4, 6 (indices 3, 4, 5) also works.*

### Thought Process (as if you’re the interviewee)  

Let's think through this problem step by step:

- **Naive/brute-force idea:**  
  Try all possible triplets (i, j, k) with i < j < k. For each, check if nums\[i\] < nums\[j\] < nums\[k\].  
  This would be three nested loops, leading to O(n³) time. That's far too slow for large inputs.

- **Optimization:**  
  Can we do better?  
  We can look for a pattern similar to "longest increasing subsequence," but since we only care about triplets, we can traverse the array **just once**.

- **Efficient Approach (Optimal):**  
  Let's maintain two variables:
    - `first` = the smallest value found so far  
    - `second` = the smallest value found so far that is bigger than `first`
  
  As we iterate:
  - If the current number is less than or equal to `first`, update `first`
  - Else if the current number is less than or equal to `second`, update `second`
  - Else, if we find a number greater than both, we found a triplet
  
  This approach guarantees O(n) time and O(1) space[1][2][4].

- **Trade-off:**  
  No extra storage required beyond two variables.

### Corner cases to consider  
- Empty array  
- Array with fewer than 3 elements  
- All numbers equal (e.g. [1, 1, 1, 1])  
- Triplet appears late in the list (e.g. [10, 9, 5, 1, 2, 3])  
- Large negatives and positives  
- Array with increasing then decreasing numbers

### Solution

```python
def increasingTriplet(nums):
    # Edge case: less than 3 numbers, cannot have triplet
    if len(nums) < 3:
        return False

    # Initialize the smallest and middle values to infinity
    first = float('inf')
    second = float('inf')

    for n in nums:
        if n <= first:
            # Found new smallest value so far
            first = n
        elif n <= second:
            # Found a potential candidate for the second value
            second = n
        else:
            # Found a number bigger than both first and second
            # Means we found the increasing triplet
            return True
    # Finished iterating, no such triplet found
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n), where n is the length of the array. Each element is processed once.

- **Space Complexity:**  
  O(1), since only two extra variables are used regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to find the actual indexes or subsequence?
  *Hint: Track the last index when you update `first` and `second`.*

- How would you generalize this to an increasing subsequence of length k?
  *Hint: Look into patience sorting or dynamic programming.*

- What if elements may be equal and you want non-decreasing subsequence?
  *Hint: Adjust comparison from `<` to `<=` appropriately.*

### Summary
This is a classic greedy, linear scan problem—a variant of the "longest increasing subsequence," constrained to length 3.  
The solution uses a **greedy two-pass** variable update pattern—a common approach in subsequence search problems—which can also be generalized for longer fixed-length increasing subsequences.  
Patterns like this (tracking local minimums and mid-values) are broadly applicable to optimized, constant-space sequence problems.


### Flashcard
Track the smallest and second smallest values seen so far; if you find a number larger than both, an increasing triplet exists.

### Tags
Array(#array), Greedy(#greedy)

### Similar Problems
- Longest Increasing Subsequence(longest-increasing-subsequence) (Medium)
- Count Special Quadruplets(count-special-quadruplets) (Easy)
- Count Good Triplets in an Array(count-good-triplets-in-an-array) (Hard)
- Count Increasing Quadruplets(count-increasing-quadruplets) (Hard)