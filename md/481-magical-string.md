### Leetcode 481 (Medium): Magical String [Practice](https://leetcode.com/problems/magical-string)

### Description  
You're given an integer n. Find the number of **1s** in the first n characters of the **magical string** S.  
A magical string S is a sequence consisting only of 1s and 2s, constructed as follows:
- S starts with "1".
- Each digit in S represents how many times the next number (alternating between 1 and 2) will appear.
- For example: starting from '1', the sequence is built as "1", then "1" says "add one 2" → "12", then "2" means "add two 1s" → "1221", then "1" means "add one 2" → "12212", etc.
You need to count the number of 1s in S[0:n].

### Examples  

**Example 1:**  
Input: `n = 6`  
Output: `3`  
*Explanation: S = "122112..." S[:6] = "122112". There are 3 ones.*

**Example 2:**  
Input: `n = 1`  
Output: `1`  
*Explanation: S[:1] = "1", which contains 1 one.*

**Example 3:**  
Input: `n = 4`  
Output: `2`  
*Explanation: S[:4] = "1221", where '1', '2', '2', '1' contains 2 ones.*

### Thought Process (as if you’re the interviewee)  
Let’s reconstruct how the magical string works:
- The string starts as "1".  
- Each value describes how many times the next number (alternating between 1 and 2) is to be added.
- If the current value is '2', add two of the alternating digit; if '1', add one.  
- This sequence describes itself: the numbers, when grouped, describe the very sequence they compose.

Brute-force:  
- Build the string up to length n.
- Count 1's in the built string.

Optimizations:  
- No need to store more than n elements.
- Use integer array instead of string for efficiency.
- Maintain a write pointer for new elements, and a read pointer for determining counts for next insertions.
- Toggle between 1 and 2 as the next to insert.

Final approach:
- Initialize with [1, 2, 2] (since first several insertions follow this),
- Use two pointers:
    - read_idx: reads the count for the next run.
    - write_idx: appends the next number as many times as the value at read_idx specifies.
- Track the count of ones as you build.

### Corner cases to consider  
- n == 0 (should return 0)
- n == 1
- n < length of initial preset ([1,2,2]), e.g., n=2 or n=3
- Very large n (up to 10⁵)
- Check off-by-one errors when counting exactly n elements
- Cases where the next count to insert would surpass n (should not over-count)

### Solution

```python
def magicalString(n):
    if n == 0:
        return 0
    # The magical string starts with 1 2 2
    magic = [1, 2, 2]
    count_ones = 1 if n >= 1 else 0
    read_idx = 2              # Read index into magic (for "how many next?")
    next_num = 1              # The next number to insert (alternates 1<->2)

    while len(magic) < n:
        repeat = magic[read_idx]
        # Insert `repeat` times of next_num
        for _ in range(repeat):
            magic.append(next_num)
            # Only count ones if within n
            if next_num == 1 and len(magic) <= n:
                count_ones += 1
        # Alternate between 1 and 2
        next_num = 2 if next_num == 1 else 1
        read_idx += 1

    return count_ones
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because we create each character up to length n exactly once.
- **Space Complexity:** O(n), as at most n characters are stored.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize memory if only the count matters and not the sequence?
  
  *Hint: Can you run a simulation without explicitly building the whole string array? Maybe by using counters?*

- What if the pattern involved more numbers than just 1 and 2?  
  
  *Hint: How generalizable is your approach for different self-referential sequences?*

- Can you solve this problem with constant space?  
  
  *Hint: Think about whether you need the whole array, or can just count as you go using smart book-keeping.*

### Summary
This problem uses the **two-pointers technique** to simulate the construction of a self-describing sequence. The key idea is to iteratively construct the sequence by following its self-referential rules, counting 1s as you go. The pattern—one pointer for generation, another for interpreting run-lengths—also appears in problems dealing with data compression, run-length encoding, and sequence simulation.

### Tags
Two Pointers(#two-pointers), String(#string)

### Similar Problems
