### Leetcode 3016 (Medium): Minimum Number of Pushes to Type Word II [Practice](https://leetcode.com/problems/minimum-number-of-pushes-to-type-word-ii)

### Description  
You are given a string `word`, made up of lowercase English letters. Imagine you have a classic phone keypad with keys 2–9, and you can freely **assign any letters** to any keys in any groupings you want. Each key can have any number of assigned letters, but each letter goes to only one key. To type the first letter mapped to a key, it takes 1 push; second letter 2 pushes, and so on. Your task is to find the *minimum total number of pushes* needed to type the word, by optimally mapping the letters to the keys to minimize total effort.

### Examples  

**Example 1:**  
Input: `abcde`  
Output: `5`  
Explanation: Each letter assigned to its own key position 1 (cost 1 each): 1 + 1 + 1 + 1 + 1 = 5

**Example 2:**  
Input: `xyzxyzxyzxyz`  
Output: `12`  
Explanation: There are only 8 keys. Each of the 12 unique letters is assigned to position 1 on 8 keys and position 2 on 4 keys, so total cost: 8×1 + 4×2 = 8 + 8 = 16. However, since all letters repeat perfectly, the optimal distribution is each letter in first available slot for cost 1; so, total cost is just length (12), since no letter repeats enough to cost extra.

**Example 3:**  
Input: `aabbccddeeffgghhiiiiii`  
Output: `24`  
Explanation: Each of the 10 unique letters is assigned to position 1 (1 push for each occurrence). The 6 ‘i’s are distributed in positions 1–6 across keys for minimum extra pushes. Total cost calculation by frequency allocation: 1×8 (for first 8 positions) + 2×8 (for next 8 positions) + ... depending on exact frequency.

### Thought Process (as if you’re the interviewee)  
- **Brute force:**  
  Try all possible mappings of the 26 letters to 8 keys (because keys 2–9): for each arrangement, calculate total pushes according to rules.  
  This is *infeasible* due to huge search space.

- **Optimal Greedy Strategy:**  
  The cost per letter increases with position within a key: 1st letter = 1 push, 2nd = 2 pushes, etc. To minimize total pushes, **most frequent letters should be assigned to the lowest-cost positions (that is, first slots across all keys, then second, etc.)**  
  Steps:  
  1. Count the frequency of each letter in `word`.
  2. Sort frequencies descending.
  3. Assign the most frequent 8 letters into the first position (across 8 keys), the next 8 most frequent to second positions, etc.
  4. For each position group \(k\) (0-indexed), pushes = frequency × (position_in_group + 1).

- **Why this works:**  
  The greedy approach matches the structure of the cost function: highest frequencies to lowest-cost ("earliest") slots.

### Corner cases to consider  
- Empty string: should return 0.
- All letters the same: repeated letter, climbs up cost per position in a single slot.
- Less than or equal to 8 unique letters: every letter can be on a fresh key at position 1 (minimal cost).
- More than 8 unique letters: some will occupy higher push-positions.
- Letters with very high or very low frequency.
- One letter appears more than 8 times.

### Solution

```python
def minimumPushes(word: str) -> int:
    # Frequency count of each letter
    freq = [0] * 26
    for c in word:
        freq[ord(c) - ord('a')] += 1
    
    # Sort frequencies in descending order
    freq.sort(reverse=True)
    
    total_pushes = 0
    # Only 8 keys: each slot (0..7) will be filled n times for each set of 8
    for idx, count in enumerate(freq):
        if count == 0:
            break  # No more letters to map
        # position = idx // 8,  idx=0..7→0, 8..15→1, etc.
        total_pushes += count * (idx // 8 + 1)
    
    return total_pushes
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + 26 log 26)  
  - n for counting freq, 26 log 26 for sorting up to 26 letters.
- **Space Complexity:** O(1)  
  - Constrainted by 26 fixed-size freq array, no extra space related to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- If we had a different number of keys (e.g., k keys), how would your solution change?  
  *Hint: Make the division/grouping modular based on number of keys rather than hard-coding 8.*

- What if you could not remap the keys, and had to use standard phone groupings (abc, def, etc.)?  
  *Hint: Now mapping is fixed, so just calculate based on given keypad groups.*

- How would you minimize *maximum* number of key pushes for any letter in the word, instead of *total*?  
  *Hint: Try to balance assignments — similar to load-balancing.*

### Summary
This problem is a classic **greedy allocation** and **frequency counting** pattern where optimal assignment of letter frequencies to lowest-cost positions yields the minimum total cost. This strategy is common in other assignment-type interview problems, especially those involving minimization with assignable buckets and costs, such as task scheduling or load balancing tasks with different costs.