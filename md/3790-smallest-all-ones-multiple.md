### Leetcode 3790 (Medium): Smallest All-Ones Multiple [Practice](https://leetcode.com/problems/smallest-all-ones-multiple)

### Description  
Given a positive integer k, find the smallest positive integer n (by number of digits) that is divisible by k and consists only of the digit 1 (like 1, 11, 111, etc.). Return the number of digits in n, or -1 if no such n exists within reasonable bounds.

### Examples  

**Example 1:**  
Input: `k = 3`  
Output: `3`  
*Explanation: 111 ÷ 3 = 37 (no remainder). Smaller repunits like 1 and 11 are not divisible by 3.*

**Example 2:**  
Input: `k = 7`  
Output: `6`  
*Explanation: 111111 ÷ 7 = 15873 (no remainder). Smaller repunits like 1, 11, 111, etc., leave remainders when divided by 7.*

**Example 3:**  
Input: `k = 1`  
Output: `1`  
*Explanation: 1 ÷ 1 = 1 (no remainder). This is the smallest possible repunit.*


### Thought Process (as if you’re the interviewee)  
First, brute force: Generate repunits like 1, 11, 111, ... up to some large length (say 10^6 digits) and check if divisible by k using big integer modulo. But this is inefficient for large k since numbers explode in size.  

Optimize: Notice we only care about divisibility, so track the number modulo k without building the full repunit. A repunit of length l is (10^l - 1)/9, but we simulate appending 1s: start with num = 0, then iteratively num = (num * 10 + 1) % k. This keeps values small (0 to k-1).  

Track seen remainders with their lengths. If remainder 0, return current length. If a remainder repeats, no solution exists (cycle detected, pigeonhole principle since only k possible remainders). This is O(k) time, optimal. Trade-off: Simple simulation vs. full math formula for repunit modulo.

### Corner cases to consider  
- k = 1: Immediate answer 1 (1 % 1 == 0).  
- k = 0: Invalid (problem states positive k).  
- No solution exists: Return -1 when remainder cycles (e.g., k=13 may cycle without hitting 0).  
- Large k (up to 10^9?): Loop up to k+1 steps suffices due to pigeonhole.  
- Single digit: Length 1 always checked first.

### Solution

```python
def smallestRepunitDivByK(k: int) -> int:
    # Track seen remainders and their lengths to detect cycles
    seen = {}
    # Start with empty repunit, remainder 0, length 0
    remainder = 0
    length = 0
    
    while remainder not in seen and length <= k:  # k+1 steps max by pigeonhole
        seen[remainder] = length
        # Append a 1: remainder = (remainder * 10 + 1) % k
        remainder = (remainder * 10 + 1) % k
        length += 1
        
        # Found divisible repunit
        if remainder == 0:
            return length
    
    # Cycle detected without hitting 0, impossible
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k) - At most k+1 iterations (pigeonhole: k remainders 0..k-1, cycle guaranteed if no solution). Each step is O(1) arithmetic.  
- **Space Complexity:** O(k) - Hash map stores up to k remainders and lengths.


### Potential follow-up questions (as if you’re the interviewer)  

- Modify to return the actual repunit string (not just length).  
  *Hint: Build string incrementally or use math pow(10, length) - 1 // 9, but watch for large numbers.*

- (Follow-up question 2)  What if we want the smallest repunit divisible by k in base b (not 10)?  
  *Hint: Replace *10 with *b in modulo simulation.*

- (Follow-up question 3)  Find smallest repunit divisible by all k in a given array.  
  *Hint: Use LCM of k's for combined modulo tracking.*

### Summary
Simulate building repunits using modulo arithmetic to track remainders while appending 1s, detecting cycles with a hashmap for O(k) efficiency. Common pattern in number theory problems (repunit divisibility, cycle detection via remainders), also applies to problems like "smallest multiple with given digits" or cyclic number generation.

### Flashcard
Simulate repunit divisibility by iteratively computing (remainder * 10 + 1) % k; return length on remainder 0, else -1 on cycle via seen remainders hashmap (pigeonhole O(k)).

### Tags

### Similar Problems
