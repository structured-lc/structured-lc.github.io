### Leetcode 2214 (Medium): Minimum Health to Beat Game [Practice](https://leetcode.com/problems/minimum-health-to-beat-game)

### Description  
You are given a 0-indexed integer array **damage** where damage[i] is the health lost to complete the iᵗʰ level in a game with n levels.  
You also have an integer **armor**: you can use it at most once, at any level, to protect yourself from **at most** armor damage at that level (if the level’s damage is less than armor, you reduce all of it).  
You must complete the levels in order, and your health must always be **strictly greater than 0** after each level in order to finish the game.  
Return the **minimum starting health** needed to guarantee you beat the game.

### Examples  

**Example 1:**  
Input: `damage = [2,7,4,3], armor = 4`  
Output: `13`  
*Explanation:  
- Take 2 damage: 13 - 2 = 11  
- Take 7 damage: 11 - 7 = 4  
- Use armor at level 3 (4): 4 - min(4,4) = 0 (no health loss at this level)  
- Take 3 damage: 4 - 3 = 1 > 0  
The total sum of damage is 16; since we used armor to absorb 4, we need to start with 16 - 4 + 1 = 13.*

**Example 2:**  
Input: `damage = [2,5,3,4], armor = 7`  
Output: `10`  
*Explanation:  
- Take 2 damage: 10 - 2 = 8  
- Use armor at level 1 (5): 8 - min(5,7) = 8 (no health loss at this level)  
- Take 3 damage: 8 - 3 = 5  
- Take 4 damage: 5 - 4 = 1 > 0  
Sum of damages is 14; max possible armor used is 5, so 14 - 5 + 1 = 10.*

**Example 3:**  
Input: `damage = [3,3,3], armor = 0`  
Output: `10`  
*Explanation:  
- No armor to use.  
- 3 + 3 + 3 = 9  
- Need starting health = 9 + 1 = 10 (to always stay above 0 after each level).*

### Thought Process (as if you’re the interviewee)  
- Brute force: Try using the armor at every level, compute how much it saves, and pick the minimum starting health across all positions.  
  - For each i, let health = total sum of damage - min(damage[i], armor) + 1 (the +1 is because at every step, we have to keep health > 0).
  - Instead of simulating, realize **armor is most effective when used on the level with the largest damage (up to its capacity)**.
- Thus, the optimal is:  
  - minimum health = sum(damage) - min(max(damage), armor) + 1

**Why?** Armor should be used where it saves the most HP, so use it on the highest-damage level if possible.

- Tradeoffs:  
  - O(n) to scan array for sum and max.
  - No fancy data structures, fast, and handles all edge cases from constraints.

### Corner cases to consider  
- damage = [] (empty): Not possible by constraints (n ≥ 1).
- armor = 0: No armor effect, just sum(damage) + 1.
- All damage[i] = 0: Need health = 1 (since must be >0 after every level).
- armor > max(damage): Only absorbs up to that max, not more.
- Only one level: Just damage, so answer = max(1, damage - min(damage, armor) + 1).
- All damage equal, or armor fits exactly one damage.

### Solution

```python
def minimumHealth(damage, armor):
    # Calculate total sum of damage values
    total_damage = sum(damage)
    # Find the maximum damage amount in any single level
    max_damage = max(damage)
    # The armor absorbs up to 'armor' or max_damage on one level — whichever is less
    absorbed = min(max_damage, armor)
    # Minimum health: total damage minus best absorbed value, plus 1 (so health > 0 always)
    return total_damage - absorbed + 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - One pass to sum damage array, and one pass to get max (or can do both in one pass).
- **Space Complexity:** O(1)  
  - Uses a few variables beyond the input. No extra storage dependent on n or recursion stack.

### Potential follow-up questions

- What if armor can be used multiple times, but only k times (k ≤ n)?  
  *Hint: Use armor on k largest-damage levels. Keep a max-heap or sort array.*

- What if health can be ≤ 0 exactly at the final level but not before?  
  *Hint: Subtract 1 from the current formula.*

- What if damage contains negative numbers (healing levels)?  
  *Hint: Be careful with sum; negative value can increase health, but still need to use armor wisely.*

### Summary
This problem uses the classic **"greedy"** pattern: always apply your best power on the largest single cost to minimize the total.  
It's a simple linear scan to sum and get the max in the array.  
This pattern is used in resource allocation, cost minimization, or any "use a one-time power for maximum global effect" problems.  
No advanced data structures needed; it's clean, O(n), and teaches you how to convert simulation problems to analytical expressions leveraging constraints.

### Tags
Array(#array), Greedy(#greedy)

### Similar Problems
- Dungeon Game(dungeon-game) (Hard)
- Eliminate Maximum Number of Monsters(eliminate-maximum-number-of-monsters) (Medium)