### Leetcode 816 (Medium): Ambiguous Coordinates [Practice](https://leetcode.com/problems/ambiguous-coordinates)

### Description  
Given a string that represents a two-dimensional coordinate (like "(123)" or "(00011)") with all commas, decimal points, and spaces removed except the parentheses, restore all possible valid original coordinate representations.  
A valid coordinate:
- Has numbers in the form x, y
- Can have a decimal point (for instance, "12.3", not ".123" or "123.")
- Cannot have leading zeros unless the whole number is "0" (so "00.11" is invalid)
- Decimals cannot have trailing zeros ("1.0" is valid, "1.00" is not)
Return all possible (x, y) coordinate strings that could have produced the input.

### Examples  

**Example 1:**  
Input: `(123)`  
Output: `["(1, 23)", "(1, 2.3)", "(12, 3)", "(1.2, 3)"]`  
*Explanation:  
- Split as 1|23 → (1,23)  
- Split as 1|23, use decimal in right: (1, 2.3)  
- Split as 12|3 → (12,3)  
- Split as 1.2|3 → (1.2,3)*

**Example 2:**  
Input: `(00011)`  
Output: `["(0.001, 1)", "(0, 0.011)"]`  
*Explanation:  
- 0|001 → (0, 0.011). Only "0.011" is valid (no trailing zeros after decimal, must have leading 0 before dot).
- 0.001|1 → (0.001, 1)*

**Example 3:**  
Input: `(0123)`  
Output: `["(0, 123)", "(0, 1.23)", "(0, 12.3)", "(0.1, 23)", "(0.1, 2.3)", "(0.12, 3)"]`  
*Explanation:  
- 0|123 → (0,123), (0,1.23), (0,12.3)
- 0.1|23 → (0.1,23), (0.1,2.3)
- 0.12|3 → (0.12,3)*

### Thought Process (as if you’re the interviewee)  
First, restore the structure by splitting the input string (without parens) into all possible two non-empty substrings for x and y. For each half:
- Enumerate all ways to insert a decimal point (at every possible position except the ends).
- Only keep those forms without invalid leading or trailing zeros.

Brute-force would be generating all partitions and decimal insertions, but the key challenge is to filter out invalid numbers efficiently (e.g., no "01", "1.0", "0.00").  
A helper function should generate all valid representations for a string segment:
- If it's more than one character and starts with '0', only allow forms starting as "0.xxx".
- Don't allow decimals with trailing '0'.
Finally, combine each valid left and right, formatting as "(x, y)".

Optimizing further is not strictly necessary because at each split there are about len(s)-2 positions and at most len(s) possibilities for x and y, so absolute O(N²) solutions are acceptable for small strings.

### Corner cases to consider  
- Segments that are all zeros: "0", "00", "000"
- Leading zeros: "01", "0001"
- Trailing zeros: "10", "10.0", "10.00"
- No valid decimals: e.g., can't do "1." or ".1"
- Only one valid split: extremely short inputs "()" or "(0)"
- Input length exactly 4: "(100)", has only (1,0), (1,0.0), etc.

### Solution

```python
def ambiguousCoordinates(s: str):
    # Remove parentheses
    s = s[1:-1]
    
    # Helper: Generate all valid representations of a numeric string
    def possible_numbers(segment):
        n = len(segment)
        results = []
        # Pure integer (no decimal point)
        if n == 1 or segment[0] != '0':
            results.append(segment)
        # "0.xxx" case
        if n > 1 and segment[0] == '0' and segment[-1] != '0':
            results.append(segment[0] + '.' + segment[1:])
        # General case: try all possible placements of a decimal point
        if segment[0] != '0':
            for i in range(1, n):
                left = segment[:i]
                right = segment[i:]
                # Right can't end with '0'
                if right[-1] == '0':
                    continue
                results.append(left + '.' + right)
        return results
    
    n = len(s)
    res = []
    # Try all possible splits between x and y
    for i in range(1, n):
        left = s[:i]
        right = s[i:]
        lefts = possible_numbers(left)
        rights = possible_numbers(right)
        for l in lefts:
            for r in rights:
                res.append(f"({l}, {r})")
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n³), where n is the length of the string (excluding parentheses).  
  For every split (O(n)), we generate O(n) possible lefts and rights; each validation can be O(n). The total number of outputs is bounded by input size.
- **Space Complexity:** O(n³), in the worst case, all possible combinations may be stored in output and in temporary lists.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the code if thousands of coordinate pairs are expected, and low latency is critical?  
  *Hint: Filter candidates early, minimize string allocations.*

- Can you generalize this approach to 3D or higher-dimensional ambiguous coordinates?  
  *Hint: More partitions; generalize helper logic for k splits.*

- What if you want only unique outputs (some ambiguous strings may map to the same coordinate as strings)?  
  *Hint: Use a set for deduplication.*

### Summary
This problem demonstrates a **string backtracking/enumeration** pattern—partitioning, generating variants with rules, and filtering on validity. The core is a helper function to enumerate all "insert decimal point" options, given constraints on digit validity. This technique applies to "ambiguous parsing", number string validation, and some combinatorial string generation problems.


### Flashcard
For all possible splits of the digits into x and y, generate all valid decimal placements (no leading/trailing zeros) for each, and combine.

### Tags
String(#string), Backtracking(#backtracking), Enumeration(#enumeration)

### Similar Problems
