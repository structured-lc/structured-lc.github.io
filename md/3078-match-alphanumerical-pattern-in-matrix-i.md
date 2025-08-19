### Leetcode 3078 (Medium): Match Alphanumerical Pattern in Matrix I [Practice](https://leetcode.com/problems/match-alphanumerical-pattern-in-matrix-i)

### Description  
Given an integer matrix **board** (with digits 0–9) and a 2D character matrix **pattern** (with characters '0'-'9' or 'a'-'z'), find the *upper-left* coordinate of the first submatrix in **board** (with the same size as **pattern**) that matches **pattern** by these rules:
- If a **pattern** cell is a digit, it must match the exact digit in **board**.
- If a **pattern** cell is a letter, it must be mapped to some unique digit for that letter, consistently within the window. Different letters map to different digits.
Return `[row, col]` of the top-left corner; if no match exists, return `[-1, -1]`. For ties, pick the smallest row first, then column.

### Examples  

**Example 1:**  
Input:  
board = `[[1,2,2],[2,2,3],[2,3,3]]`,   
pattern = `["aba","bbb"]`  
Output: `[0,1]`  
*Explanation:  
Checking at (row=0, col=1):  
Submatrix:  
```
2 2 3  
2 3 3  
```
Map: 'a'→2, 'b'→3.  
"aba" → "232", "bbb" → "333", but matches the submatrix, so output [0,1].*

**Example 2:**  
Input:  
board = `[[1,2,3],[4,5,6],[7,8,9]]`,  
pattern = `["xyz", "xyz"]`  
Output: `[0,0]`  
*Explanation:  
Upper-left submatrix:  
```
1 2 3  
4 5 6
```
If we map 'x'→1, 'y'→2, 'z'→3, matches. 
Next row also has this pattern, 
So output [0,0].*

**Example 3:**  
Input:  
board = `[[1,2],[3,4]]`,  
pattern = `["12","34"]`  
Output: `[0,0]`  
*Explanation:  
Here pattern consists only of digits, so must match exactly.
board submatrix  
1 2  
3 4  
Also matches exactly, output [0,0].*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  - For all possible positions (r, c) where a pattern of given size fits:
    - Slide the pattern window.
    - For each window, check if digits match exactly; for letters, attempt to assign a digit for each unique letter (every occurrence of a letter in the pattern must correspond to the same digit in the board submatrix).
    - Maintain two mappings: letter → digit and digit → letter (to enforce bijection for letters and avoid conflicting mappings).
    - If at any mismatch, break and move to next window.
  - Return the earliest (row, col) found.
- **Why this approach?**  
  - The matrix is not large (as implied by brute-force acceptance and O(1) extra space).
  - No more optimized approach suggested; problem reduces cleanly to window-compare with hash mapping per attempt.
  - Tradeoff: No possible precalculation since mapping depends on each unique window.
  
### Corner cases to consider  
- **Pattern** larger than **board**: should return `[-1, -1]`
- **Pattern** with only digits: behaves as exact matching
- All pattern letters map to same digit in the window  
- Same letter appears multiple times—test mapping is consistent.
- Two letters, same digit in submatrix (should fail since mapping must be unique).
- Empty pattern or board (judge constraints likely disallow)

### Solution

```python
def findPattern(board, pattern):
    R, C = len(board), len(board[0])
    r, c = len(pattern), len(pattern[0])
    
    for i in range(R - r + 1):
        for j in range(C - c + 1):
            letter_to_digit = {}
            digit_to_letter = {}
            ok = True
            for x in range(r):
                for y in range(c):
                    p_ch = pattern[x][y]
                    b_d = board[i + x][j + y]
                    
                    if p_ch.isdigit():
                        if int(p_ch) != b_d:
                            ok = False
                            break
                    else:
                        if p_ch in letter_to_digit:
                            if letter_to_digit[p_ch] != b_d:
                                ok = False
                                break
                        else:
                            if b_d in digit_to_letter:
                                if digit_to_letter[b_d] != p_ch:
                                    ok = False
                                    break
                            letter_to_digit[p_ch] = b_d
                            digit_to_letter[b_d] = p_ch
                if not ok:
                    break
            if ok:
                return [i, j]
    return [-1, -1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(M × N × r × c),  
  where M, N are dimensions of **board**, and r, c are dimensions of **pattern**.
  For every possible top-left window, we check every cell in the window.
- **Space Complexity:** O(1)  
  (since temporary maps are at most 26 keys for letters and 10 for digits per window; does not depend on input size.)

### Potential follow-up questions (as if you’re the interviewer)  

- What if **pattern** could have both uppercase and lowercase letters?  
  *Hint: Would need to treat them as distinct, extend map capacity.*

- Can you return all positions of submatrices matching the pattern, not just the first?  
  *Hint: Simple – collect result list instead of early returning. More space, but similar logic.*

- If the letters can repeat in **pattern**, but **board** also allows digits >9 or letters in cells?  
  *Hint: Mapping may need to be generalized; adapt checks accordingly.*

### Summary
This problem is an example of a **sliding window with pattern mapping** in a 2D grid. The **bijective letter-to-digit mapping** inside candidate windows is a classic pattern seen in “isomorphic string” problems and 2D substring search. This technique is widely applicable for submatrix matching, isomorphism, and mapping-consistency checks.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Matrix(#matrix)

### Similar Problems
