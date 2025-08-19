### Leetcode 2118 (Hard): Build the Equation [Practice](https://leetcode.com/problems/build-the-equation)

### Description  
Given a list of terms where each term is represented by a pair (**power**, **factor**), generate a string representing an algebraic equation in one variable `X`.  
Each term should be formatted as:  
- `+factorX^power` (for positive factor, `power` > 1)  
- `+factorX` (for positive factor, `power` = 1)  
- `+factor` (for positive factor, `power` = 0)  
Negative factors do not have an extra `+` (e.g., `-2X` instead of `+-2X`).  
The terms should be ordered by descending **power**. The equation must end with `=0`.

### Examples  

**Example 1:**  
Input: `terms = [[2, 1], [1, -4], [0, 2]]`  
Output: `+1X^2-4X+2=0`  
Explanation:  
Terms sorted by power: (2,1), (1,-4), (0,2):  
- 2,1 → `+1X^2`  
- 1,-4 → `-4X`  
- 0,2  → `+2`  
Joined and suffixed with `=0`.

**Example 2:**  
Input: `terms = [[4, -4], [2, 1], [1, -1]]`  
Output: `-4X^4+1X^2-1X=0`  
Explanation:  
Sorted: (4,-4), (2,1), (1,-1):  
- 4,-4 → `-4X^4`  
- 2,1  → `+1X^2`  
- 1,-1 → `-1X`  
Result concatenated and finished with `=0`.

**Example 3:**  
Input: `terms = [[1, 3], [0, -5]]`  
Output: `+3X-5=0`  
Explanation:  
Sorted: (1,3), (0,-5):  
- 1,3 → `+3X`  
- 0,-5 → `-5`  
Result: `+3X-5=0`.

### Thought Process (as if you’re the interviewee)  
I’d first parse the input as a list of [power, factor] pairs. The task is to join these as a string equation with special formatting rules.  
Brute force:  
- Sort terms by descending power.
- For each term:  
   - If factor > 0, prefix with `+`.
   - If power == 0: no `X`.
   - If power == 1: use only `X`.
   - If power > 1: use `X^power`.
- Concatenate all term strings in order, append `=0`.

Potential optimizations are minimal since this is mostly string manipulation. Complexity is dominated by the sort.

Tradeoff:  
- Must manually handle all formatting rules.
- Very careful with plus/minus sign at the start, but the problem accepts a leading `+`.

### Corner cases to consider  
- Empty `terms` (should output `=0`)
- Some factors may be zero: skip such terms.
- Single term input, e.g., `[[0, 3]]` → `+3=0`
- Negative and positive factors.
- Duplicate powers (if asked as follow-up: sum up factors for identical powers)
- All terms zero → output should just be `=0`.

### Solution

```python
def build_the_equation(terms):
    # terms: List[List[int]] where each sub-list is [power, factor]
    # Sort terms by power descending
    terms.sort(reverse=True)

    result = ''

    for power, factor in terms:
        if factor == 0:
            continue  # Skip terms with 0 coefficient

        if factor > 0:
            result += '+'
        # Add factor (may be negative number)
        result += str(factor)
        # Power formatting rules
        if power == 0:
            continue  # No X or ^ for constant term
        elif power == 1:
            result += 'X'
        else:
            result += 'X^' + str(power)

    if not result:
        result = ''
    result += '=0'

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) due to sorting the list of n terms by descending power; assembling the string is O(n).
- **Space Complexity:** O(n) for the output string (proportional to number of terms), plus possible O(n) for the sorted list depending on sort implementation.

### Potential follow-up questions (as if you’re the interviewer)  

- If there are duplicate powers in input, sum the coefficients before formatting.  
  *Hint: Use dictionary to aggregate by power, then process as before.*

- Is it valid to omit the leading `+` if the first factor is positive?  
  *Hint: Discuss equation style and requirements; can be a formatting variation.*

- How to support variables other than `X`, or multiple variables?  
  *Hint: Generalize format and allow for variable input.*

### Summary
This problem is a **sorting and string building** exercise. The main trick is getting the formatting rules right for algebraic terms, especially sign management and power formatting.  
It’s a classic **custom string formatting problem** and occurs often in print logic or report generation situations, as well as in some algebraic symbolic computation preprocessing tasks.

### Tags
Database(#database)

### Similar Problems
