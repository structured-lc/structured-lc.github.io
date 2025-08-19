### Leetcode 3199 (Easy): Count Triplets with Even XOR Set Bits I [Practice](https://leetcode.com/problems/count-triplets-with-even-xor-set-bits-i)

### Description  
Given three integer arrays **a**, **b**, and **c**, count the number of triplets (a[i], b[j], c[k]) such that the bitwise XOR of the three numbers has an **even** number of set bits (i.e. 1's in their binary representation).  
That is, count triplets where bin(a[i] ^ b[j] ^ c[k]) has an even number of 1's.

### Examples  

**Example 1:**  
Input: `a = [1]`, `b = [2]`, `c = [3]`  
Output: `1`  
*Explanation: Only possible triplet is (1,2,3). 1 ^ 2 ^ 3 = 0, which has 0 set bits (even).*

**Example 2:**  
Input: `a = [1,1]`, `b = [2,3]`, `c = [1,5]`  
Output: `4`  
*Explanation: The 4 valid triplets are:  
- (a,b[1],c): 1 ^ 3 ^ 1 = 3 (011), 2 set bits (even)  
- (a[1],b[1],c): 1 ^ 3 ^ 1 = 3, 2 set bits  
- (a,b,c[1]): 1 ^ 2 ^ 5 = 6 (110), 2 set bits  
- (a[1],b,c[1]): 1 ^ 2 ^ 5 = 6, 2 set bits*

**Example 3:**  
Input: `a = `, `b = `, `c = `  
Output: `1`  
*Explanation: 0 ^ 0 ^ 0 = 0, has 0 set bits (even).*

### Thought Process (as if you’re the interviewee)  
First, the brute-force approach would be to try every a[i], b[j], c[k] and check if the number of set bits in a[i] ^ b[j] ^ c[k] is even.  
- For each value in a (size n), each in b (size m), each in c (size p), compute x = a[i] ^ b[j] ^ c[k]  
- Count set bits in x (bin(x).count('1'))  
- If the count is even, increase answer  

This is a straightforward O(n × m × p) solution. Since the constraints are small (up to 100 per array), this is efficient enough — at most 1,000,000 iterations.

Optimizing further:  
We can pre-compute the parity (even or odd) of the number of set bits for every possible XOR of a[i] and b[j], and then count matching c[k], but since array size is small, the benefit is minor — brute-force is readable and sufficient.

### Corner cases to consider  
- Arrays containing 0 (since 0 has 0 set bits, even parity)  
- Duplicates in a, b, or c  
- Minimal size: length 1 arrays  
- All values same in a, b, c  
- Max possible value: values up to 100  
- All possible combinations produce odd parity (should return 0)

### Solution

```python
def countTripletsWithEvenXOR(a, b, c):
    # Helper to count set bits in x
    def bit_count(x):
        return bin(x).count('1')

    count = 0
    for ai in a:
        for bj in b:
            for ck in c:
                xor_val = ai ^ bj ^ ck
                set_bits = bit_count(xor_val)
                if set_bits % 2 == 0:
                    count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m × p) where n, m, p are the lengths of a, b, and c, respectively. This is acceptable since each can be at most 100 (worst-case 1,000,000 iterations).
- **Space Complexity:** O(1) extra space — only uses a few variables for counting.

### Potential follow-up questions (as if you’re the interviewer)  

- Could you solve it in less time if the ranges were bigger?  
  *Hint: Try recording how many c[k] values have each possible parity and count in bulk.*

- What if you wanted triplets with **odd** parity instead of even?  
  *Hint: Just flip the condition on set bits mod 2.*

- What if you had to count quadruplets (a[i],b[j],c[k],d[l]) with the same property?  
  *Hint: Consider partial precomputation and counting using hash maps of parities.*

### Summary
This is a classic **triple nested loop enumeration**: try all triplet combinations and check a property (parity of set bits) on the result. The main pattern is exhaustive search, efficient here due to small array sizes. A similar pattern applies to many small-combinatorial subset problems. The "counting set bits parity" part is a useful trick in both bitwise and combinatorial interview problems.

### Tags
Array(#array), Bit Manipulation(#bit-manipulation)

### Similar Problems
