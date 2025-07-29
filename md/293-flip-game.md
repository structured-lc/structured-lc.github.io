### Leetcode 293 (Easy): Flip Game [Practice](https://leetcode.com/problems/flip-game)

### Description  
Given a string of only `'+'` and `'-'` characters representing coins (where `'+'` is heads up and `'-'` is tails up), identify all possible states after **one valid move**. A valid move consists of flipping any **two consecutive `'+'`** into `'--'`. Return all possible states after one such move. If there’s no valid move, return an empty list.

### Examples  

**Example 1:**  
Input: `"++++"`  
Output: `["--++", "+--+", "++--"]`  
*Explanation: The valid moves:*
- Flip positions 0-1: `"--++"`
- Flip positions 1-2: `"+--+"`
- Flip positions 2-3: `"++--"`

**Example 2:**  
Input: `"+"`  
Output: `[]`  
*Explanation: Not enough consecutive `'+'` to flip, so no moves available.*

**Example 3:**  
Input: `"+-++"`  
Output: `["+--+", "+- --"]`  
*Explanation:*
- Only the last two positions (`++` at 2 and 3) can be flipped to form `"+- --"`.
- If there's a `'++'` at position 0-1, it would become `'--++'` (which does not apply here).

### Thought Process (as if you’re the interviewee)  
- The task is to generate **all possible results by flipping any two consecutive `'+'` to `'--'` once**.
- The brute force way: For every consecutive pair in the string, if both are `'+'`, make a string-copy, flip those to `'-'` and add to the results.
- Since each flip is independent and we're making only *one* flip per output, no need for recursion or backtracking.
- **Optimized logic:**  
  - Perform a linear scan through the string from left to right.
  - At each index, check if `s[i]` and `s[i+1]` are both `'+'`.
  - If so, construct a new string with those two replaced by `'-'` and add to results.
  - Move to the next index.
- This approach is efficient (O(n)), readable, and suits interview expectations.

### Corner cases to consider  
- Empty string: `""`  
- String length 1: `"+"`, `"-"`
- String with no `'++'` at all: `"+-+--"`
- String with all `'-'`: `"----"`
- Multiple non-overlapping pairs

### Solution

```python
def generatePossibleNextMoves(currentState: str) -> list[str]:
    result = []
    for i in range(len(currentState) - 1):
        # Check if current and next character are both '+'
        if currentState[i] == '+' and currentState[i + 1] == '+':
            # Create new state with i and i+1 flipped to '-'
            flipped = currentState[:i] + "--" + currentState[i+2:]
            result.append(flipped)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Where n is the length of `currentState`. The string is scanned once, and new results are constructed in O(n) time if a flip is found, at most n-1 flips.
- **Space Complexity:** O(n × m)  
  Where m is the number of valid moves found; since each string copy is O(n), and up to n copies in the worst case.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to generate all possible states after any number of sequential valid flips?  
  *Hint: Try using recursion/backtracking to explore all possible future moves.*

- How would you determine if the start state is a winning position, assuming two players play optimally?  
  *Hint: Minimax or recursive search with memoization for each state.*

- If the string can have other characters, how would you adapt your solution?  
  *Hint: Only consider pairs where characters match the valid criteria (‘++’ → ‘--’).*

### Summary
This problem is a classic application of the *scan & construct* pattern for string-manipulation problems. The approach is a simple linear scan, looking for substrings to manipulate independently. This type of pattern is commonly found in competitive string, simulation, and game problems and forms a building block for deeper state-space search optimizations in more advanced variations.