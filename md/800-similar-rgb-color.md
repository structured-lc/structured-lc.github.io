### Leetcode 800 (Easy): Similar RGB Color [Practice](https://leetcode.com/problems/similar-rgb-color)

### Description  
Given a 6-digit hex color string (like "#09f166"), return the most similar color in shorthand hex notation ("#XYZ") where each channel (X, Y, Z) is a duplicated hex digit (`'AA'`, `'BB'`, ...). The *shorthand* uses digits from `00`, `11`, ..., `ff` for each color component (R, G, B), and is expanded as "#AABBCC".  
Similarity is defined as minimizing the sum of squared channel differences:  
For colors "#ABCDEF" and "#UVWXYZ",  
similarity = −((AB−UV)² + (CD−WX)² + (EF−YZ)²).  
Return the shorthand string (e.g., "#11ee66") that is closest to the input.

### Examples  

**Example 1:**  
Input: `#09f166`  
Output: `#11ee66`  
*Explanation: Split to "09", "f1", "66". For each, find the closest in {"00","11","22",...,"ff"}:  
- 09 → 11 (closest: 17)  
- f1 → ee (closest: 238)  
- 66 → 66 (already exact).  
Resulting in "#11ee66".*

**Example 2:**  
Input: `#4e3fe1`  
Output: `#5544ee`  
*Explanation:  
- 4e → 55 (85)  
- 3f → 44 (68)  
- e1 → ee (238)  
So result is "#5544ee".*

**Example 3:**  
Input: `#123456`  
Output: `#112233`  
*Explanation:  
- 12 → 11 (17)  
- 34 → 33 (51)  
- 56 → 55 (85)  
So output: "#112233".*

### Thought Process (as if you’re the interviewee)  
Start by observing:
- Each channel in the shorthand can only be "00", "11", ..., "ff" (step 0x11 = 17 decimal).
- For each 2-digit channel in the input, need to find the nearest of these shorthand values.

Brute-force:  
For each channel:
- Try all 16 possible shorthand candidates.
- Compute squared difference, pick the candidate with minimum difference.
But actually, this can be optimized mathematically.

Since shorthand values are multiples of 17:
- Given a channel value v (in 0..255), its nearest shorthand is round(v / 17) \* 17.
- For tie, the lower one wins (as per hex rounding rules).

So the optimal solution is:
- For each channel, parse as integer.
- Compute nearest shorthand value as: closest_multiple = int((v + 8) // 17) \* 17
- Convert back to two-digit hex with both digits same (e.g., "aa" for A).

Build the result by processing all three channels and joining.

### Corner cases to consider  
- Already-shorthand colors (e.g., "#aabbcc") should be unchanged.
- Values exactly halfway between shorthand options (e.g., 0x18 between 0x11 and 0x22).
- Input always valid, always length 7 with lowercase hex digits per problem.
- Minimum/maximum channel values, e.g., "00", "ff".

### Solution

```python
def similarRGB(color: str) -> str:
    # Helper to get nearest shorthand (both digits the same) for a two-char hex channel
    def nearestSimilar(comp: str) -> str:
        value = int(comp, 16)
        # Compute nearest multiple of 17 (0x11) using rounding
        k = int((value + 8) // 17)  # Add 8 for rounding to nearest
        shorthand = 17 * k
        # Format as two hex digits, both the same
        hex_str = '{:02x}'.format(shorthand)
        return hex_str

    res = "#"
    # Process each color component ('RR','GG','BB')
    for i in range(1, 7, 2):
        comp = color[i:i+2]
        res += nearestSimilar(comp)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1).  
  Only performs constant work: three fixed-length parses and small calculations.
- **Space Complexity:** O(1).  
  Only a few variables and a short output.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input is not guaranteed valid (e.g., wrong length or chars)?  
  *Hint: Think about input validation and error handling.*

- How would you handle uppercase input hex or ensure output is lowercase?  
  *Hint: Enforce `.lower()` on input/output, or use string formatting for consistent casing.*

- If a color code uses 8 digits (e.g., includes alpha), how would you adapt?  
  *Hint: Maintain logic, but process in chunks of two, possibly ignore or separately process alpha.*

### Summary
This problem uses a *digit grouping & rounding pattern*: each channel is mapped to the nearest allowed shorthand value (multiples of 17).  
Rounding to the nearest fixed step and reconstructing a string is a pattern seen in quantization, color compression, and binning problems.  
The direct mathematical rounding makes this a classic interview problem for recognizing patterns and avoiding unnecessary brute-force.