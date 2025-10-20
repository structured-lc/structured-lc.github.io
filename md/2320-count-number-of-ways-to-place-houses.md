### Leetcode 2320 (Medium): Count Number of Ways to Place Houses [Practice](https://leetcode.com/problems/count-number-of-ways-to-place-houses)

### Description  
Given **n** plots on each side of a street (so 2·n total, n on each side), each plot can have a house or be left empty, **but** no two houses on the same side can be adjacent. Return the number of ways to arrange houses on both sides, so that this rule holds for each side independently. Since the answer can be very large, return it modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input:`n = 1`  
Output:`4`  
*Explanation:*  
- Each side has only one plot:  
    - Left: can be empty, or have a house  
    - Right: can be empty, or have a house  
  So, arrangements for left = 2, right = 2 → total = 2 × 2 = 4

**Example 2:**  
Input:`n = 2`  
Output:`9`  
*Explanation:*  
- Each side has two plots. For one side, valid placements are:  
  - HH (Invalid)  
  - HE (Valid)  
  - EH (Valid)  
  - EE (Valid)  
  - EH (Valid)  
  There are 3 valid ways: [EE, EH, HE]  
- So for both sides: 3 × 3 = 9

**Example 3:**  
Input:`n = 3`  
Output:`25`  
*Explanation:*  
- For one side, possible non-adjacent arrangements = 5 ([EEE, EHE, HEE, EEH, HEH])  
- Total = 5 × 5 = 25

### Thought Process (as if you’re the interviewee)  
I need to count the number of ways to place houses so that **on each side**, no two are adjacent.  
The problem reduces to **counting the number of valid arrangements on a single side** with n plots, and squaring the result (since both sides are independent).

For a single side, treating the problem recursively:
- For plot i, we have two choices:
  - Place a house: only if plot i-1 is empty.
  - Leave empty: always allowed.

Let’s define:
- dp[i]: number of ways to arrange up to i plots.

Let’s use two DP states:
- empty[i]: # of ways where iᵗʰ plot is empty
- house[i]: # of ways where iᵗʰ plot has a house

Transitions:
- empty[i] = empty[i-1] + house[i-1] (either last was empty or was house)
- house[i] = empty[i-1] (last must be empty for two houses not to be adjacent)

Base case:  
- For 0ᵗʰ plot: empty = 1, house = 1

Compute until n, total ways for one side = empty[n-1] + house[n-1].  
For both sides: (ways for one side)²

**Trade-offs:**  
- Brute force would enumerate all 2^{2n} placements—too slow!
- DP is O(n), space can be O(1) with two variables.

### Corner cases to consider  
- n = 1 (smallest input)
- Large n (check modulo works)
- No plot (n = 0), trivial: only 1 way (everything empty)
- Check for integer overflow (use modulo as required)

### Solution

```python
def countHousePlacements(n: int) -> int:
    MOD = 10**9 + 7
    
    # For one side, keep two states: ends with empty, ends with house
    empty, house = 1, 1  # At 0-th plot, one way each
    
    for _ in range(1, n):
        new_house = empty  # Must be empty at i-1 to put house now
        new_empty = (empty + house) % MOD  # Can be empty after any prev
        
        house = new_house
        empty = new_empty
    
    total_one_side = (house + empty) % MOD
    # Both sides are independent: square the result
    return (total_one_side * total_one_side) % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). A single loop up to n, constant work per iteration.
- **Space Complexity:** O(1). Only a few integer variables for DP; no extra storage scaling with n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if three houses in a row are not allowed, instead of two?  
  *Hint: DP state becomes larger; consider tracking last two plots.*

- Can you return not just the count, but list all valid configurations for small n?  
  *Hint: Use backtracking; prune invalid placements early.*

- What if the sides are not independent, i.e., additional requirement—no two houses directly across each other?  
  *Hint: DP with 2D state (left, right positions); much harder.*

### Summary
This problem is a **classic dynamic programming** question with a constraint prohibiting adjacent selections—similar to the "no two adjacent" subset selection problem, or Fibonacci-style tiling. The **main pattern** is defining states based on whether the previous element is selected (like the "House Robber" or "Independent Set on Linear Graph"). The result exploits the independence of the two sides by squaring the valid count for one. This DP pattern is broadly applicable wherever arrangements with adjacency constraints are needed.


### Flashcard
Count valid house placements on one side (no two adjacent), then square the result for both sides.

### Tags
Dynamic Programming(#dynamic-programming)

### Similar Problems
- Climbing Stairs(climbing-stairs) (Easy)
- House Robber(house-robber) (Medium)