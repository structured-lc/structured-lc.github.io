### Leetcode 693 (Easy): Binary Number with Alternating Bits [Practice](https://leetcode.com/problems/binary-number-with-alternating-bits)

### Description  
You’re given a positive integer `n`. Determine if its **binary representation** has alternating bits — that is, every adjacent pair of bits differs (no two consecutive 0s or 1s). For example, 5 is 101 in binary (alternates: 1-0-1, so True), but 7 is 111 (doesn’t alternate, so False). You return `True` if the pattern alternates, and `False` otherwise.

### Examples  

**Example 1:**  
Input: `n = 5`  
Output: `True`  
*Explanation: 5 in binary is 101. All adjacent bits are different (1≠0, 0≠1).*

**Example 2:**  
Input: `n = 7`  
Output: `False`  
*Explanation: 7 in binary is 111. Adjacent bits are the same (1=1=1).*

**Example 3:**  
Input: `n = 10`  
Output: `True`  
*Explanation: 10 in binary is 1010. Adjacent bits all differ (1≠0, 0≠1, 1≠0).*

**Example 4:**  
Input: `n = 11`  
Output: `False`  
*Explanation: 11 in binary is 1011. The last two bits are both 1 (1=1), so bits do not alternate.*


### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  I would start by extracting each bit (using bitwise AND) and compare it with the previous bit as I shift through the number. If at any step two consecutive bits are the same, return False. Otherwise, if the process ends, return True.
- **Optimized:**  
  There’s a very elegant bit manipulation trick: by XOR-ing the number with itself shifted right by 1, all alternating bit numbers (e.g., 101010...) become a sequence of ones like 111... Adding 1 to this will be a single 1000...0 if the pattern is correct. Finally, if we do an AND of this result with itself plus 1, we get 0 only if our bits alternated.  
  - This approach is O(1) time because integers are capped at 31 bits (since n ≤ 2³¹−1).
  - In interview, I’d mention both for clarity. The XOR method is concise, less error-prone, and highly efficient.

### Corner cases to consider  
- n = 1 (single bit — trivially alternates)
- Maximum allowed n (check for performance and correctness)
- Numbers whose binary representation is 0, 1, or has leading zeros (which don't affect alternation)
- Two bits: 2 (10), 3 (11)

### Solution

```python
def has_alternating_bits(n):
    # XOR the number with itself shifted right by one
    x = n ^ (n >> 1)
    # Check if x is a sequence of all 1s: x & (x + 1) == 0
    return (x & (x + 1)) == 0
```

**Alternate Brute-force (for clarity):**

```python
def has_alternating_bits(n):
    prev = -1
    while n:
        curr = n & 1
        if curr == prev:
            return False
        prev = curr
        n >>= 1
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) — All operations are on a fixed, small number of bits (≤ 31 bits).
- **Space Complexity:** O(1) — Only a constant amount of extra integer storage is used; no recursion or extra arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if input is a string “010101...” instead of an integer?  
  *Hint: You’d compare consecutive characters in the string.*

- What if you want to find the longest contiguous substring of alternating bits in a binary string?  
  *Hint: Use a sliding window or iterate, tracking the last bit and length.*

- Can you count how many n-bit numbers have alternating bits?  
  *Hint: Relates to Fibonacci numbers, as each number depends on sequences ending with 0 or 1, but never with repeated bits.*

### Summary
This problem’s optimal solution is a **classic bit manipulation pattern**, especially the “XOR with shifted self and check if all 1s” trick. The brute-force solution shows basic bitwise digit extraction. Recognizing this pattern is valuable for similar problems dealing with binary properties, alternating patterns, or uniform bit checks.

### Tags
Bit Manipulation(#bit-manipulation)

### Similar Problems
- Number of 1 Bits(number-of-1-bits) (Easy)