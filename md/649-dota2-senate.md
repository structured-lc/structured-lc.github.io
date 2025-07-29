### Leetcode 649 (Medium): Dota2 Senate [Practice](https://leetcode.com/problems/dota2-senate)

### Description  
Given a string representing the sequence of senators in the Dota2 senate, where each character is either `'R'` (for Radiant) or `'D'` (for Dire), two parties compete to gain full control. Each senator can use their right to either ban another senator from the opposite party (removing them from all subsequent rounds) or declare victory if only their party remains. Senators act in the order of the string. The goal is to predict which party will eventually announce victory, assuming each senator uses optimal strategy for their party.

### Examples  

**Example 1:**  
Input: `senate = "RD"`  
Output: `Radiant`  
*Explanation: The first senator (Radiant) bans the Dire senator. Only Radiant remains and announces victory in the next round.*

**Example 2:**  
Input: `senate = "RDD"`  
Output: `Dire`  
*Explanation: Radiant bans one Dire, but the other Dire senator gets to ban Radiant in the next round. In round 2, the remaining Dire senator is alone and wins.*

**Example 3:**  
Input: `senate = "DRRDRD"`  
Output: `Dire`  
*Explanation: Senators alternate banning. By simulating rounds optimally, Dire is able to eliminate all the Radiant senators before they can announce victory.*

### Thought Process (as if you’re the interviewee)  
- First, a brute-force approach could be to repeatedly simulate rounds:
  - Keep track of "active" senators.
  - In each round, for each senator, ban the first available opponent in the order (skipping banned ones).
  - Repeat until only one party remains.
- This is inefficient, requiring multiple passes, possibly O(n²).
- To optimize, realize that since bans apply in the order of senators, we can use two queues (one for Radiant, one for Dire) to represent positions of each alive senator.
- For each round, pop the smallest position from each queue. Whichever is smaller bans the other party's senator; the winner gets re-added to the queue with their new position (`current_pos + n`), wrapping back around.
- Repeat until one queue is empty.
- This ensures O(n) overall time as each senator is banned at most once, and each is processed using efficient queue operations.

### Corner cases to consider  
- All senators from only one party (`"RRRRR"` or `"DDDD"`).
- Alternating pattern (`"DRDRDRD"` or `"RDRDRDR"`).
- Only one senator (`"R"` or `"D"`).
- Very long strings (test efficiency).
- Multiple consecutive senators from one party at the start or end.

### Solution

```python
from collections import deque

def predictPartyVictory(senate: str) -> str:
    n = len(senate)
    radiant = deque()
    dire = deque()
    # Initialize the queues with indices of each party's senator
    for i, ch in enumerate(senate):
        if ch == 'R':
            radiant.append(i)
        else:
            dire.append(i)
    # Process rounds
    while radiant and dire:
        r_idx = radiant.popleft()
        d_idx = dire.popleft()
        # Whichever index is smaller acts first and bans the other
        if r_idx < d_idx:
            # Radiant bans Dire; Radiant returns for next round
            radiant.append(r_idx + n)
        else:
            # Dire bans Radiant; Dire returns for next round
            dire.append(d_idx + n)
    # Only the surviving queue determines the winner
    return "Radiant" if radiant else "Dire"
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of senators. Each senator is placed and removed from their respective queue at most once.
- **Space Complexity:** O(n), needed for the two queues and initial senator storage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there were three or more parties instead of two?  
  *Hint: Consider using a mapping from party to queue and generalizing the logic based on party count.*

- Can we make it work without explicitly using queues?  
  *Hint: Think about using indexing and in-place marking for banned senators.*

- What if a senator could ban any member of the opposite party, not just the next one in order?  
  *Hint: Adjust which senators are eligible to be banned and the ban selection strategy.*

### Summary
This problem uses a classic *queue simulation* approach, where two queues model the sequential and round-based ban rights of senators from two parties. Efficient O(n) simulation avoids unnecessary repeated traversals, and the pattern generalizes to similar problems where actions are dependent on turn order and elimination (e.g. *Josephus problem*, turn-based games, etc.).