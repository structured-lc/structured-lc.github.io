### Leetcode 3215 (Medium): Count Triplets with Even XOR Set Bits II [Practice](https://leetcode.com/problems/count-triplets-with-even-xor-set-bits-ii)

### Description  
Given an integer array **nums**, count the number of triplets (i, j, k) such that 0 ≤ i < j < k < n (where n is the length of nums), and the number of set bits (i.e., 1's in the binary representation) in nums[i] ⊕ nums[j] ⊕ nums[k] is even.  
Explain how to do this efficiently, not just with brute force.

### Examples  

**Example 1:**  
Input: `nums = [2, 4, 6]`  
Output: `1`  
*Explanation: There is only one triplet: (0,1,2). 2 ⊕ 4 ⊕ 6 = 0, and the number of set bits in 0 is 0 (even).*

**Example 2:**  
Input: `nums = [3, 5, 7, 9]`  
Output: `2`  
*Explanation:  
- (0,1,2): 3 ⊕ 5 ⊕ 7 = 5, set bits: 2 (even)  
- (0,1,3): 3 ⊕ 5 ⊕ 9 = 15, set bits: 4 (even)  
- (0,2,3): 3 ⊕ 7 ⊕ 9 = 13, set bits: 3 (odd)  
- (1,2,3): 5 ⊕ 7 ⊕ 9 = 11, set bits: 3 (odd)  
So only (0,1,2) and (0,1,3) are valid, answer is 2.*

**Example 3:**  
Input: `nums = [1, 1, 1, 1]`  
Output: `4`  
*Explanation: All triplets have XOR = 1 ⊕ 1 ⊕ 1 = 1, set bits in 1 is 1 (odd), so actually no valid triplet, output should be 0.*

### Thought Process (as if you’re the interviewee)  

- **Brute force:**  
  - Try every triplet (i, j, k) where 0 ≤ i < j < k < n.
  - For each, compute xor_val = nums[i] ⊕ nums[j] ⊕ nums[k].
  - Count set bits in xor_val, and check if it’s even.
  - This is O(n³) and very slow for n up to ~1e3.
- **Can we optimize?**  
  - XOR is associative and commutative.  
  - But because the definition is strictly about set bits parity, not the value, we can try to pre-process for parity.  
  - Key insight: parity of set bits in nums[i] ⊕ nums[j] ⊕ nums[k] is even iff the total number of 1s (in all 3 numbers, accounting for overlaps, i.e., XOR) is even.
- **Efficient Approach:**  
  - For each number, store the parity (0 for even, 1 for odd number of set bits in that number).
  - We are counting the number of triplets (i, j, k), 0 ≤ i < j < k < n, for which parity[i] ⊕ parity[j] ⊕ parity[k] = 0 (even).
  - For parity array, count number of even and odd parities:
      - Let count_even = total numbers with even set bits.
      - Let count_odd = total numbers with odd set bits.
  - For a triplet to have even parity of total set bits:  
    - All three must be even: pick 3 from count_even: C(count_even, 3)
    - Or, all three must be odd: C(count_odd, 3)
    - Or, two odd and one even, or two even and one odd? Not valid, because 1 ⊕ 1 ⊕ 0 = 0 and 0 ⊕ 0 ⊕ 1 = 1.
    - But wait, 1 ⊕ 1 ⊕ 1 = 1, so only combinations where sum of parities mod 2 is 0 (i.e., sum is even).
    - The possible ways:  
        - All three even (0,0,0): parity sum 0
        - One even and two odd (0,1,1): 0 ⊕ 1 ⊕ 1 = 0
    - So, total count is C(count_even, 3) + C(count_even, 1) × C(count_odd, 2)
- **Final formula:**  
  **ans = C(count_even, 3) + count_even × C(count_odd, 2)**
  - Where C(n, k) = n × (n-1) × (n-2) / 6 if k = 3, C(n,2) = n × (n-1) / 2.

### Corner cases to consider  
- Less than 3 numbers: should return 0.
- All numbers have the same set bit parity (all even or all odd).
- All zeros: all set bit counts are 0 (even).
- Large values or edge of int range: binary conversion works for any int.

### Solution

```python
def countTriplets(nums):
    def set_bits(x):
        count = 0
        while x > 0:
            count += x & 1
            x >>= 1
        return count

    n = len(nums)
    if n < 3:
        return 0

    even = 0
    odd = 0

    # Count how many numbers have even/odd set bits
    for num in nums:
        if set_bits(num) % 2 == 0:
            even += 1
        else:
            odd += 1

    # Helper for combinations nCk
    def comb(n, k):
        if n < k:
            return 0
        if k == 2:
            return n * (n - 1) // 2
        if k == 3:
            return n * (n - 1) * (n - 2) // 6
        return 0

    # Triplets:
    # - all three even
    # - one even + two odds
    res = comb(even, 3) + even * comb(odd, 2)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × bits_per_number), where n is the size of nums, and bits_per_number is the number of bits for each number (usually up to 32). For each number, we count set bits.
- **Space Complexity:** O(1) extra; uses only counters and no large data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to count quadruplets or k-tuples with even XOR set bits?
  *Hint: Generalize the parity counting and consider combinations with constraints.*

- How would your solution change if you needed the count for odd number of set bits instead?
  *Hint: Observe which triplet combinations give odd total parity instead of even.*

- Can you optimize further if all numbers in the array are small (e.g., ≤ 1024)?
  *Hint: Precompute set bits for all possible values up to the maximum number.*

### Summary
The approach uses the parity of set bits and combinatorial counting rather than brute-force enumeration of triplets. By grouping on even/odd set bits and leveraging combinations, we reduce the problem to O(n) time, a big improvement over O(n³). This combinatorial technique (parity grouping + combinations) is useful in many parity or subset-related counting problems in arrays, not just limited to XOR or set bits.


### Flashcard
Precompute parity of set bits for each number; count triplets where (parity[i] ⊕ parity[j] ⊕ parity[k]) == 0 using combinatorics.

### Tags
Array(#array), Bit Manipulation(#bit-manipulation)

### Similar Problems
