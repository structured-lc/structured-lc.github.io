### Leetcode 3316 (Medium): Find Maximum Removals From Source String [Practice](https://leetcode.com/problems/find-maximum-removals-from-source-string)

### Description  
Given a string **source**, a string **pattern** (which is a subsequence of **source**), and a list of indices **targetIndices**, find the maximum number of characters you can remove from **source** (only at positions given by **targetIndices**) so that **pattern** is still a subsequence of the resulting string.  
Return this maximum number of removable characters.

### Examples  

**Example 1:**  
Input:  
source=`"abcacb"`,  
pattern=`"ab"`,  
targetIndices=`[3,1,0]`  
Output: `2`  
*Explanation: Remove indices 3 and 1 ("c" and "b"), yielding "aacb". "ab" is still a subsequence. Removing one more would eliminate "a" or "b", breaking the pattern.*

**Example 2:**  
Input:  
source=`"abcbddddd"`,  
pattern=`"abcd"`,  
targetIndices=`[3,2,1,4,5,6]`  
Output: `1`  
*Explanation: Only index 3 ("b") can be removed while keeping "abcd" as subsequence. Removing further indices disrupts the pattern.*

**Example 3:**  
Input:  
source=`"abcab"`,  
pattern=`"abc"`,  
targetIndices=`[0,1,2,3,4]`  
Output: `3`  
*Explanation: Remove indices 0, 1, and 2, yielding "ab". "abc" is no longer present after 3 deletions, so max is 2. (Pattern becomes unmatchable after 3 removals.)*

### Thought Process (as if you’re the interviewee)  
First, I would try a brute-force approach, checking every possible combination of deletions, but this is clearly exponential and not feasible.

Noticing that we can only remove characters at **given indices**, and must retain the order of remaining characters, I look for a more systematic method. The central challenge is to test, for a given number **k** (deletions), if **pattern** is still a subsequence after deleting the first **k** indices in **targetIndices**.

To do this efficiently, we can use binary search on the possible values of **k**, from 0 up to len(targetIndices):

- For each **k**, mark the first **k** indices as removed, and check if **pattern** is a subsequence of **source** after removals.
- Checking "is pattern a subsequence of modified source" can be done in O(n) time with two pointers.

Thus, the total time is O(log M × (N+L)), where **M** is the length of **targetIndices**, **N** source length, and **L** pattern length.

There is also a DP approach, but the binary search + greedy check is both more intuitive to implement and efficient.

### Corner cases to consider  
- **Empty pattern:** Always a subsequence, return len(targetIndices).
- **pattern longer than source:** Always impossible, return 0.
- **targetIndices is empty:** Cannot remove any, so answer is 0.
- **Indices out of order in targetIndices:** (Assumed they are always valid as per problem.)
- **Duplicate indices in targetIndices:** Should ideally not happen, but if so, second deletion is irrelevant.
- All characters removed so nothing remains to match.

### Solution

```python
def maxRemovals(source: str, pattern: str, targetIndices: list[int]) -> int:
    # Helper that returns True if pattern is a subsequence after removing first k indices in targetIndices
    def is_subseq(k: int) -> bool:
        removed = set(targetIndices[:k])
        s_ptr, p_ptr = 0, 0
        while s_ptr < len(source) and p_ptr < len(pattern):
            if s_ptr in removed:
                s_ptr += 1
                continue
            if source[s_ptr] == pattern[p_ptr]:
                p_ptr += 1
            s_ptr += 1
        return p_ptr == len(pattern)
    
    # Binary search the max k that works
    left, right = 0, len(targetIndices)
    ans = 0
    while left <= right:
        mid = (left + right) // 2
        if is_subseq(mid):
            ans = mid
            left = mid + 1
        else:
            right = mid - 1
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log M × (N+L)), where M = len(targetIndices), N = len(source), L = len(pattern). Each binary search step costs O(N+L).
- **Space Complexity:** O(M) for the set of removed indices, plus O(1) extra storage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you can remove characters from any indices, not just targetIndices?  
  *Hint: Consider all possible subsets; the problem would likely become NP-hard or require a different approach.*

- How would you optimize if source or targetIndices is very large?  
  *Hint: Consider prefix sums or segment trees to map removals efficiently or cache subsequence checks.*

- Can you reconstruct which indices to remove for the optimal removal, not just count?  
  *Hint: Store the last successful k and the actual indices you removed; trace through the is_subseq process.*

### Summary
This problem uses the classic "binary search on the answer" pattern in combination with a two-pointer subsequence check. It's an example of the feasibility search technique—efficiently searching the maximal limit for an operation under constraints. These ideas are widely applicable for problems where a predicate can be checked in deterministic time, and you need the maximal/minimal such that the predicate remains true (e.g., longest subarray, max/min resource thresholds, etc.).

### Tags
Array(#array), Hash Table(#hash-table), Two Pointers(#two-pointers), String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Delete Characters to Make Fancy String(delete-characters-to-make-fancy-string) (Easy)