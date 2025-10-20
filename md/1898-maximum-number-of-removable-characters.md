### Leetcode 1898 (Medium): Maximum Number of Removable Characters [Practice](https://leetcode.com/problems/maximum-number-of-removable-characters)

### Description  
Given two strings, **s** and **p**, where **p** must be a subsequence of **s**, and an integer array **removable** containing indices in **s**. You can remove up to **k** characters from **s** by erasing the characters at the first **k** indices given in **removable** (in order). Your task is to find the maximum **k** such that, after these removals, **p** is still a subsequence of **s**.  
A subsequence of a string is a sequence formed by deleting some (possibly zero) characters without changing the order of the remaining characters.

### Examples  

**Example 1:**  
Input:  
`s = "abcacb", p = "ab", removable = [3,1,0]`  
Output:  
`2`  
Explanation:  
Remove the 3ʳᵈ and 1ˢᵗ indices ("a" and "b").  
s becomes: "_ b c _ c b" (positions 3 and 1 removed).  
Now, p = "ab".  
After skipping the removed, "c c b" does not have "a", so "ab" cannot be found for k = 3. But for k = 2, after removing positions 3 and 1, s = "_ _ c a c b", "ab" is still a subsequence (from positions 4,5). So, maximum k is 2.

**Example 2:**  
Input:  
`s = "abcbddddd", p = "abcd", removable = [3,2,1,4,5,6]`  
Output:  
`1`  
Explanation:  
For k=1, remove index 3 ("b"). s becomes "a b c _ d d d d d".  
p = "abcd" can still be found as a subsequence. For k=2, removing [3,2], we lose "b" and "c", p can't be formed. So, maximum k is 1.

**Example 3:**  
Input:  
`s = "abcab", p = "abc", removable = [0,1,2,3,4]`  
Output:  
`0`  
Explanation:  
Even after 0 removals, p="abc" is there. If we remove any character, p cannot be formed.

### Thought Process (as if you’re the interviewee)  
To brute-force, I could try every possible k from 0 up to len(removable), remove those indices, and check if p is a subsequence after each. This is O(k \* (|s| + |p|)), which is too slow for large arrays.

But since for larger k (more removals), it's less likely for p to remain a subsequence, I can do a **binary search** on k:  
- For each candidate k, remove the first k indices in removable (by marking or skipping those).
- Check if p is a subsequence of the resulting s.
- Binary search for the largest k where this is possible.

This gives us O(log k \* (|s| + |p|)) which is much more efficient.

### Corner cases to consider  
- removable is empty (max k is 0).
- p is already not a subsequence of s.
- p equals s.
- All removable indices point to same character (invalid, but per prompt indices are distinct).
- s or p is length 1.
- Removing all but p — can you remove almost everything?

### Solution

```python
def maximumRemovals(s, p, removable):
    # Helper to check if p is a subsequence of s with the first k removals
    def is_subsequence(k):
        removed = set(removable[:k])  # O(k) marking
        pi = 0                       # pointer in p
        for si in range(len(s)):
            if si in removed:
                continue
            if pi < len(p) and s[si] == p[pi]:
                pi += 1
            if pi == len(p):         # All chars in p matched in order
                break
        return pi == len(p)

    low = 0
    high = len(removable)
    ans = 0
    while low <= high:
        mid = (low + high) // 2
        if is_subsequence(mid):
            ans = mid
            low = mid + 1
        else:
            high = mid - 1
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log k × (|s| + |p|)), where k=len(removable). Each subsequence check is O(|s| + |p|), binary search O(log k).
- **Space Complexity:** O(k) for storing the set of removed indices each check.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize if s and removable are very large?
  *Hint: Is there a way to avoid making a new set for each binary search check?*

- Can you solve it if you’re only allowed one pass over s per query?
  *Hint: Use pointers and only skip characters inline.*

- If several queries ask for different values of k on the same s/removable, how to quickly answer?
  *Hint: Preprocessing? Segment tree or prefix skips?*

### Summary
This problem is a classic **binary search on the answer** with an inner helper check for **subsequence matching** using two pointers pattern. It is efficient for large inputs due to O(log k) calls. This pattern (search by answer, check via twin pointer greedy) is common in string manipulation, scheduling, and array-removal type problems.


### Flashcard
Use binary search to find the maximum number of removable characters.

### Tags
Array(#array), Two Pointers(#two-pointers), String(#string), Binary Search(#binary-search)

### Similar Problems
- Maximum Candies Allocated to K Children(maximum-candies-allocated-to-k-children) (Medium)