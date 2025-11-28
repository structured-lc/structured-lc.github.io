### Leetcode 3666 (Hard): Minimum Operations to Equalize Binary String [Practice](https://leetcode.com/problems/minimum-operations-to-equalize-binary-string)

### Description  
Given a binary string **s** of length **n**, and an integer **k** (1 ≤ k ≤ n), you can select **any k distinct indices** in **s** and **flip their bits simultaneously** (i.e., `0`→`1` or `1`→`0`) in one operation.  
Your goal is to make **all bits in the string equal to `'1'`** using a minimum number of such operations.  
If **impossible**, return **-1**.

### Examples  

**Example 1:**  
Input: `s = "1010", k = 2`  
Output: `2`  
*Explanation:  
- Flip indices [1,2] ("1010" → "0110")  
- Flip indices [3,4] ("0110" → "0111")  
- Now all are 1s in two steps.*

**Example 2:**  
Input: `s = "1111", k = 3`  
Output: `0`  
*Explanation:  
- All elements already `'1'`, so no operation needed.*

**Example 3:**  
Input: `s = "10001", k = 4`  
Output: `-1`  
*Explanation:  
- Number of zeros = 3, which is less than k, so you can't flip them all in one operation, and flipping with extra 1's will "undo" some work; impossible.*

### Thought Process (as if you’re the interviewee)  

- **Brute Force:** Try every sequence of valid flips and see which brings the string to all ones.  
  - Not tractable for n up to 25, exponential branch.
- **Observation:**  
  - We care about **number of 0's** and whether flips can reduce them to 0.
  - In each op, can flip any k bits, so per round min(k, #zeros) zeros can be removed, but flipping some 1's to 0 may undo progress.
- **Parity:**  
  - Flipping the same index `2` times gets it back to original value -- so, **the parity of flips at each index matters**.
- **Mathematical insight:**  
  - Let **count0 = number of zeros** in s. To make all 1's, we must flip all zeros to 1.
  - Each flip changes parity, so in total we want all bits to be 1 after applying the flips.
  - **Key:** Is it possible to cover all zeros by multiple groups of size k, so that after all ops, all bits are 1?
- **If k is even:**  
  - The parity argument: after each group flip, those indices flip bits.
  - For a solution, count0 must be divisible by gcd(k, n); for each bit, the number of times it's flipped must match the target.
- **If k is odd:**  
  - It's always possible to adjust to any configuration (over-lapping flips can undo).
  - Min ops = ceil(count0 / k)
- **Final approach:**
  - If k is odd: answer = ⌈count0 / k⌉
  - If k is even:
    - If count0 % 2 != 0: impossible (can't fix parity)
    - Else: answer = ⌈count0 / k⌉
    - But also, if impossible to cover exactly all zeros (with extra flips turning 1→0), answer is -1.
  - In practice, for all k, need to check if it’s *possible* (can parity be matched).

### Corner cases to consider  
- Empty string (`s = ""`)  
- String is already all `'1'`  
- k = 1 (can flip any single bit)  
- k = n (can flip the entire string)  
- Number of zeros < k  
- count0 not divisible by gcd(k, n)  
- All zeros  
- Very large k relative to n

### Solution

```python
def min_operations_to_equalize_binary_string(s: str, k: int) -> int:
    '''
    Returns minimum number of operations to make all s[i] == '1'
    using operations that can flip any k distinct indices per op.
    Returns -1 if impossible.
    '''
    n = len(s)
    count0 = s.count('0')
    if count0 == 0:
        # Already all ones, nothing to do
        return 0
    
    # For k == n, can only flip all at once
    if k == n:
        # Only possible if count0 == k (i.e. all 0's), else impossible
        return 1 if count0 == n else -1
    
    # For k == 1, can flip any individual bit. Need count0 ops.
    if k == 1:
        return count0
    
    # For k is odd, always possible (since flipping some 1's to 0's doesn't block us)
    if k % 2 == 1:
        # Ceiling division
        return (count0 + k - 1) // k
    
    # For k even, parity of count0 must be even (can only reduce in steps of 2)
    if count0 % 2 == 1:
        return -1
    
    # Otherwise, minimum ops is ceil(count0 / k)
    # But if k > count0 and count0 is not 0, cannot flip only zeros in one op, will flip some ones
    if k > count0:
        # Any move will also flip k-count0 ones to zeros, so will add more zeros back
        return -1
    
    return (count0 + k - 1) // k
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Need to count zeros in s, which is O(n). All other calculation is O(1).
- **Space Complexity:** O(1)  
  Only uses a few variables regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would the solution change if you wanted to make all bits equal to '0'?  
  *Hint: Same reasoning applies; just count number of ones.*

- What if you could only flip *consecutive* k bits?  
  *Hint: This becomes a sliding window/greedy problem; minimum number of reverses.*

- What if for each k-sized flip, you must flip only indices containing 0s?  
  *Hint: Only possible if count0 is divisible by k; otherwise impossible.*

### Summary
This problem is a good application of **greedy methods** combined with **number theory (parity and divisibility on flip counts)**. The key is to realize the impact of k's parity on ability to reach all 1's and to handle corner cases directly. This pattern is common in problems involving flip/paint/grid/bitmask operations, and being able to justify impossibility based on parity or modular congruence is broadly useful.

### Tags
Math(#math), String(#string), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Ordered Set(#ordered-set)

### Similar Problems
