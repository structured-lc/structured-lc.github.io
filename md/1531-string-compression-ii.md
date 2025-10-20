### Leetcode 1531 (Hard): String Compression II [Practice](https://leetcode.com/problems/string-compression-ii)

### Description  
Given a string `s` and an integer `k`, you can delete at most `k` characters from `s`. Your goal is to **minimize the length of the run-length encoding** (RLE) of the resulting string.  
RLE replaces sequences of the same character with that character followed by the number of occurrences (if >1). For example, "aaa" becomes "a3", and "abbbc" becomes "ab3c".

Design an algorithm to find the minimal RLE length achievable by deleting up to `k` characters.

### Examples  

**Example 1:**  
Input: `s = "aaabcccd", k = 2`  
Output: `4`  
*Explanation: Delete two 'c's to get "aaabccd". RLE is "a3bc2d" → length 5, but better is delete 'b' and one 'c' to get "aaacccd" → RLE is "a3c3d" → length 4 (minimum possible).*

**Example 2:**  
Input: `s = "aabbaa", k = 2`  
Output: `2`  
*Explanation: Delete two different chars to get "aaaa". RLE is "a4" → length 2.*

**Example 3:**  
Input: `s = "aaaaaaaaaaa", k = 0`  
Output: `3`  
*Explanation: No deletions. RLE of "aaaaaaaaaaa" is "a11" → length 3 ("a" + "11").*

### Thought Process (as if you’re the interviewee)  

Start by understanding that brute force would mean considering all possible ways to delete up to `k` characters (combinatorial explosion, very slow).  
But notice that the problem has **optimal substructure** and **overlapping subproblems** – prime for DP.

Brute Force:
- Try all combinations: For each character, keep or delete (if k allows), and recursively process the rest.  
- For every substring, calculate possible compressed length.
- This approach is too slow for input size (exponential).

Optimization:
- Use **Dynamic Programming** with memoization.
- Define state by the index `i` in the string, the number of deletions left `k`, the previous char, and the count of that char.
- Use a DP table: `dp(i, k, prev_char, prev_count)`
  - At each step:  
    - Option 1: **Delete** `s[i]` (if k > 0).  
    - Option 2: **Keep** `s[i]`. If it continues a streak, only increment count; otherwise, add a new char to RLE.
- Key detail: Compressed length increases at count = 1 → 2 and at 9 → 10, etc. (when the digit count increases).
- Advanced: Because `prev_char` and `prev_count` could be large but the max useful count for length increase is 10–100, cap count to 10+ for DP.

This problem is classic **DP with bounded state space** and **state compression**.

### Corner cases to consider  
- Empty string input (s = "").
- `k` is 0: No deletions allowed.
- `k` ≥ len(s): You can fully delete s; answer is 0.
- Highly repetitive sequences (e.g., "aaaaaa").
- Alternating characters (e.g., "ababab").
- Cases where deleting in the **middle** is optimal, not at start/end.
- RLE length increase when going from single to double digits (e.g., 9→10).

### Solution

```python
def getLengthOfOptimalCompression(s: str, k: int) -> int:
    from functools import lru_cache

    n = len(s)
    
    def compressed_length(count):
        # RLE length: 1 (char) + digits in count if count > 1
        if count == 1:
            return 1
        elif count < 10:
            return 2  # char + one digit
        elif count < 100:
            return 3  # char + two digits
        else:
            return 4  # char + three digits

    @lru_cache(maxsize=None)
    def dp(i, k, prev_char, prev_count):
        if k < 0:
            return float('inf')  # Invalid, too many deletions
        if i == n:
            return 0  # End: no more chars
        
        # Option 1: Delete s[i]
        delete = dp(i + 1, k - 1, prev_char, prev_count)
        
        # Option 2: Keep s[i]
        if s[i] == prev_char:
            # Continue the same streak
            # Only increase RLE length if count transitions from 1→2, 9→10, 99→100
            increment = 1 if prev_count in (1, 9, 99) else 0
            keep = increment + dp(i + 1, k, prev_char, prev_count + 1)
        else:
            # Start new streak
            keep = 1 + dp(i + 1, k, s[i], 1)
        
        # Return minimum compressed length
        return min(delete, keep)
    
    return dp(0, k, '', 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n × k × 26 × 101), where n = len(s).  
  - n positions, k deletions, 26 possible previous chars, and prev_count capped at 100 for compression purposes (after 100, extra digits don't matter for compressed length).

- **Space Complexity:**  
  O(n × k × 26 × 101) for the memoization table (DP cache).

---

### Potential follow-up questions (as if you’re the interviewer)  

- What if instead of deletion, we are allowed to insert or change any character?
  *Hint: Think about how state transitions would change.*

- Suppose the RLE encoding used different rules, e.g., only compressing runs ≥2 or limiting the max run length shown.
  *Hint: Adjust the way compressed_length is computed.*

- Can this DP be optimized to use less memory, or converted to iterative bottom-up?
  *Hint: Explore how states depend only on the next position, and possible DP table reductions.*

---

### Summary
This problem exemplifies the **DP with state compression pattern**—storing subproblem solutions parameterized by position, operations left, and a limited summary of history.  
It's a common approach in string edit and optimization problems with “delete/keep/replace” choices. The technique of bounding state (here, prev_count capped >100) and careful compression length transitions (digit boundaries in RLE) is a common interview theme.  
This pattern is applicable in text compression, edit distance, and subsequence/subarray optimizations.


### Flashcard
Apply dynamic programming to optimize character deletion, leveraging optimal substructure and overlapping subproblems.

### Tags
String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- String Compression III(string-compression-iii) (Medium)