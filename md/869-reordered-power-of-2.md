### Leetcode 869 (Medium): Reordered Power of 2 [Practice](https://leetcode.com/problems/reordered-power-of-2)

### Description  
Given an integer **n**, determine whether it’s possible to reorder its digits (in any order, not allowing a leading zero) so that the result forms a **power of 2**.  
In other words, can you permute the digits of *n* to get a number that equals 2ˣ for some integer x?

### Examples  

**Example 1:**  
Input: `1`  
Output: `True`  
*Explanation: Only one digit. 1 = 2⁰, which is a power of 2.*

**Example 2:**  
Input: `10`  
Output: `False`  
*Explanation: "10" can become "01" (invalid, leading zero) or "10" (which is not a power of 2).*

**Example 3:**  
Input: `16`  
Output: `True`  
*Explanation: "16" can be reordered as "16" (16) or "61" (61). 16 = 2⁴, which is a power of 2.*

**Example 4:**  
Input: `24`  
Output: `False`  
*Explanation: The possible reorderings ("24", "42") are not a power of 2.*

**Example 5:**  
Input: `46`  
Output: `True`  
*Explanation: "64" is a valid reordering and 64 = 2⁶, a power of 2.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  - Generate all permutations of the digits.
  - For each permutation, check if the number doesn’t start with zero and is a power of 2.
  - This method involves generating up to n! permutations, which is infeasible for large n.

- **Optimization:**  
  - The core observation: *Reordering the digits doesn’t change their counts*.
  - For a power of 2 to be a permutation of n, it must have the **exact same sorted digits** as n.
  - Instead of permuting, check if there exists a power of 2 (within the range) with the same sorted digits as n.
  - Precompute all power-of-2 numbers with up to 9 digits (since 10⁹ is the upper bound).
  - For each, compare the sorted string (or digit counter) of n with the candidate power of 2.
  - If a match is found, return True.

- **Trade-offs:**  
  - This approach avoids the combinatorial explosion of checking all arrangements. Instead, it loops through at most 30 powers of 2 (from 2⁰ to 2²⁹) — efficient enough for real-time checks[4][5].

### Corner cases to consider  
- n is 1 digit (any 1-digit number, e.g., 1, 2, 4, 8…)
- n’s permutations can lead to numbers with leading zeros (e.g., 10 or 100)
- n itself is a power of 2
- n contains repeated digits (e.g., 1124)
- Very large values of n (up to the constraints)
- All same digits (e.g., 1111)

### Solution

```python
def reorderedPowerOf2(n: int) -> bool:
    # Helper function: returns sorted string of digits of num
    def get_sorted_str(num):
        return ''.join(sorted(str(num)))
    
    # Get sorted representation of input n
    target = get_sorted_str(n)
    
    # There are only 30 relevant powers of 2 in the 1...10^9 range
    for i in range(30):
        power_of_2 = 1 << i    # 2^i
        if get_sorted_str(power_of_2) == target:
            return True
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - For each power of 2 up to 2²⁹ (at most 30 checks), we sort the (at most 9-digit) string.
  - Sorting takes O(k log k), with k ≤ 9, so it’s O(1) per iteration.
  - So overall time: O(1) — *constant time for practical constraints*.

- **Space Complexity:**  
  - Extra space for string conversion and sorting, at most O(9) for a 9-digit number — *O(1) auxiliary space*.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle “reordered power of 3” or “reordered Fibonacci number”?
  *Hint: Think about generating the relevant number series and comparing digit signatures as before.*

- What if you want to allow leading zeros in rearrangements?
  *Hint: Just skip the non-leading-zero check for permutations. How would this change the result?*

- Can we further optimize space or precompute to handle many queries efficiently?
  *Hint: Consider storing valid fingerprints/keys for fast lookup if called repeatedly.*

### Summary
This approach leverages the **“digit signature/fingerprint”** pattern, comparing the sorted string (or count of each digit) for the input and all candidate powers of 2. This matching on rearrangement **avoids costly permutation generation** and instead reduces to a simple set comparison across a small candidate set.  
The “fingerprint match” is a generalizable trick used wherever permutation-based matches are needed, like “anagrams,” “digit reorders,” and “number transformations.”

### Tags
Hash Table(#hash-table), Math(#math), Sorting(#sorting), Counting(#counting), Enumeration(#enumeration)

### Similar Problems
