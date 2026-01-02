### Leetcode 3769 (Easy): Sort Integers by Binary Reflection [Practice](https://leetcode.com/problems/sort-integers-by-binary-reflection)

### Description  
Given an array of positive integers, the **binary reflection** of a number is obtained by reversing its binary digits (without leading zeros) and interpreting the result as a decimal number. Sort the array in ascending order first by binary reflection value; if two numbers have the same reflection, place the smaller original number first.

### Examples  

**Example 1:**  
Input: `[4,5,4]`  
Output: `[4,4,5]`  
*Explanation: Binary of 4 is 100 (reflection: 001 → 1), 5 is 101 (reflection: 101 → 5), 4 again (1). Reflections [1,5,1] sort as 1≤1≤5; for equal reflections (both 1), smaller original 4 comes before other 4 (though equal here).*

**Example 2:**  
Input: `[1,2,3]`  
Output: `[1,3,2]`  
*Explanation: Binary: 1=1 (refl=1), 2=10 (refl=01→1), 3=11 (refl=11→3). Reflections [1,1,3]; for 1 and 2 (both refl=1), smaller original 1 before 2.*

**Example 3:**  
Input: `[7]`  
Output: `[7]`  
*Explanation: Binary 7=111 (refl=111→7). Single element unchanged.*

### Thought Process (as if you’re the interviewee)  
First, brute-force: compute binary reflection for each number by converting to binary string, reversing it (strip leading zeros), convert back to int, then sort array by these values with tie-breaker on original value. This works but uses strings (O(n log n * 32) time due to string ops per compare).  

Optimize: Use custom sort key pairing (reflection, original) for stable sorting. To avoid strings, bit-manipulate reflection: find bit length, reverse bits in that length using swaps or mask. But string method is simpler, readable, and efficient for 32-bit ints (no lib shortcuts needed). Final choice: strings for clarity in interview; trade-off is minor perf hit vs bit tricks, but correct and O(n log n).

### Corner cases to consider  
- Empty array: return empty.  
- Single element: return unchanged.  
- All elements equal: unchanged (same reflection).  
- Elements with same reflection but different values (e.g., 1=1, 2=10→1): smaller original first.  
- Max 32-bit int (2³²-1): full 32 '1's reverses to itself.  
- Powers of 2 (e.g., 8=1000→0001=1): minimal reflection.

### Solution

```python
def sortByBinaryReflection(nums):
    # Helper to compute binary reflection: bin(n)[2:] gets binary str w/o '0b',
    # reverse it, int() back to decimal (auto strips leading zeros)
    def reflection(n):
        b = bin(n)[2:]  # e.g., 4 -> '100'
        return int(b[::-1], 2)  # '100'[::-1]='001' -> int('1',2)=1
    
    # Create list of (reflection, original) tuples for custom sort
    # Sort is stable: first by refl asc, then by original asc on ties
    pairs = [(reflection(num), num) for num in nums]
    pairs.sort()  # Python's sort handles tuple comparison perfectly
    
    # Extract originals in sorted order
    return [pair[1] for pair in pairs]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n × 32), where n≤10⁵: sort dominates (log n compares), each reflection O(bit length)=O(32) for string reverse/convert.  
- **Space Complexity:** O(n): pairs list + output; no recursion.

### Potential follow-up questions (as if you’re the interviewer)  

- Implement reflection without strings, using bit manipulation only.  
  *Hint: Find bit length (floor(log2(n))+1), then reverse exactly that many bits with loop/mask (e.g., swap bits from ends).*

- What if we must sort descending by reflection, stable on original descending too?  
  *Hint: Use custom key=(-refl, -original) or comparator; discuss stability.*

- Extend to k-bit fixed-width reflection (pad zeros), how does sorting change?  
  *Hint: Leading zeros now matter (e.g., pad to 32 bits always); recompute reflections.*

### Summary
Pair each number with its binary reflection, sort the pairs (reflection primary asc, original secondary asc), then extract originals. Common **custom sort key** pattern (tuples/lists); applies to problems like sort-by-1s-count (LC 1796), sort-by-string-length, or multi-criteria sorting.

### Flashcard
Pair each num with its binary reflection (reverse bin digits → int), sort pairs by (refl asc, original asc) for ties, extract originals in O(n log n). Avoid libs; use bin()[2:][::-1] for reflection.

### Tags
Array(#array), Sorting(#sorting)

### Similar Problems
