### Leetcode 1533 (Medium): Find the Index of the Large Integer [Practice](https://leetcode.com/problems/find-the-index-of-the-large-integer)

### Description  
You are given an interface for an array of unknown values. You can only access two things: `reader.length()` (returns the length n), and `reader.compareSub(l1, r1, l2, r2)`. The compare function returns:
- `1` if the sum of subarray `[l1, r1]` is greater than `[l2, r2]`
- `-1` if the sum of subarray `[l1, r1]` is less than `[l2, r2]`
- `0` if they are equal.
You are guaranteed that there is exactly one index whose value is larger than every other value.

You need to find and return the index of this largest integer, using only the above interface, efficiently.

### Examples  

**Example 1:**  
Input: `arr = [7,7,7,7,10,7,7,7]`  
Output: `4`  
*Explanation: 10 at index 4 is larger than all other equal numbers, so return 4.*

**Example 2:**  
Input: `arr = [1,1,7,1,1,1]`  
Output: `2`  
*Explanation: 7 is at index 2, all other values are the same.*

**Example 3:**  
Input: `arr = [5,3,2,3,5,6,5,5,5]`  
Output: `5`  
*Explanation: 6 is the unique maximum at index 5.*

### Thought Process (as if you’re the interviewee)  
My brute force idea would be to:
- Compare each index to every other, or sum over various subarrays — but this would result in O(n²) or O(n) time with many queries.

However, the problem guarantees that only ONE element is truly larger, and we have an API that helps compare subarrays very quickly. This suggests a **binary search variant**:
- At each step, we split the index range into two (or three) parts and compare their sums.
- If the sums are equal, the unique largest index is in the remaining part.
- If one sum is greater, the largest must be in that part.
- This reduces our search range each time, achieving O(log n) queries.

**Why three parts, not two?**
- If n is even, dividing in half is fine.
- If n is odd, splitting evenly isn't possible; so we cut into three as equal as possible. That way, the unique max index must exist in just one part.

### Corner cases to consider  
- n = 1 (single-element array) — should trivially return index 0.
- All values except one are equal.
- The unique largest integer is at index 0 or n-1 (edge positions).
- Array with minimum allowed length.
- Array with odd and even lengths.

### Solution

```python
# Only the reader interface is allowed; do not use built-in sum or max.

class Solution:
    def getIndex(self, reader) -> int:
        left = 0
        right = reader.length() - 1

        while left < right:
            length = right - left + 1

            # Partition the interval into two halves
            half = length // 2
            # If odd, one side will be longer by 1
            l1 = left
            r1 = left + half - 1
            l2 = left + half
            r2 = right

            # If total number is odd, left and right sections are not equal in length
            if (length % 2) == 0:
                # Equal length, compare directly
                cmp = reader.compareSub(l1, r1, l2, r2)
                if cmp == 1:
                    right = r1
                else:
                    left = l2
            else:
                # Odd length; left (half) vs right (half), the extra element is at l2
                cmp = reader.compareSub(l1, r1, l2+1, r2)
                if cmp == 0:
                    # Unique max is the extra element
                    return l2
                elif cmp == 1:
                    right = r1
                else:
                    left = l2+1

        return left
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n)  
At every step, we halve the search range or reduce it by about half, leading to about log₂n iterations.

- **Space Complexity:** O(1)  
No extra storage used besides a few integer pointers.

### Potential follow-up questions (as if you’re the interviewer)  

- What changes if the array can have multiple equally largest elements?  
  *Hint: Could your logic still uniquely identify one?*

- Can you modify the approach to find all indexes with the largest integer?  
  *Hint: After finding one, could you do further passes?*

- What if you can only call compareSub a fixed (constant) number of times?  
  *Hint: Is randomization or early stopping possible in some variants?*

### Summary
This problem is a nice example of **binary search on an answer space**, adapting to a "black-box" array with restricted queries. The partitioning and subarray comparisons are commonly used in "find a unique outlier" questions, and similar logic applies to majority element problems and search-in-unknown APIs. This approach is directly portable to many "find the unique element" paradigms, especially when only custom or expensive access to data is allowed.