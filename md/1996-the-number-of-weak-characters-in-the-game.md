### Leetcode 1996 (Medium): The Number of Weak Characters in the Game [Practice](https://leetcode.com/problems/the-number-of-weak-characters-in-the-game)

### Description  
Given a list of characters where each character is represented by two integers: `attack` and `defense`, you need to find the number of "weak" characters.  
A character is considered **weak** if there exists another character with **both** higher attack and higher defense.  
For each character, check if it's strictly dominated in both values by another character.

### Examples  

**Example 1:**  
Input: `properties = [[5,5],[6,3],[3,6]]`  
Output: `0`  
*Explanation: No character is weaker than any other, since no character has both higher attack and higher defense than another.*

**Example 2:**  
Input: `properties = [[2,2],[3,3]]`  
Output: `1`  
*Explanation: (2,2) is weaker than (3,3), so answer is 1.*

**Example 3:**  
Input: `properties = [[1,5],[10,4],[4,3]]`  
Output: `1`  
*Explanation: (4,3) is weaker than (10,4). (1,5) is not weaker than anyone, since no other character has defense > 5.*


### Thought Process (as if you’re the interviewee)  
- **Brute-force:** For every character, scan the rest to see if any have both higher attack and higher defense. This is O(n²), not feasible for large n.
- **Optimizing:** If we sort characters, we might be able to check more efficiently.  
  - Sorting by attack descending, and for equal attack, defense ascending.  
  - As we move from highest attack to lowest, we keep track of the maximum defense seen so far.  
  - For each current character, if their defense is less than the max defense seen (among strictly higher attack), they're weak.  
- **Why this works:**  
  - Sorting ensures when attack is higher, we're only comparing to those ahead (who have already been considered).  
  - This scan is O(n log n) for sorting + O(n) for the pass, which is optimal for n ≤ 1e5.

### Corner cases to consider  
- Single character or empty input: answer is 0.
- Multiple characters with the same attack–must sort so defense is ascending for same attack.
- All characters identical: answer is 0.
- Properties where attack or defense can be at upper or lower bounds.

### Solution

```python
def numberOfWeakCharacters(properties):
    # Sort by attack descending; if tie, defense ascending
    properties.sort(key=lambda x: (-x[0], x[1]))
    weak = 0
    max_defense = 0

    for _, defense in properties:
        # If current defense < max defense so far, this character is weak
        if defense < max_defense:
            weak += 1
        else:
            # Otherwise, update max defense
            max_defense = defense

    return weak
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) due to sorting (`n` is the number of characters), plus O(n) for the scan.
- **Space Complexity:** O(1) extra space beyond the input, since sorting can be done in-place. No additional data structures except a few variables.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this if the input couldn't be sorted in place?
  *Hint: Use extra space for storage or sorting.*

- What if you needed to return the list of weak characters, not just the count?
  *Hint: Track original indices when sorting so you can output them.*

- Can you do better than O(n log n) if attack range is limited?
  *Hint: Try using counting sort or bucket approach if attack values are small.*

### Summary
This problem uses the *sorting and greedy/max-tracking* pattern, common for "domination" problems in 2D (attack/defense) space.  
By sorting strategically and keeping track of a running maximum, we avoid brute-force pairwise comparison.  
This approach appears in skyline/rectangle problems and other 2D sweep-line or "non-dominated pairwise" scenarios.