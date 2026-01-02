### Leetcode 3783 (Easy): Mirror Distance of an Integer [Practice](https://leetcode.com/problems/mirror-distance-of-an-integer)

### Description  
Given an integer n, compute its **mirror distance**, defined as the absolute difference between n and its reverse (the number formed by reversing n's digits). For example, if n is 25, reverse(n) is 52, so mirror distance is |25 - 52| = 27.

### Examples  

**Example 1:**  
Input: `n = 25`  
Output: `27`  
*Explanation: reverse(25) = 52; |25 - 52| = 27.*

**Example 2:**  
Input: `n = 273`  
Output: `99`  
*Explanation: reverse(273) = 372; |273 - 372| = 99.*

**Example 3:**  
Input: `n = 121`  
Output: `0`  
*Explanation: reverse(121) = 121; |121 - 121| = 0.*


### Thought Process (as if you’re the interviewee)  
First, I'd clarify constraints: n is positive (no leading zeros issue) and fits in 32-bit int, so reversing won't overflow for this problem. Brute-force: convert n to string, reverse it, convert back to int, compute |n - rev|. This is O(d) where d is digits (~10 max), simple but uses string ops (avoid in interviews).  
Optimize to math-only: extract digits with %10, build reverse by rev = rev * 10 + digit, divide n by 10 each step. O(d) time, O(1) space, no strings—cleaner and interview-preferred. Trade-off: handles negatives/zeros implicitly via abs, but since n > 0, direct.

### Corner cases to consider  
- n = 0: reverse(0) = 0, distance = 0.  
- Single digit (n = 5): reverse(5) = 5, distance = 0.  
- Palindrome (n = 121): reverse same as n, distance = 0.  
- All 9s (n = 99): reverse(99) = 99, distance = 0.  
- Max int edge (but fits 32-bit, no overflow).

### Solution

```python
def mirrorDistance(n: int) -> int:
    # Step 1: Build reverse by extracting digits from right to left
    rev = 0
    temp = n
    while temp > 0:
        # Extract last digit, add to rev after shifting rev left (*10)
        digit = temp % 10
        rev = rev * 10 + digit
        # Remove last digit from temp
        temp //= 10
    
    # Step 2: Compute and return absolute difference
    return abs(n - rev)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n) since we process ~log₁₀(n) digits (up to 10 for 32-bit int).  
- **Space Complexity:** O(1); only uses a few variables, no extra storage proportional to input.


### Potential follow-up questions (as if you’re the interviewer)  

- What if n can be negative or have leading zeros in reverse?  
  *Hint: Use abs(n) first; skip leading zeros by tracking non-zero flag.*

- Modify to return reverse(n) instead of distance.  
  *Hint: Return rev directly; discuss overflow for larger n (e.g., return as string).*

- Given array of n's, find min/max mirror distance.  
  *Hint: Reuse same reverse logic in loop; track min/max with initial INF/-INF.*

### Summary
Reverse digits mathematically using modulo and division, then take absolute difference with original—classic **reverse integer** pattern (seen in Reverse Integer #7, Palindrome Number #9). Applies to any digit-manipulation without strings.

### Flashcard
Reverse digits in O(log n) using rev = rev * 10 + (n % 10), n //= 10 loop; return |n - rev| for mirror distance. Handles all cases in O(1) space.

### Tags
Math(#math)

### Similar Problems
