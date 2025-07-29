### Leetcode 3226 (Easy): Number of Bit Changes to Make Two Integers Equal [Practice](https://leetcode.com/problems/number-of-bit-changes-to-make-two-integers-equal)

### Description  
You are given two positive integers, n and k. You can change any bit in n that is 1 to 0—each such flip is one operation. Return the minimum number of bit changes to convert n to exactly k, or -1 if it's impossible. Think of this as: we can only "turn off" bits (set from 1 to 0) in n to match k. If k has a 1 in any bit where n has a 0, it’s impossible—since you cannot "create" a new 1 bit.

### Examples  

**Example 1:**  
Input: `n = 13, k = 4`  
Output: `2`  
*Explanation: 13 in binary is 1101, 4 is 0100.
We can flip the two '1' bits at positions 2 and 0 (from right, zero-based) in 1101 to get 0100 (removing bits 2\(^\text{nd}\) and 0\(^\text{th}\)).
1101 → 0101 (flip the 0\(^\text{th}\)), then 0101 → 0100 (flip the 2\(^\text{nd}\)). Total: 2 changes.*

**Example 2:**  
Input: `n = 7, k = 8`  
Output: `-1`  
*Explanation: 7 (0111), 8 (1000).
There are '1' bits in k (bit 3\(^\text{rd}\)) where n has a 0, which is impossible since you can't set a 0 bit in n to 1.*

**Example 3:**  
Input: `n = 15, k = 7`  
Output: `1`  
*Explanation: 15 is 1111, 7 is 0111.
Only the most significant bit (bit 3) needs to be flipped from 1 to 0: 1111 → 0111. Total: 1 change.*

### Thought Process (as if you’re the interviewee)  
First, since I can only flip 1→0 in n, k must be a "subset" of n’s '1' bits; if k has a '1' in a bit where n has a '0', it’s impossible.  
- To check this efficiently:  
  *If (n & k) == k,* then every '1' in k is present in n.  
- If it’s possible, then we count how many '1' bits in n must be flipped to get k.  
  *n ^ k* gives a bitmask where differing bits are marked. But since we can only flip 1→0, only consider bits where n is 1 and k is 0.
  That’s equivalent to counting the '1's in (n ^ k), since n & k == k guarantees we’ll only remove bits.  
- Final answer:  
  If (n & k) != k, return -1.  
  Else, return bit_count(n ^ k).

### Corner cases to consider  
- n == k: Output should be 0 (no changes needed).
- n < k: Impossible cases (e.g., n=2, k=3).  
- k has a bit set where n does not.
- Large input values (to test bitwise approach).
- n or k is 1 (smallest possible numbers).

### Solution

```python
def min_bit_changes(n, k):
    # We can only flip '1' bits in n to '0'.
    # If k has a '1' where n is '0', impossible.
    if (n & k) != k:
        return -1

    # n ^ k shows differing bits. All changes will be flipping 1→0 in n.
    diff = n ^ k

    # Count number of bits to flip (number of '1's in diff)
    count = 0
    while diff:
        count += diff & 1
        diff >>= 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1), since integers have a bounded number of bits (typically 32 or 64), so bit counting is constant time.
- **Space Complexity:** O(1), only constant extra variables used, and no additional data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could also flip '0' bits to '1'?  
  *Hint: Think about using XOR to count all differing bits, as both 1→0 and 0→1 would be allowed.*

- How would you do this if 'n' and 'k' are given as binary strings with lengths up to 100,000?  
  *Hint: Compare corresponding bits—align from LSB or pad shorter string.*

- Can you generalize this for making at most X bit changes (not necessarily minimum), or finding if it’s possible?  
  *Hint: Count the minimum flips and compare against X, return feasibility.*

### Summary
This problem utilizes a classic bit manipulation pattern: flipping bits, using AND to check subset, and XOR to find differing bits. The core idea is recognizing operation constraints (1→0 only), and using bitwise logic for O(1) efficiency. The subset-check and bit-count approaches are reusable in problems where subset or difference count is important, like mask-based DP, bit fields, or digital logic simulations.