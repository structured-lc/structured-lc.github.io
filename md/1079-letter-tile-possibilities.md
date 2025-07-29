### Leetcode 1079 (Medium): Letter Tile Possibilities [Practice](https://leetcode.com/problems/letter-tile-possibilities)

### Description  
Given a string representing tiles, each character is a tile with a letter on it. Each tile may appear multiple times. Find **how many distinct non-empty sequences** can be created by arranging one or more of the tiles, using each tile at most as many times as it appears. Order matters (permutations, not combinations), and you cannot use any tile more times than its count in the input.

### Examples  

**Example 1:**  
Input: `tiles = "AAB"`  
Output: `8`  
Explanation: Possible sequences are "A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA".

**Example 2:**  
Input: `tiles = "AAABBC"`  
Output: `188`  
Explanation: There are 188 unique sequences you can form using these tiles, from all permutations of all lengths.

**Example 3:**  
Input: `tiles = "V"`  
Output: `1`  
Explanation: The only sequence is "V".

### Thought Process (as if you’re the interviewee)  
Start by thinking about the brute force:  
- Try every possible sequence you can construct using one or more tiles, making sure not to use a tile more times than its available quantity.
- For each recursive step, for every available letter, pick it (if not already used up), add it to the current sequence, decrement its count, and continue recursively.
- At each call, count the sequence if the current string is non-empty.
- Restore the count after recursion (backtrack).

Drawbacks of naive approach:  
- Generating all actual sequences with all variants would be very slow and memory intensive if not pruned for duplicates.

Optimized approach:  
- Use backtracking with a frequency counter for each letter.  
- At each decision point, choose a letter (if available), decrement its counter, add to sequence, recurse.  
- This approach avoids duplicates due to repeated tiles, because you only try each letter per recursive state if it’s available.

Why this works:  
- The constraint (tiles.length ≤ 7) is small, so we can afford generating all possible permutations.
- Backtracking is a natural fit for problems where you want to try choices and then undo them.

### Corner cases to consider  
- Empty input string (not possible as per constraints, but always good to check)
- All tiles are the same letter: e.g. "AAAAAA"
- Every character is unique: e.g. "ABCDEFG"
- Input of length 1
- Duplicates sequences from tiles like "AA" versus "AB"

### Solution

```python
def numTilePossibilities(tiles: str) -> int:
    def backtrack(counter):
        total = 0
        for ch in counter:
            if counter[ch] == 0:
                continue
            # Use the tile ch
            total += 1
            counter[ch] -= 1
            total += backtrack(counter)
            counter[ch] += 1  # backtrack
        return total

    # Count frequency of each letter
    from collections import Counter
    counter = Counter(tiles)
    return backtrack(counter)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n! \times n), where n is the number of tiles. For each step, we try at most n choices, and the total number of unique permutations is ≤ n!. The actual number is less due to repeated tiles, but it's bounded by the permutations for small n.
- **Space Complexity:** O(n), for the recursion stack and the counter data structure. There's no need to store all sequences.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you were asked to return all the unique sequences, rather than just their count?  
  *Hint: Use a set or list to collect all outputs as you recurse.*

- What if some tiles contained the same letter, but with different colors, and “A(red)” vs. “A(blue)” were distinguishable?  
  *Hint: Treat each unique (letter, color) as a separate item in your frequency counter.*

- How would you solve this for much larger input sizes if only the count is needed, not the actual sequences?  
  *Hint: Consider dynamic programming or mathematical combinatorics approaches to avoid repeated work.*

### Summary
This is a classic **backtracking permutation of multiset** pattern, where the problem is to count all the ways to arrange letters allowing for duplicates but not for repeated use of the same tile in a string. This technique is common for problems like anagrams, combinations/permutations with duplicates, and can be adapted for related sequence or path-finding questions.