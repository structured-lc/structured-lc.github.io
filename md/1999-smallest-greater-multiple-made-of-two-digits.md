### Leetcode 1999 (Medium): Smallest Greater Multiple Made of Two Digits [Practice](https://leetcode.com/problems/smallest-greater-multiple-made-of-two-digits)

### Description  
Given integers **k**, **digit₁**, and **digit₂**, find the smallest integer **n** such that:
- n > k  
- n is a multiple of k  
- Every digit of n is either digit₁ or digit₂ (can be the same digit or both)

Return this smallest n. If no such integer exists (or n > 2³¹−1), return -1.

### Examples  

**Example 1:**  
Input: `k = 2, digit1 = 0, digit2 = 2`  
Output: `20`  
Explanation: 20 > 2, 20 is a multiple of 2, and digits are 2 and 0.

**Example 2:**  
Input: `k = 3, digit1 = 4, digit2 = 2`  
Output: `24`  
Explanation: 24 > 3, 24 is a multiple of 3, and digits are 2 and 4.

**Example 3:**  
Input: `k = 2, digit1 = 0, digit2 = 0`  
Output: `-1`  
Explanation: Only possible number is 0 or numbers composed only by zeros, which cannot be > 2 and a multiple of 2.

### Thought Process (as if you’re the interviewee)  
First, brute-force is to try all numbers n > k that are multiples of k, and check if all digits are in \{digit₁, digit₂\}, but this will time out since numbers can be huge.

To optimize, note:
- We only need to generate numbers using combinations of digit₁ and digit₂ and check which of them is minimal, > k, and divisible by k.
- This is similar to searching for a number with specific digits that is a multiple of k—can be efficiently solved with BFS (Breadth-First Search) where each node is a string made of digit₁ and digit₂.

So, do BFS, starting from the possible digits (unless both are 0, in which case return -1). For each state (current number as string and as integer modulo k), append either digit₁ or digit₂ for the next digit, continue as long as the number does not exceed 2³¹−1, and as soon as the number > k and a multiple of k, return it.

BFS guarantees minimal n because it explores shortest numbers first. To avoid revisiting same modulo state, store (num\_mod\_k, length).

### Corner cases to consider  
- digit₁ == digit₂ (so only one digit; e.g. both 0)  
- Both digits are 0, physically impossible unless k = 0  
- k is large (close to 1000)  
- The answer exceeds 2³¹−1  
- Single digit numbers  
- Leading 0s are not valid unless digit₁ or digit₂ is 0, but the number can’t start with 0 unless only option is 0, but requirements force n > k ≥ 1.

### Solution

```python
def findInteger(k: int, digit1: int, digit2: int) -> int:
    from collections import deque

    # No valid number if both digits are 0
    if digit1 == 0 and digit2 == 0:
        return -1

    # Prepare digits (unique, as both can be the same)
    digits = {digit1, digit2}
    max_int = 2 ** 31 - 1

    # BFS queue: (current_num_string, current_num_mod_k)
    queue = deque()
    visited = set()

    # Start BFS with each possible starting digit, avoid starting with 0
    for d in digits:
        if d == 0:
            continue  # can't start with 0
        queue.append( (str(d), d % k) )
        visited.add( (d % k, len(str(d))) )

    while queue:
        s, mod = queue.popleft()
        n = int(s)
        if n > k and n % k == 0:
            if n > max_int:
                return -1
            return n
        if n > max_int:
            continue
        # Try appending both digits
        for d in digits:
            ns = s + str(d)
            nmod = (mod * 10 + d) % k
            # Avoid revisiting same (mod, length) state
            if (nmod, len(ns)) not in visited:
                queue.append( (ns, nmod) )
                visited.add( (nmod, len(ns)) )
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(2ⁿ) in worst case, where n is the answer's number of digits, because BFS explores all permutations with digits digit₁ and digit₂ up to the solution length.
- **Space Complexity:** O(2ⁿ), since the BFS queue and visited set can hold permutations up to the answer's digit length.

### Potential follow-up questions (as if you’re the interviewer)  

- What if three or more digits instead of two?  
  *Hint: How would you modify BFS to generate numbers using any set of allowed digits?*

- How to return all such numbers within a certain range instead of just the smallest one?  
  *Hint: Extend BFS to find or collect all valid numbers in-range.*

- How to optimize if k is very large or allow for large result values (beyond 32-bit)?  
  *Hint: Consider using generators, lazy evaluation, or searching by increasing length instead of naive BFS.*

### Summary
This problem employs a classic BFS search, generating numbers digit-by-digit in order of increasing length using only the allowed digits, and checks divisibility and magnitude constraints as it explores. This digit-constrained generation and state-tracking with modulo logic is a common coding pattern in problems like "smallest/largest X with given digits or divisibility", and extends naturally to problems with more digits or similar modular conditions.


### Flashcard
Use BFS to generate numbers from digit₁ and digit₂, checking divisibility by k and minimality; stop at the first valid result.

### Tags
Math(#math), Enumeration(#enumeration)

### Similar Problems
