### Leetcode 2191 (Medium): Sort the Jumbled Numbers [Practice](https://leetcode.com/problems/sort-the-jumbled-numbers)

### Description  
Given a digit mapping (as an array mapping, where mapping[i] means digit i gets mapped to mapping[i]), and an array nums of integers, return nums **sorted by their values after mapping every digit**.  
- To get mapped value, for every digit in num, replace it using mapping.  
- Numbers that map to the same value retain their relative order from nums.  
- The original numbers are returned, not their mapped values.

### Examples  

**Example 1:**  
Input: `mapping = [8,9,4,0,2,1,3,5,7,6], nums = [991,338,38]`  
Output: `[338,38,991]`  
*Explanation:*
- 991: 9→6, 9→6, 1→9 → mapped value: 669
- 338: 3→0, 3→0, 8→7 → mapped: 007 (7)
- 38: 3→0, 8→7 → mapped: 07 (7)
- Mapped values: [669, 7, 7]. 338 and 38 (same mapped), preserve order. Sorted order: [338,38,991].

**Example 2:**  
Input: `mapping = [0,1,2,3,4,5,6,7,8,9], nums = [123,456,789]`  
Output: `[123,456,789]`  
*Explanation:*
- Mapping is identity, so mapped values are unchanged: [123, 456, 789]. Already sorted.

**Example 3:**  
Input: `mapping = [2,1,4,8,6,3,0,9,7,5], nums = [991,338,38]`  
Output: `[338,38,991]`  
*Explanation:*
- 991: 9→5, 9→5, 1→1 → 551
- 338: 3→8, 3→8, 8→7 → 887
- 38: 3→8, 8→7 → 87
- Mapped: [551, 887, 87]. Sorted mapped: [87,551,887], i.e. [38,991,338] — but original order among ties must be preserved; review for tie cases as per actual input.

### Thought Process (as if you’re the interviewee)  
- **Naive approach**: For each num, build its mapped value, then sort by mapped value, tie-breaking on input order to preserve stability.
- **How to get mapped value**: For a num, extract its digits, map using mapping[], reconstruct number.
- **Stability**: Python's (and most languages') sort is stable — original order is preserved among ties.
- **Final approach**: Tie mapping with original index or leverage stability.  
  - Map: [(mapped_value, original_index, num)]
  - Sort by mapped_value (and original_index if manual stability is needed).
  - Return [num for ... in sorted list].

### Corner cases to consider  
- Empty nums array ⇒ should return []
- mapping results in leading zeros (e.g. mapping[3]=0) ⇒ mapped value can have leading zeros, but int conversion will remove them
- All nums have same mapped value ⇒ input order preserved
- Single-element nums array
- Large numbers, different lengths

### Solution

```python
def sortJumbled(mapping, nums):
    # Helper to map each digit in a number using mapping and build mapped value
    def mapped_value(num):
        if num == 0:
            return mapping[0]
        digits = []
        n = num
        while n > 0:
            digits.append(mapping[n % 10])
            n //= 10
        # Digits are in reverse order
        value = 0
        for d in reversed(digits):
            value = value * 10 + d
        return value

    # For each num, compute its mapped value and store original index (optional)
    mapped_with_index = []
    for idx, num in enumerate(nums):
        mapped_with_index.append((mapped_value(num), idx, num))
    
    # Sort by mapped value, then input order for stability (index ensures stability manually, but
    # Python's sort is stable, so index tie-breaker is optional)
    mapped_with_index.sort(key=lambda x: (x[0], x[1]))
    
    # Return only the nums in new sorted order
    return [num for _, _, num in mapped_with_index]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n + n log n), where n = len(nums), m = average number of digits per num.
  - For each num, mapping its digits costs O(m), for n numbers is O(mn).
  - Sorting is O(n log n).
- **Space Complexity:** O(n), for the list storing (mapped_value, original_index, num) tuples.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you sort *in place* to reduce extra space?
  *Hint: Try decorating the original array with mapped values, sort, then undecorate.*

- Can you handle extremely long input numbers (as strings instead of int)?
  *Hint: Adapt mapped_value to work digit-by-digit on strings.*

- What if mapping is changed very frequently? How to speed up repeated queries?
  *Hint: Consider memoization or pre-mapping for known num ranges.*

### Summary
This problem is a classic "decorate-sort-undecorate" (DSU/Schwartzian transform).  
Mapping each number is “decorating,” sorting by mapped value is sorting, then “undecorate” by projecting back to the original nums.  
This pattern appears in custom-sorting questions, radix problems, or anywhere elements must be sorted by complicated transformations while preserving original order (or ties).  
Familiar in string sorting, word transforms, and even digit/bitwise custom sorts.