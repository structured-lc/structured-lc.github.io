### Leetcode 955 (Medium): Delete Columns to Make Sorted II [Practice](https://leetcode.com/problems/delete-columns-to-make-sorted-ii)

### Description  
Given a list of *equal-length* strings, you may delete any subset of columns. After deleting those columns, the resulting array of strings must be **sorted lexicographically** (row-wise from top to bottom).   
Return the *minimum* number of columns needed to delete to achieve this.

### Examples  

**Example 1:**  
Input: `strs = ["ca","bb","ac"]`  
Output: `1`  
Explanation: Remove the **first** column. Result is ["a","b","c"]; this is sorted lexicographically.

**Example 2:**  
Input: `strs = ["xc","yb","za"]`  
Output: `0`  
Explanation: Already sorted: "xc" < "yb" < "za". No deletions needed.

**Example 3:**  
Input: `strs = ["zyx","wvu","tsr"]`  
Output: `3`  
Explanation: Need to delete all columns to get ["","",""]. Any other choice leaves strings out of order.

### Thought Process (as if you’re the interviewee)  
First, the problem is about making the *rows* sorted by deleting as few columns as possible.  
A brute-force approach would be to try every subset of columns, delete them, and check if what's left is sorted. This is **exponential** and infeasible.

To optimize, I observe that as we proceed from left to right, for each column, we can check if keeping it would violate the sorted order among *any* adjacent strings that aren't already “locked sorted” by previous columns.  
If a column is “bad” (makes some pair unsorted), we must delete it. If it is not, and adds new sorted pairs, we should “lock” (mark) those adjacent pairs as sorted, and avoid further comparisons for them.

We use a greedy approach:
- For each column j, if any *still unsorted* pair i has strs[i][j] > strs[i+1][j], we must delete this column (increment res, break to next column).
- If no such pair, then for all i where strs[i][j] < strs[i+1][j], we mark this pair as sorted (no further need to compare them).
- Continue until all columns are processed.

We keep a boolean array “sorted” of length m-1 to track if adjacent (i,i+1) are already sorted due to a prior column.

This greedy is safe: Once a pair is sorted earlier, further columns can't make them unsorted.

### Corner cases to consider  
- Empty string list (`strs=[]`) or single string (no deletion needed)
- All rows are already sorted (output=0)
- All characters are the same
- Strings differ in the last character only
- Deleting all columns yields empty strings (always sorted)

### Solution

```python
def minDeletionSize(strs):
    m = len(strs)
    n = len(strs[0]) if m > 0 else 0
    res = 0
    sorted_pairs = [False] * (m - 1)   # sorted_pairs[i] == True if strs[i] < strs[i+1], “locked”

    for j in range(n):
        # Check if this column breaks any unsorted pair
        should_delete = False
        for i in range(m - 1):
            if not sorted_pairs[i] and strs[i][j] > strs[i+1][j]:
                res += 1
                should_delete = True
                break
        if should_delete:
            continue  # Go to next column

        # No break: update sorted pairs if the new column sorts some
        for i in range(m - 1):
            if strs[i][j] < strs[i+1][j]:
                sorted_pairs[i] = True

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m), where n = #columns, m = #rows. For each column, we compare all adjacent row pairs.
- **Space Complexity:** O(m) for the sorted_pairs array.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose you need to return which columns to delete, not just the minimal count.  
  *Hint: Track deleted column indices.*

- What if the input strings are *not* equal-length?  
  *Hint: Can you still align columns?*

- How would the approach change if lexicographic order was case-insensitive or locale-dependent?  
  *Hint: You’d need custom char comparison functions.*

### Summary
This is a classic **greedy column-by-column** check, relying on logical marks to eliminate unnecessary future comparisons.  
The “lock adjacency” trick is also used in problems like “Merge Intervals”, “Tracking Sorted Slices”, etc.  
Key insight: Delete only columns that necessarily cause disorder, and track sorted pairs to minimize redundant checks.


### Flashcard
For each column left to right, if any unsorted adjacent pair exists, mark column for deletion and lock sorted pairs.

### Tags
Array(#array), String(#string), Greedy(#greedy)

### Similar Problems
