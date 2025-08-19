### Leetcode 278 (Easy): First Bad Version [Practice](https://leetcode.com/problems/first-bad-version)

### Description  
Suppose you are a product manager leading a team developing a product with versions number `1` to `n`. Unfortunately, one version fails quality check and every version developed after that is also bad (because they're based on the prior version). Given an API called `isBadVersion(version: int) -> bool` that tells you if a version is bad, your task is to find the **smallest version number** which is bad, i.e., the first bad version. You want to do this using as few calls to the API as possible (minimize `isBadVersion()` calls).

### Examples  

**Example 1:**  
Input: `n = 5, first bad version = 4`  
Output: `4`  
*Explanation: Versions 1-3 are good (`False`), version 4 is bad (`True`), and so is 5. The function returns 4 as the first bad version.*

**Example 2:**  
Input: `n = 1, first bad version = 1`  
Output: `1`  
*Explanation: The only version is bad, so the answer is 1.*

**Example 3:**  
Input: `n = 10, first bad version = 7`  
Output: `7`  
*Explanation: Versions 1-6 are good, versions 7-10 are all bad. The function returns 7 as the first bad version.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  - Check each version from 1 to n by calling `isBadVersion(i)` for every i.
  - Return the first i for which it is true.
  - Drawback: Potentially up to n calls; not efficient for large n.

- **Optimization:**  
  - Since versions after a bad one are always bad, the sequence is “good, good, ..., bad, bad...”.
  - This is a classic place to use **binary search** to minimize API calls.
  - Use two pointers: `left` at 1, `right` at n.
  - While `left < right`:
    - Check middle version (`mid = left + (right - left) // 2`).
    - If mid is bad, the first bad is at mid or before (`right = mid`).
    - Otherwise, the first bad is after mid (`left = mid + 1`).
  - When the while loop ends, `left` (or `right`) will be pointing to the first bad version.

- **Trade-Offs:**
  - Binary search reduces the number of API calls from O(n) down to O(log n), which is optimal for this monotonic property.

### Corner cases to consider  
- n = 1 (single version, could be good or bad)
- First bad version is the very first version (1)
- First bad version is the last version (n)
- All versions are good (should not occur per constraints, but good to test)
- Very large n (ensure algorithm doesn’t overflow or use excessive calls)

### Solution

```python
# The isBadVersion API is already defined in the problem.
# def isBadVersion(version: int) -> bool:

def firstBadVersion(n: int) -> int:
    left, right = 1, n
    while left < right:
        # Prevent potential overflow for large n
        mid = left + (right - left) // 2
        if isBadVersion(mid):
            # mid could be the first bad version
            right = mid
        else:
            # first bad version must be after mid
            left = mid + 1
    # After loop, left == right and points at first bad version
    return left
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n) — Each check halves the search space. Binary search makes at most ⌈log₂ n⌉ API calls.
- **Space Complexity:** O(1) — Only constant extra space for pointers/variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if isBadVersion is very expensive?  
  *Hint: Can you cache previously tested results in memory?*

- What if versions are labeled with arbitrary integers, not 1 to n, but you can query in O(1) time by label?  
  *Hint: Convert to an array and use binary search on indices.*

- If you had access to the entire array of statuses (good/bad) rather than an API, how would your solution change?  
  *Hint: Standard binary search, but with direct indexing instead of API calls.*

### Summary
This problem is a direct application of **binary search** for monotonic sequences (once bad, always bad). The coding pattern applies anywhere you need to find the first occurrence of a property in a sorted or monotonic range (e.g., first true in a list of bools, minimum index meeting some condition). It's a foundational interview pattern for range-based searching and API call minimization.

### Tags
Binary Search(#binary-search), Interactive(#interactive)

### Similar Problems
- Find First and Last Position of Element in Sorted Array(find-first-and-last-position-of-element-in-sorted-array) (Medium)
- Search Insert Position(search-insert-position) (Easy)
- Guess Number Higher or Lower(guess-number-higher-or-lower) (Easy)