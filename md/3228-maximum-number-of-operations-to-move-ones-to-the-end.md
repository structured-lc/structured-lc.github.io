### Leetcode 3228 (Medium): Maximum Number of Operations to Move Ones to the End [Practice](https://leetcode.com/problems/maximum-number-of-operations-to-move-ones-to-the-end)

### Description  
Given a binary string **s** (consisting of only '0's and '1's), you can repeatedly do the following operation:  
Select an index i such that s[i] == '1' and s[i+1] == '0', and swap s[i] with s[i+1]. Each swap is counted as one operation, and you can repeat the operation on different indices as long as possible.  
Return the **maximum number of operations** that can be performed to move all the '1's as far right as possible.

### Examples  

**Example 1:**  
Input: `s = "11010"`  
Output: `4`  
*Explanation:  
- First, swap the 1 at index 1 with 0 at 2: "10110" (op 1)
- Swap 1 at index 2 with 0 at 3: "10011" (op 2)
- Swap 1 at index 1 with 0 at 2: "01011" (op 3)
- Swap 1 at index 0 with 0 at 1: "10011" → "01011" (we already did). Actually, more clear:  
- What really happens is you can move each 1 across all 0s to its right, but only when it’s immediately left of a 0.  
- The maximum is 4 steps.

**Example 2:**  
Input: `s = "1001"`  
Output: `2`  
*Explanation:  
- Swap 1 at index 0 with 0 at 1: "0101" (op 1)
- Swap 1 at index 1 with 0 at 2: "0011" (op 2)
- No more possible. Output is 2.

**Example 3:**  
Input: `s = "111"`  
Output: `0`  
*Explanation:  
- No adjacent "10" pairs, so no moves.

### Thought Process (as if you’re the interviewee)  
First, I’d try a brute-force simulation:
- Simulate every possible move: For each round, go through the string left to right, swap any "10" pair, increment the count, and continue until no more moves.  
- Complexity: Each swap reduces the number of "10" pairs, so at worst O(n²).

But this is inefficient.  
Instead, can we count for each '1' how many zeros are to its right and sum that up? Actually, because only immediate "10" pairs are allowed, the process is really about how many times can any '1' 'jump' past each 0 to its right, one at a time per operation.

Let’s optimize:
- Track the number of '1's up to each position.
- Every time we see a "10" pair (i.e., at index i, s[i] == '1' and s[i+1] == '0'), the '1' can “hop” right, and as that 1 moves, it enables the next right 1 to move, etc.
- But, actually, the key is: for each segment of contiguous 1s ending at a 0, we can move all those 1s over that 0 one at a time.

So, scan and:
- If s[i] == '1', count up.
- If s[i] == '0' and previous is '1', add the accumulated count of 1s as the ops, then reset the count.

This greedy/count approach works in O(n).

### Corner cases to consider  
- All 1s or all 0s → 0 moves.
- Alternate 1 and 0.
- Only 1s at end (no '10' pairs).
- Empty string, single char string.
- No "10" pairs at all.

### Solution

```python
def maxOperations(s: str) -> int:
    ans = 0      # total number of moves
    cnt = 0      # count of 1s so far
    n = len(s)
    for i, c in enumerate(s):
        if c == '1':
            cnt += 1
        elif i > 0 and s[i-1] == '1':
            ans += cnt
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we make a single pass through the string.
- **Space Complexity:** O(1), only constant space for counters; no extra storage is required.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to return the sequence of moves, not just the count?  
  *Hint: Can you simulate (and store) the actual swaps and indices?*

- What if you could swap any '1' and '0' pair where '1' is to the left of the '0', not just adjacent?  
  *Hint: Would a prefix sum (or counting zeros to the right for each '1') help?*

- Can you generalize this approach to k types of characters, not just '0' and '1'?  
  *Hint: Think how you’d model permissible "hops" with other character combinations.*

### Summary
This solution uses a **greedy counting strategy** for moving 1s over 0s whenever adjacent, counting the total number of valid swaps. The core is recognizing each "zero after one" segment as an opportunity to move all prior 1s past that zero. This problem is a variation of the “minimum hops” and “adjacent swap” pattern, applicable to group shifting, bubble sort, and sliding window problems.

### Tags
String(#string), Greedy(#greedy), Counting(#counting)

### Similar Problems
