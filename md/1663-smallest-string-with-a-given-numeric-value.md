### Leetcode 1663 (Medium): Smallest String With A Given Numeric Value [Practice](https://leetcode.com/problems/smallest-string-with-a-given-numeric-value)

### Description  
Given two integers, **n** and **k**, construct the lexicographically smallest string of length n where the sum of the numeric values of its characters is k. Each lowercase letter has value as its position in the alphabet (a = 1, b = 2, ..., z = 26).

### Examples  

**Example 1:**  
Input: `n = 3, k = 27`  
Output: `aay`  
*Explanation: Values: a(1), a(1), y(25) ⇒ 1 + 1 + 25 = 27. "aay" is the smallest lexicographically.*

**Example 2:**  
Input: `n = 5, k = 73`  
Output: `aaszz`  
*Explanation: a(1), a(1), s(19), z(26), z(26) ⇒ 1+1+19+26+26=73.*

**Example 3:**  
Input: `n = 2, k = 5`  
Output: `ad`  
*Explanation: a(1), d(4); smallest lexicographically (cannot use 'e' because that alone is 5, but 'ad' is smaller than 'ea').*


### Thought Process (as if you’re the interviewee)  
We want the **smallest lexicographically** string. That means: fill as many 'a's as possible at the left positions, then when needed, start placing higher value letters from the right.

- For each position from the **end**, choose the largest letter possible (but not more than z), so that the sum remains k when all positions are filled. 
- This is like distributing k - n remaining value after putting 'a' everywhere, starting to upgrade from the end.
- For each index from n-1 to 0, if k > i + 1, set s[i] = min(26, k - i), subtract its value from k, repeat.

### Corner cases to consider  
- n = 1 (single character)
- k = n (all 'a's)
- k is much larger than n (many 'z's needed)
- If k or n is out of bounds (should not happen by constraints, but worth noting)

### Solution

```python
def getSmallestString(n, k):
    # Start with n 'a's (minimum possible value for each position)
    res = ['a'] * n
    # Adjust from the end
    i = n - 1
    k -= n  # since each 'a' is already counted as 1
    while k > 0:
        # Place as much as possible at res[i], but not more than 25 (z=26)
        add = min(25, k)
        res[i] = chr(ord('a') + add)
        k -= add
        i -= 1
    return ''.join(res)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), we process every position once.
- **Space Complexity:** O(n), output array size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you construct the lexicographically largest string under the same constraints?  
  *Hint: Try placing large characters to the leftmost positions.*

- Can this process be done in-place or with O(1) extra space (aside from the output string)?  
  *Hint: Yes, since the solution does not need extra data structures.*

- What if the value mapping for characters changes (e.g., "a" = 2, "b" = 4, ...)?  
  *Hint: You need a custom value table and possibly a different greedy distribution.*

### Summary
The approach is greedy, filling from the end with the largest possible valid letter while keeping earlier positions as small as possible (to guarantee lexicographic minimality). This is a common **greedy + constructive building from ends** problem pattern.

### Tags
String(#string), Greedy(#greedy)

### Similar Problems
