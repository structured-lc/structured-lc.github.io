### Leetcode 1688 (Easy): Count of Matches in Tournament [Practice](https://leetcode.com/problems/count-of-matches-in-tournament)

### Description  
Given n teams in a knockout tournament, every match eliminates one team, and some teams may get a bye in certain rounds if there is an odd number of teams. The rounds continue until only one team remains and is declared the winner. Compute the **total number of matches** played in the entire tournament.

### Examples  

**Example 1:**  
Input: `n = 7`  
Output: `6`  
*Explanation: 6 matches are needed to get 1 winner.*

**Example 2:**  
Input: `n = 14`  
Output: `13`  
*Explanation: 13 matches are needed to get 1 winner.*

**Example 3:**  
Input: `n = 2`  
Output: `1`  
*Explanation: The 2 teams play one match, one is eliminated, and one winner remains.*

### Thought Process (as if you’re the interviewee)  
An initial brute-force approach could be to simulate each round. For each round: pair up teams, count the matches, let those winners proceed, and repeat until one team remains. But, notice that **every match eliminates exactly one team**. Going from n teams to 1 requires eliminating (n-1) teams, which is exactly (n-1) matches. There's no need to handle the byes or explicitly simulate rounds. Thus, the result is simply n-1.

### Corner cases to consider  
- n = 1: Tournament requires 0 matches, already a winner.
- n = 2: Only one match needed.
- Large n: Function should handle large numbers efficiently (no loops needed).

### Solution

```python
# Return the total number of matches needed in a knockout tournament

def numberOfMatches(n: int) -> int:
    # Each match eliminates exactly one team; need n-1 eliminations to get 1 winner
    return n - 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) — Because it's a direct arithmetic calculation.
- **Space Complexity:** O(1) — No extra space needed; only a return value.


### Potential follow-up questions (as if you’re the interviewer)  

- What if each match eliminates more than one team?  
  *Hint: How would the elimination rule change the formula?*

- How many rounds does the tournament take, not matches?  
  *Hint: Think in terms of ceil(log₂n).*

- If the tournament isn't knockout and follows a league format, how many matches then?  
  *Hint: Each team plays every other — total matches is n × (n-1) / 2.*

### Summary
The approach leverages the basic fact that each match removes a team, so (n-1) matches are needed to leave 1 champion. No simulation or extra data structure is needed. This is an example of the "count eliminations" arithmetic pattern, useful in many round-by-round reduction problems.


### Flashcard
Count of Matches in Tournament

### Tags
Math(#math), Simulation(#simulation)

### Similar Problems
- Count Distinct Numbers on Board(count-distinct-numbers-on-board) (Easy)