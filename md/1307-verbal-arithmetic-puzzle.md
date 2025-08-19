### Leetcode 1307 (Hard): Verbal Arithmetic Puzzle [Practice](https://leetcode.com/problems/verbal-arithmetic-puzzle)

### Description  
Given an array of words and a result word, assign a unique digit (0-9) to each unique letter, so that the sum of the words (converted into numbers) equals the numerical value of the result word. Leading zeros are not allowed on any word. You must return true if such an assignment exists --- otherwise, return false.

### Examples  
**Example 1:**  
Input: `words = ["SEND", "MORE"], result = "MONEY"`  
Output: `true`  
*Explanation: 9567 + 1085 = 10652. Each letter uniquely mapped to a digit.*

**Example 2:**  
Input: `words = ["SIX","SEVEN", "SEVEN"], result = "TWENTY"`  
Output: `true`  
*Explanation: An assignment exists (mapping can be found by backtracking).* 

**Example 3:**  
Input: `words = ["LEET","CODE"], result = "POINT"`  
Output: `false`  
*Explanation: No possible unique assignment.*

### Thought Process (as if you’re the interviewee)  
- We need to find an injective mapping from letters to digits, such that the word sum property holds, with no word starting with 0.
- The number of unique letters is at most 10. Try all possible assignments (backtracking/permutation), and check if sum holds.
- Prune invalid mappings early (if a word would start with 0, fail fast; if partial sum can't match needed column, backtrack).
- For each position (from rightmost digit), add constraints and recurse. Use set for usedDigits, dict for letter→digit.

### Corner cases to consider  
- More than 10 unique letters: impossible.
- Leading zero assignment (forbid for any word or result).
- Duplicate words, e.g. words with repeated letters.
- Very long words versus short result.

### Solution

```python
def isSolvable(words, result):
    from collections import defaultdict
    # All unique letters
    letters = set(''.join(words) + result)
    if len(letters) > 10:
        return False
    letters = list(letters)
    first_letters = set(word[0] for word in words + [result])

    n = len(letters)
    m = max(map(len, words + [result]))
    W = len(words)
    words_pad = [word.rjust(m, '0') for word in words]
    result_pad = result.rjust(m, '0')

    # For each position (from right), keep set of letters in col
    def backtrack(idx, used_digits, mapping, carry):
        if idx == m:
            return carry == 0
        cur_sum = carry
        cur_letters = []
        for w in range(W):
            ch = words_pad[w][-1 - idx]
            if mapping.get(ch) is not None:
                cur_sum += mapping[ch]
            else:
                cur_letters.append((ch, w))
        rch = result_pad[-1 - idx]
        if mapping.get(rch) is not None:
            expected = mapping[rch]
        else:
            expected = None
        # Try all assignments for current col
        def try_assign():
            if not cur_letters:
                d = cur_sum % 10
                if expected is not None:
                    return d == expected and backtrack(idx+1, used_digits, mapping, cur_sum // 10)
                elif d in used_digits or (rch in first_letters and d == 0):
                    return False
                mapping[rch] = d
                used_digits.add(d)
                ok = backtrack(idx+1, used_digits, mapping, cur_sum // 10)
                used_digits.remove(d)
                del mapping[rch]
                return ok
            else:
                ch, w = cur_letters[0]
                for d in range(10):
                    if d in used_digits or (ch in first_letters and d == 0):
                        continue
                    mapping[ch] = d
                    used_digits.add(d)
                    if try_assign():
                        return True
                    used_digits.remove(d)
                    del mapping[ch]
                return False
        return try_assign()

    return backtrack(0, set(), {}, 0)
```

### Time and Space complexity Analysis  
- **Time Complexity:** Up to O(10!) worst case, but pruning helps. Number of unique letters is at most 10, so complexity is feasible for small cases.
- **Space Complexity:** O(1) for assignment (constant, since assignments up to 10 letters), plus stack recursion.

### Potential follow-up questions (as if you’re the interviewer)  
- How to prune bad branches more aggressively?  
  *Hint: Check partial column sums before assigning new digits.*

- How to adapt if duplicate digits are allowed (not unique per letter)?  
  *Hint: Loosen the letter→digit injective mapping constraint.*

- What if you want to output *all* valid assignments, not just existence?
  *Hint: Store all solutions as they are found and continue recursion.*

### Summary
A classic **backtracking** and **constraint satisfaction** problem that is as much about search pruning as brute-force checking. Applies to a broad class of puzzles (cryptarithmetic, alphametics) with combinatorial state and digit-assignment constraints.

### Tags
Array(#array), Math(#math), String(#string), Backtracking(#backtracking)

### Similar Problems
