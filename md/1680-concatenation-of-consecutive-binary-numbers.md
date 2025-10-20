### Leetcode 1680 (Medium): Concatenation of Consecutive Binary Numbers [Practice](https://leetcode.com/problems/concatenation-of-consecutive-binary-numbers)

### Description  
Given a positive integer n, concatenate the binary representations of all integers from 1 to n (in order), and return the decimal value of the resulting binary string modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `n = 1`  
Output: `1`  
*Explanation: Binary is '1', which decimal is 1.*

**Example 2:**  
Input: `n = 3`  
Output: `27`  
*Explanation: Binary: '1' + '10' + '11' → '11011', which is decimal 27.*

**Example 3:**  
Input: `n = 12`  
Output: `505379714`  
*Explanation: Binary: '1101110010111011110001001101010111100', value mod 10⁹+7 is 505379714.*


### Thought Process (as if you’re the interviewee)  
- Directly concatenating all binaries as strings then converting to int is too slow for large n.
- Need to simulate binary concatenation efficiently, building up the number from left to right.
- For each integer i, shift the current answer left by the number of bits in i, then add i.
- Key observation: for each i in 1..n, left-shift answer by len(binary(i)) then add i.


### Corner cases to consider  
- n = 1 (smallest).
- n = very large (up to 10⁵, efficiency check).
- Check modulo at every step to avoid integer overflow.


### Solution

```python
def concatenatedBinary(n: int) -> int:
    MOD = 10 ** 9 + 7
    ans = 0
    length = 0  # current number of bits
    for i in range(1, n+1):
        # If i is a power of two, bit-length increases
        if i & (i-1) == 0:
            length += 1
        ans = ((ans << length) | i) % MOD
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since for each i = 1 to n we do O(1) work.
- **Space Complexity:** O(1), only a few variables used.


### Potential follow-up questions (as if you’re the interviewer)  

- What if n can be up to 10⁹?
  *Hint: Too big for O(n), ask for mathematical patterns or segment trees.*

- Can you generalize for a different base instead of binary?
  *Hint: Count the number of digits in the specific base, replace left shift with base-k multiplication.*

- How does this differ if we need the full binary string?
  *Hint: Not feasible for big n, memory will be huge. Numeric only is scalable.*

### Summary
Classic use of bitwise operations and number theory. Popular coding pattern for optimized bit manipulations, such as rolling hashes and efficient encoding.


### Flashcard
Concatenation of Consecutive Binary Numbers

### Tags
Math(#math), Bit Manipulation(#bit-manipulation), Simulation(#simulation)

### Similar Problems
- Maximum Possible Number by Binary Concatenation(maximum-possible-number-by-binary-concatenation) (Medium)